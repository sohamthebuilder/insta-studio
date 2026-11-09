import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../brand/tokens";
import { Bg } from "../brand/ui";
import { BALOO } from "../brand/type";

// Highlight covers, 1080×1920. Instagram shows only a small circle from the centre, so the icon sits
// inside a 600 px circle at the middle. The label is the highlight name you type in the app.
const C = COLORS.text, N = COLORS.bg;

const MiniWave = () => (
  <g transform="translate(0 150) scale(2.7)">
    <g transform="translate(30 -50) rotate(40)"><rect x={-6} y={-46} width={12} height={46} rx={6} fill={C} /></g>
    <path d="M -38,0 C -44,-62 -24,-104 0,-104 C 24,-104 44,-62 38,0 Z" fill={C} />
    <ellipse cx={0} cy={-100} rx={44} ry={9} fill={C} />
    <path d="M -24,-100 C -22,-128 22,-128 24,-100 Z" fill={C} />
    <rect x={-24} y={-108} width={48} height={6} fill={N} opacity={0.35} />
    <ellipse cx={-12} cy={-62} rx={6.5} ry={7.5} fill={N} /><ellipse cx={12} cy={-62} rx={6.5} ry={7.5} fill={N} />
    <path d="M -6,-50 Q 0,-44 6,-50" stroke={N} strokeWidth={2.4} fill="none" strokeLinecap="round" />
  </g>
);
const Book = () => (
  <g strokeLinejoin="round">
    <path d="M -170,-110 Q -85,-140 0,-100 L 0,130 Q -85,90 -170,120 Z" fill={C} />
    <path d="M 170,-110 Q 85,-140 0,-100 L 0,130 Q 85,90 170,120 Z" fill={C} opacity={0.82} />
    {[-60, -15, 30].map((y) => <path key={y} d={`M -140,${y} Q -80,${y - 18} -30,${y + 4}`} stroke={N} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.5} />)}
  </g>
);
const Paper = () => (
  <g>
    <rect x={-170} y={-140} width={300} height={280} rx={24} fill={C} />
    <path d="M 130,-60 L 180,-60 L 180,110 Q 180,140 150,140 L 130,140 Z" fill={C} opacity={0.7} />
    <rect x={-130} y={-100} width={220} height={56} rx={10} fill={N} opacity={0.55} />
    {[-10, 30, 70].map((y) => <rect key={y} x={-130} y={y} width={y === 70 ? 140 : 220} height={16} rx={8} fill={N} opacity={0.35} />)}
  </g>
);
const Ask = () => (
  <g>
    <path d="M -180,-130 Q -180,-170 -140,-170 L 140,-170 Q 180,-170 180,-130 L 180,70 Q 180,110 140,110 L -40,110 L -110,170 L -100,110 L -140,110 Q -180,110 -180,70 Z" fill={C} />
    <text x={0} y={60} textAnchor="middle" fontFamily={BALOO} fontWeight={800} fontSize={240} fill={N}>?</text>
  </g>
);

const ICONS = { start: MiniWave, basics: Book, news: Paper, ask: Ask } as const;
export type HighlightId = keyof typeof ICONS;

export const HighlightCover: React.FC<{ id: HighlightId }> = ({ id }) => {
  const Icon = ICONS[id];
  return (
    <AbsoluteFill>
      <Bg glowY={0.5} />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <circle cx={540} cy={960} r={300} fill="none" stroke={C} strokeOpacity={0.28} strokeWidth={8} />
        <g transform="translate(540 960)"><Icon /></g>
      </svg>
    </AbsoluteFill>
  );
};
