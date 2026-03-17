'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { sampleIndustryDemand } from '@/data/sampleIndustryDemand';
import { FadeIn } from '@/components/shared/FadeIn';

const GOLD = '#F59E0B';
const GOLD_L = '#FBBF24';
const AMBER = '#F59E0B';

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

const critical = sampleIndustryDemand.filter(d => d.supplyGap === 'critical');
const totalJobs = sampleIndustryDemand.reduce((s, d) => s + d.currentDemand, 0);
const avgSalary = Math.round(sampleIndustryDemand.reduce((s, d) => s + d.avgSalary, 0) / sampleIndustryDemand.length);

const top10 = [...sampleIndustryDemand].sort((a, b) => b.currentDemand - a.currentDemand).slice(0, 10).map(d => ({
    skill: d.skill.length > 18 ? d.skill.slice(0, 18) + '…' : d.skill,
    demand: d.currentDemand / 1000,
}));

const gapColor: Record<string, string> = { critical: '#ef4444', moderate: AMBER, stable: '#22c55e' };

export default function IndustryOverviewPage() {
    return (
        <FadeIn>
            <div style={{ marginBottom: 24 }}>
                <h1 className="font-display text-gradient-gold" style={{ fontSize: 32, fontWeight: 900 }}>
                    Industry Intelligence
                </h1>
                <p style={{ color: '#64748b', fontSize: 14, marginTop: 4, fontWeight: 500 }}>Skill demand signals, talent pipeline and hiring analytics</p>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
                {[
                    { label: 'Total Skill Demand', value: totalJobs.toLocaleString(), color: GOLD, sub: '+18% vs last period' },
                    { label: 'Critical Gaps', value: `${critical.length} skills`, color: '#ef4444', sub: 'Requires attention' },
                    { label: 'Tracked Domains', value: `${sampleIndustryDemand.length}`, color: AMBER, sub: 'Across sectors' },
                    { label: 'Avg Salary', value: `Rs. ${avgSalary.toLocaleString()}`, color: '#22c55e', sub: '+7% growth' },
                ].map((stat, i) => (
                    <div key={i} className="stat-card glass" style={{ borderTop: `2px solid ${stat.color}40` }}>
                        <div className="font-display text-gradient-gold" style={{ fontSize: 26, fontWeight: 900 }}>{stat.value}</div>
                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                        <div style={{ fontSize: 11, color: stat.sub.includes('+') ? '#22c55e' : '#64748b', marginTop: 4, fontWeight: 600 }}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Demand bar chart */}
            <div className="stat-card glass" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: GOLD }} />
                    <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Current Skill Demand — Top 10</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={top10} layout="vertical" barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.07)" horizontal={false} />
                        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis dataKey="skill" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
                        <Tooltip content={<Tip />} cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }} />
                        <Bar dataKey="demand" radius={[0, 4, 4, 0]} fill={GOLD} fillOpacity={0.85} name="Demand (K)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Supply gap table */}
            <div className="stat-card glass" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: AMBER }} />
                    <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Skill Supply Gap Overview</h3>
                </div>
                <div style={{ overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(245, 158, 11, 0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                {['Skill', 'Domain', 'Demand Now', '2026 Projected', 'Growth', 'Gap Status'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleIndustryDemand.slice(0, 8).map((d, i) => (
                                <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s' }}>
                                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#fff' }}>{d.skill}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{d.domain}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: GOLD, fontWeight: 700 }}>{(d.currentDemand / 1000).toFixed(0)}K</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a3b8' }}>{(d.projectedDemand2026 / 1000).toFixed(0)}K</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span className="font-display" style={{ fontSize: 13, fontWeight: 800, color: d.growthPercent >= 0 ? '#22c55e' : '#ef4444' }}>
                                            {d.growthPercent >= 0 ? '+' : ''}{d.growthPercent}%
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span className="badge" style={{
                                            background: `${gapColor[d.supplyGap]}14`,
                                            border: `1px solid ${gapColor[d.supplyGap]}30`,
                                            color: gapColor[d.supplyGap],
                                            textTransform: 'capitalize'
                                        }}>{d.supplyGap}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Critical gap alerts */}
            <div className="stat-card glass">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: '#ef4444' }} />
                    <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Critical Supply Gaps</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                    {critical.map(d => (
                        <div key={d.skill} className="glass-bright" style={{ padding: '18px', borderRadius: 16, border: '1px solid rgba(239,68,68,0.2)' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{d.skill}</div>
                            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{d.domain}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
                                <span className="font-display" style={{ fontSize: 20, fontWeight: 900, color: '#ef4444' }}>+{d.growthPercent}%</span>
                                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Rs. {d.avgSalary.toLocaleString()}/mo</span>
                            </div>
                            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {d.topHiringCompanies.slice(0, 2).map(c => (
                                    <span key={c} className="badge" style={{ fontSize: 10, background: 'rgba(255,255,255,0.03)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.08)' }}>{c}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    );
}
