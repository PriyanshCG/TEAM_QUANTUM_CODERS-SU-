import crypto from 'crypto';
import Student from '../models/Student.model';
import logger from '../utils/logger';

/**
 * Generates a digital skill passport hash for a student.
 * This hash represents the immutable state of their skills and certifications.
 */
export const generatePassportHash = async (studentId: string): Promise<string> => {
  try {
    const student = await Student.findById(studentId).populate('skills.skillId');
    if (!student) throw new Error('Student not found');

    // Create a data string representing the current state of skills
    const skillString = student.skills
      .map(s => `${(s.skillId as any).name}:${s.score}`)
      .sort()
      .join('|');

    const dataToHash = `${studentId}:${skillString}:${student.updatedAt.getTime()}`;
    
    // Generate SHA-256 hash
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    
    // Save the hash to the student record
    (student as any).passportHash = hash;
    await student.save();

    return hash;
  } catch (err) {
    logger.error('Passport generation error:', err);
    return `ERROR-PASSPORT-${studentId}`;
  }
};

/**
 * Verifies if a provided hash matches the current state of the student's passport.
 */
export const verifyPassport = async (hash: string): Promise<boolean> => {
  try {
    const student = await Student.findOne({ passportHash: hash });
    return !!student;
  } catch (err) {
    logger.error('Passport verification error:', err);
    return false;
  }
};
