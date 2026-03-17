'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sampleStudents, SampleStudent } from '@/data/sampleStudents';
import { FadeIn } from '@/components/shared/FadeIn';

const GOLD = '#F59E0B';
const MUTED = '#94a3b8';
const WHITE = '#FFFFFF';

const STATUS_COLORS = { placed: '#22c55e', studying: '#3b82f6', seeking: '#F59E0B' };

const PROGRAMS = ['Full-Stack Development', 'Data Science & Analytics', 'Cloud & DevOps Engineering', 'UI/UX Design & Frontend', 'Backend Development', 'Mobile App Development', 'Cybersecurity', 'AI & Machine Learning', 'Software Testing & QA'];
const STATES = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Uttar Pradesh', 'Karnataka', 'Kerala', 'Rajasthan', 'West Bengal', 'Andhra Pradesh', 'Telangana', 'Punjab', 'Bihar', 'Madhya Pradesh', 'Haryana'];

export default function StudentsPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'placed' | 'studying' | 'seeking'>('all');
    const [students, setStudents] = useState<SampleStudent[]>(sampleStudents);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [fName, setFName] = useState('');
    const [fProgram, setFProgram] = useState(PROGRAMS[0]);
    const [fState, setFState] = useState(STATES[0]);
    const [fBatch, setFBatch] = useState('2024-25');
    const [fScore, setFScore] = useState('75');
    const [fNsqf, setFNsqf] = useState('5');
    const [fStatus, setFStatus] = useState<'placed' | 'studying' | 'seeking'>('studying');
    const [fCompany, setFCompany] = useState('');

    const filtered = students.filter((s) => {
        const matchSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.program.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || s.placementStatus === statusFilter;
        return matchSearch && matchStatus;
    });

    const handleAdd = () => {
        if (!fName.trim()) return;
        const newStudent: SampleStudent = {
            id: `STU${String(students.length + 1).padStart(3, '0')}`,
            name: fName.trim(),
            program: fProgram,
            state: fState,
            batch: fBatch,
            nsqfLevel: parseInt(fNsqf) || 4,
            gender: 'male' as const,
            skills: [
                { skill: 'Core Skill 1', score: Math.floor(Math.random() * 30) + 60 },
                { skill: 'Core Skill 2', score: Math.floor(Math.random() * 30) + 55 },
                { skill: 'Core Skill 3', score: Math.floor(Math.random() * 30) + 65 },
            ],
            overallScore: parseInt(fScore) || 75,
            placementStatus: fStatus,
            ...(fStatus === 'placed' && fCompany.trim() ? { company: fCompany.trim(), role: 'Software Developer', salary: 45000 } : {}),
        };
        setStudents(prev => [newStudent, ...prev]);
        setShowModal(false);
        setFName(''); setFCompany(''); setFScore('75'); setFStatus('studying');
    };

    const inputStyle = {
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, padding: '9px 12px', color: WHITE, fontSize: 13, outline: 'none', width: '100%',
    };

    const labelStyle = { fontSize: 11, color: MUTED, fontWeight: 600 as const, marginBottom: 4, display: 'block' as const };

    return (
        <FadeIn style={{ color: WHITE, maxWidth: 1100 }}>
            <div style={{ marginBottom: 24 }}>
                <h1 className="font-display text-gradient-gold" style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>
                    Student Registry
                </h1>
                <p style={{ margin: '4px 0 0', color: MUTED, fontSize: 14 }}>
                    {students.length} enrolled students
                </p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                    type="text" placeholder="Search name or program..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="auth-input"
                    style={{ flex: 1, minWidth: 200, ...inputStyle, paddingLeft: 12 }}
                />
                {(['all', 'placed', 'studying', 'seeking'] as const).map((f) => (
                    <button key={f} onClick={() => setStatusFilter(f)} style={{
                        padding: '7px 14px', borderRadius: 8,
                        border: `1px solid ${statusFilter === f ? GOLD : 'rgba(255,255,255,0.12)'}`,
                        background: statusFilter === f ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)',
                        color: statusFilter === f ? GOLD : MUTED, fontSize: 12,
                        fontWeight: statusFilter === f ? 700 : 400, cursor: 'pointer', textTransform: 'capitalize',
                        transition: 'all 0.2s'
                    }}>
                        {f} {f !== 'all' && `(${students.filter((s) => s.placementStatus === f).length})`}
                    </button>
                ))}
                <button onClick={() => setShowModal(true)} className="btn-primary btn-shimmer" style={{
                    padding: '8px 18px', borderRadius: 8, border: 'none',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}>
                    + Add Student
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                    onClick={() => setShowModal(false)}>
                    <div onClick={e => e.stopPropagation()} className="glass-bright" style={{
                        width: 480, border: '1px solid rgba(245, 158, 11, 0.15)',
                        borderRadius: 20, padding: 32,
                    }}>
                        <h2 className="font-display text-gradient-gold" style={{ fontSize: 20, fontWeight: 900, color: WHITE, marginBottom: 24 }}>
                            Add New Student
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={labelStyle}>Full Name *</label>
                                <input type="text" placeholder="Enter student name" value={fName} onChange={e => setFName(e.target.value)} style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={labelStyle}>Program</label>
                                    <select value={fProgram} onChange={e => setFProgram(e.target.value)} style={{ ...inputStyle, appearance: 'auto' as any }}>
                                        {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>State</label>
                                    <select value={fState} onChange={e => setFState(e.target.value)} style={{ ...inputStyle, appearance: 'auto' as any }}>
                                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={labelStyle}>Batch</label>
                                    <select value={fBatch} onChange={e => setFBatch(e.target.value)} style={{ ...inputStyle, appearance: 'auto' as any }}>
                                        <option value="2024-25">2024-25</option>
                                        <option value="2023-24">2023-24</option>
                                        <option value="2025-26">2025-26</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Score</label>
                                    <input type="number" min="0" max="100" value={fScore} onChange={e => setFScore(e.target.value)} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>NSQF Level</label>
                                    <select value={fNsqf} onChange={e => setFNsqf(e.target.value)} style={{ ...inputStyle, appearance: 'auto' as any }}>
                                        {[3, 4, 5, 6].map(n => <option key={n} value={n}>Level {n}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Status</label>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    {(['placed', 'studying', 'seeking'] as const).map(s => (
                                        <button key={s} onClick={() => setFStatus(s)} style={{
                                            flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer',
                                            border: `1px solid ${fStatus === s ? STATUS_COLORS[s] : 'rgba(255,255,255,0.12)'}`,
                                            background: fStatus === s ? `${STATUS_COLORS[s]}18` : 'transparent',
                                            color: fStatus === s ? STATUS_COLORS[s] : MUTED,
                                            fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                                            transition: 'all 0.2s'
                                        }}>{s}</button>
                                    ))}
                                </div>
                            </div>
                            {fStatus === 'placed' && (
                                <div>
                                    <label style={labelStyle}>Company Name</label>
                                    <input type="text" placeholder="Enter company name" value={fCompany} onChange={e => setFCompany(e.target.value)} style={inputStyle} />
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowModal(false)} style={{
                                padding: '9px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                                background: 'transparent', color: MUTED, fontSize: 13, cursor: 'pointer',
                            }}>Cancel</button>
                            <button onClick={handleAdd} className="btn-primary btn-shimmer" style={{ padding: '9px 28px', fontSize: 13, borderRadius: 8 }}>
                                Add Student
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="glass" style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                        <tr style={{ background: 'rgba(245, 158, 11, 0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            {['Name', 'Program', 'State', 'Batch', 'Score', 'NSQF', 'Status', 'Company'].map((h) => (
                                <th key={h} style={{ padding: '16px 14px', textAlign: 'left', color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 11 }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((student) => (
                            <tr key={student.id} className="table-row-hover"
                                style={{ transition: 'all 0.2s', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#08060f', flexShrink: 0, boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)' }}>
                                            {student.name.charAt(0)}
                                        </div>
                                        <span style={{ color: WHITE, fontWeight: 600 }}>{student.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '14px', color: MUTED, whiteSpace: 'nowrap' }}>{student.program}</td>
                                <td style={{ padding: '14px', color: MUTED }}>{student.state}</td>
                                <td style={{ padding: '14px', color: MUTED, whiteSpace: 'nowrap' }}>{student.batch}</td>
                                <td style={{ padding: '14px' }}>
                                    <span style={{ color: student.overallScore >= 80 ? '#22c55e' : student.overallScore >= 65 ? GOLD : '#ef4444', fontWeight: 800, fontSize: 14 }}>{student.overallScore}</span>
                                </td>
                                <td style={{ padding: '14px', color: MUTED }}>{student.nsqfLevel}</td>
                                <td style={{ padding: '14px' }}>
                                    <span className="badge" style={{ background: `${STATUS_COLORS[student.placementStatus as keyof typeof STATUS_COLORS]}12`, border: `1px solid ${STATUS_COLORS[student.placementStatus as keyof typeof STATUS_COLORS]}30`, color: STATUS_COLORS[student.placementStatus as keyof typeof STATUS_COLORS], textTransform: 'capitalize' }}>
                                        {student.placementStatus}
                                    </span>
                                </td>
                                <td style={{ padding: '14px', color: MUTED }}>{student.company ?? '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </FadeIn>
    );
}
