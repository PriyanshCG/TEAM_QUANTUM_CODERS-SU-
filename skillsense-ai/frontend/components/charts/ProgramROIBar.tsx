'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from 'recharts';
import type { ProgramROI } from '../../types/charts';

interface Props {
    data: ProgramROI[];
}

const GOLD = '#F59E0B';
const MUTED = '#94a3b8';
const WHITE = '#FFFFFF';
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
                minWidth: '180px'
            }}>
                <p style={{
                    color: '#F59E0B',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginBottom: '6px'
                }}>{label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ color: '#ffffff', fontSize: '13px', margin: 0 }}>
                        ROI: <span style={{ color: '#F59E0B', fontWeight: 600 }}>{payload[0].value}%</span>
                    </p>
                    <p style={{ 
                        color: '#94a3b8', 
                        fontSize: '11px', 
                        marginTop: '8px',
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(255,255,255,0.1)' 
                    }}>
                        &#8377;1 invested → &#8377;{(payload[0].value / 100 + 1).toFixed(2)} returned
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
        <text
            x={x + width / 2}
            y={y - 6}
            textAnchor="middle"
            fill={GOLD}
            fontSize={11}
            fontWeight={600}
        >
            {value}%
        </text>
    );
};

export default function ProgramROIBar({ data }: Props) {
    const sorted = [...data].sort((a, b) => b.roi - a.roi);

    const maxRoi = Math.max(...sorted.map((d) => d.roi));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={sorted}
                    margin={{ top: 28, right: 20, left: 10, bottom: 40 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                    <XAxis
                        dataKey="program"
                        tick={{ fill: MUTED, fontSize: 10 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                    />
                    <YAxis
                        tick={{ fill: MUTED, fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        domain={[0, maxRoi + 50]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="roi" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        {sorted.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={GOLD}
                                fillOpacity={0.7 + (0.3 * (sorted.length - index)) / sorted.length}
                            />
                        ))}
                        <LabelList content={<TopLabel />} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
