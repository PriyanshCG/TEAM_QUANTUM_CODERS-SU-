'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area,
} from 'recharts';
import { sampleInstitutions } from '@/data/sampleInstitutions';
import { samplePlacements } from '@/data/samplePlacements';
import { FadeIn } from '@/components/shared/FadeIn';

const inst = sampleInstitutions[0];
const GOLD = '#F59E0B';
const GOLD_L = '#FBBF24';
const AMBER = '#F59E0B';
const ORANGE = '#F97316';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const Tip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload?.length) {
        return (
            <div style={{
                background: 'rgba(10, 10, 20, 0.95)',
                border: '1px solid rgba(212, 168, 67, 0.4)',
                borderRadius: '10px',
                padding: '12px 16px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                minWidth: '160px'
            }}>
                <p style={{
                    color: '#F59E0B',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginBottom: '6px'
                }}>{label}</p>
                {payload.map((entry: any, i: number) => (
                    <p key={i} style={{
                        color: '#ffffff',
                        fontSize: '13px',
                        margin: '2px 0'
                    }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const deptPerformance = [
    { dept: 'Frontend', score: 81, students: 124 },
    { dept: 'Backend', score: 73, students: 98 },
    { dept: 'DevOps', score: 68, students: 76 },
    { dept: 'Data Science', score: 88, students: 112 },
    { dept: 'Cybersecurity', score: 76, students: 89 },
];

const curriculumGaps = [
    { area: 'Cloud Computing', gap: 72, priority: 'Critical' },
    { area: 'AI / ML Basics', gap: 65, priority: 'High' },
    { area: 'Soft Skills', gap: 48, priority: 'High' },
    { area: 'Industry 4.0', gap: 55, priority: 'Medium' },
    { area: 'Data Analytics', gap: 40, priority: 'Medium' },
];

const skillDistribution = [
    { skill: 'React.js', students: 420 },
    { skill: 'Python', students: 376 },
    { skill: 'Node.js', students: 318 },
    { skill: 'AWS / Cloud', students: 294 },
    { skill: 'Docker / K8s', students: 248 },
    { skill: 'SQL Databases', students: 180 },
];

export default function InstitutePage() {
    const recentPlacements = samplePlacements.slice(-8);

    return (
        <FadeIn>
            <div style={{ marginBottom: 24 }}>
                <h1 className="font-display text-gradient-gold" style={{ fontSize: 32, fontWeight: 900 }}>Institute Analytics</h1>
                <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
                    {inst.name} — {inst.type} · {inst.state}
                </p>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
                {[
                    { label: 'Total Students', value: inst.students.toLocaleString(), color: '#F59E0B' },
                    { label: 'Placement Rate', value: `${inst.placementRate}%`, color: '#22c55e' },
                    { label: 'Avg Skill Score', value: '76 / 100', color: GOLD },
                    { label: 'Employer Satisfaction', value: '91%', color: AMBER },
                ].map((stat, i) => (
                    <div key={i} className="stat-card" style={{ borderTop: `2px solid ${stat.color}40` }}>
                        <div className="font-display text-gradient-gold" style={{ fontSize: 26, fontWeight: 900 }}>{stat.value}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 5, fontWeight: 600 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
                <div className="stat-card glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 4, height: 18, borderRadius: 2, background: GOLD }} />
                        <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Skill Distribution</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={skillDistribution} layout="vertical" barSize={12}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.07)" horizontal={false} />
                            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis dataKey="skill" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
                            <Tooltip content={<Tip />} cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }} />
                            <Bar dataKey="students" radius={[0, 4, 4, 0]} fill={GOLD} fillOpacity={0.85} name="Students" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="stat-card glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 4, height: 18, borderRadius: 2, background: AMBER }} />
                        <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Monthly Placement Trends</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={recentPlacements}>
                            <defs>
                                <linearGradient id="placG" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.30} />
                                    <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.07)" />
                            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            <Area type="monotone" dataKey="placedCount" stroke={GOLD} fill="url(#placG)" strokeWidth={3} name="Placed" dot={{ r: 4, fill: GOLD, strokeWidth: 2, stroke: '#08060f' }} activeDot={{ r: 6, fill: '#fff', stroke: GOLD, strokeWidth: 2 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Department Heatmap */}
            <div className="stat-card glass" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: GOLD }} />
                    <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Department Performance Heatmap</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
                    {deptPerformance.map((dept, i) => (
                        <div key={i} style={{ textAlign: 'center', cursor: 'default' }}>
                            <div className="glass-bright" style={{
                                borderRadius: 16, padding: '24px 8px', marginBottom: 12,
                                transition: 'all 0.3s ease',
                                background: `rgba(245, 158, 11, ${(dept.score / 100) * 0.15 + 0.05})`,
                                border: `1px solid rgba(245, 158, 11, ${(dept.score / 100) * 0.3})`,
                                boxShadow: `0 0 20px rgba(245, 158, 11, ${(dept.score / 100) * 0.1})`
                            }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245, 158, 11, 0.6)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    (e.currentTarget as HTMLElement).style.borderColor = `rgba(245, 158, 11, ${(dept.score / 100) * 0.3})`;
                                }}>
                                <div className="font-display text-gradient-gold" style={{ fontSize: 32, fontWeight: 900 }}>{dept.score}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: 600 }}>SCORE / 100</div>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{dept.dept}</div>
                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 500 }}>{dept.students} students</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curriculum Gaps */}
            <div className="stat-card glass" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: ORANGE }} />
                    <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Curriculum Gaps — AI Identified</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {curriculumGaps.map((gap, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <span style={{ fontSize: 13, color: '#e2e8f0', width: 140, flexShrink: 0, fontWeight: 600 }}>{gap.area}</span>
                            <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{
                                    height: '100%', width: `${gap.gap}%`, borderRadius: 4,
                                    background: gap.priority === 'Critical' ? '#ef4444' : gap.priority === 'High' ? AMBER : GOLD,
                                    boxShadow: `0 0 10px ${gap.priority === 'Critical' ? '#ef444440' : GOLD + '40'}`
                                }} />
                            </div>
                            <span style={{ fontSize: 11, color: '#64748b', width: 28, textAlign: 'right', fontWeight: 600 }}>{gap.gap}%</span>
                            <span className="badge" style={{
                                width: 74, textAlign: 'center',
                                background: gap.priority === 'Critical' ? 'rgba(239,68,68,0.1)' : gap.priority === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.1)',
                                border: `1px solid ${gap.priority === 'Critical' ? '#ef444450' : AMBER + '50'}`,
                                color: gap.priority === 'Critical' ? '#ef4444' : gap.priority === 'High' ? AMBER : GOLD,
                            }}>{gap.priority}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Program ROI + Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 18 }}>
                <div className="stat-card glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 4, height: 18, borderRadius: 2, background: GOLD }} />
                        <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Program ROI</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {inst.programROI.map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 12, color: '#cbd5e1', width: 170, fontWeight: 500 }}>{p.program}</span>
                                <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.03)', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ height: '100%', width: `${Math.min(100, p.roi / 6)}%`, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, borderRadius: 3 }} />
                                </div>
                                <span className="font-display" style={{ fontSize: 14, fontWeight: 800, color: GOLD, width: 44, textAlign: 'right' }}>{p.roi}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220 }}>
                    {[
                        { label: 'Employer Satisfaction', value: '91%', color: AMBER },
                        { label: 'Alumni Salary Growth', value: '2.8x', color: GOLD },
                        { label: 'NSQF Level', value: `Level ${inst.nsqfLevel}`, color: '#a78bfa' },
                    ].map((m, i) => (
                        <div key={i} className="stat-card glass-bright" style={{ padding: '18px 24px', borderLeft: `3px solid ${m.color}` }}>
                            <div className="font-display text-gradient-gold" style={{ fontSize: 28, fontWeight: 900 }}>{m.value}</div>
                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    );
}
