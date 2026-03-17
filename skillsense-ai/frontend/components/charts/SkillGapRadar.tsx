'use client';

import React from 'react';
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import type { SkillGapEntry } from '../../types/charts';

interface Props {
    data: SkillGapEntry[];
}

const GOLD = '#F59E0B';
const WHITE = '#FFFFFF';
const MUTED = '#94a3b8';
const AMBER = '#FBBF24';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
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
                    marginBottom: '8px'
                }}>{label}</p>
                {payload.map((entry: any, i: number) => (
                    <p key={i} style={{ 
                        color: entry.name === 'My Level' ? '#F59E0B' : '#ffffff', 
                        margin: '2px 0', 
                        fontSize: '13px',
                        fontWeight: 500
                    }}>
                        {entry.name}: <span style={{ fontWeight: 700 }}>{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function SkillGapRadar({ data }: Props) {
    return (
        <div style={{ width: '100%', height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <defs>
                        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={GOLD} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                        </radialGradient>
                    </defs>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: MUTED, fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: MUTED, fontSize: 10 }}
                        axisLine={false}
                    />
                    <Radar
                        name="My Level"
                        dataKey="myLevel"
                        stroke={GOLD}
                        fill={GOLD}
                        fillOpacity={0.2}
                        strokeWidth={2}
                        dot={{ fill: GOLD, r: 3 }}
                    />
                    <Radar
                        name="Industry Req"
                        dataKey="industryReq"
                        stroke={WHITE}
                        fill="transparent"
                        strokeWidth={1.5}
                        strokeDasharray="5 3"
                        dot={{ fill: WHITE, r: 2 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ color: MUTED, fontSize: 12, paddingTop: 8 }}
                        formatter={(value) => (
                            <span style={{ color: value === 'My Level' ? GOLD : WHITE }}>{value}</span>
                        )}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
