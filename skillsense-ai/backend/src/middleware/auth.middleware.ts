import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /*
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      if (process.env.NODE_ENV === 'development' || true) {
        // Fallback for demo mode
        req.user = {
          _id: 'demo_user_id',
          id: 'demo_user_id',
          name: 'Demo User',
          email: 'demo@skillsense.ai',
          role: 'student'
        } as any;
        return next();
      }
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Not authorized. Token missing.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; id?: string; role: string };
    
    // Support both userId (new) and id (legacy) in token
    const id = decoded.id || decoded.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'User no longer exists',
      });
    }

    req.user = user;
    */
    
    // HACKATHON DEMO MODE: Unified bypass for consistency
    req.user = {
      _id: 'demo_user_id',
      id: 'demo_user_id',
      name: 'Demo User',
      email: 'demo@skillsense.ai',
      role: 'student'
    } as any;
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Invalid or expired token',
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /*
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user?.role || 'unknown'} is not authorized to access this route`,
      });
    }
    */
    next();
  };
};
