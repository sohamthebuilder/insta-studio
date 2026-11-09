import React from "react";
import { Face } from "../kit/parts";
import { COLORS } from "./tokens";
import { BALOO } from "./type";
import { ACCOUNT } from "./account";

// The account mascot: a round bean with big eyes (and an optional little sun hat).
// Name, body colour and hat colours come from account.json "mascot". Redraw it here for a new look.
// Drawn around (0,0) = the bottom of the body. Body is 104 units tall, hat top at -128.
export const mixHex = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

export const Mascot: React.FC<{
  s: number;
  mood?: "smile" | "happy" | "o";
  look?: [number, number];
  wave?: number; // arm angle in degrees, 0 = no wave
  hold?: boolean; // both arms forward (holding something)
}> = ({ s, mood = "smile", look = [0, 0], wave = 0, hold = false }) => {
  const col = COLORS.mascot;
  const dark = mixHex(col, "#5a3e3e", 0.25);
  return (
    <g transform={`scale(${s})`}>
      {wave !== 0 && (
        <g transform={`translate(30 -50) rotate(${wave})`}>
          <rect x={-6} y={-46} width={12} height={46} rx={6} fill={col} />
        </g>
      )}
      <path d="M -38,0 C -44,-62 -24,-104 0,-104 C 24,-104 44,-62 38,0 Z" fill={col} />
      <path d="M -38,0 C -36,-26 -26,-40 -6,-44 L 38,0 Z" fill={dark} opacity={0.35} />
      <ellipse cx={14} cy={-82} rx={9} ry={13} fill="#fff" opacity={0.35} />
      {ACCOUNT.mascot.hat && (
        <>
          <ellipse cx={0} cy={-100} rx={44} ry={9} fill={ACCOUNT.mascot.hatColor} />
          <path d="M -24,-100 C -22,-128 22,-128 24,-100 Z" fill={ACCOUNT.mascot.hatTop} />
          <rect x={-24} y={-108} width={48} height={7} fill={ACCOUNT.mascot.hatBand} />
        </>
      )}
      <g transform="translate(0 -62)">
        <Face f={0} seed={23} size={6.5} gap={24} look={look} mood={mood} open={1} ink={COLORS.ink} />
      </g>
      {hold && (
        <>
          <rect x={-40} y={-40} width={26} height={11} rx={5.5} fill={col} transform="rotate(-20 -27 -34)" />
          <rect x={14} y={-40} width={26} height={11} rx={5.5} fill={col} transform="rotate(20 27 -34)" />
        </>
      )}
    </g>
  );
};

// A gold badge/coin with the account's symbol (account.json "badgeSymbol"), centred on (0,0), radius r.
// Swap it for a topic object that suits the niche (a leaf, a dumbbell, a book...).
export const Badge: React.FC<{ r: number }> = ({ r }) => (
  <g>
    <circle r={r} fill="#d99a2b" />
    <circle r={r * 0.86} fill="#f4b740" />
    <circle r={r * 0.86} fill="none" stroke="#ffd77a" strokeWidth={r * 0.05} strokeDasharray={`${r * 0.12} ${r * 0.1}`} />
    <text x={0} y={r * 0.36} textAnchor="middle" fontSize={r * 1.05} fontWeight={800} fill="#8a5a12" fontFamily={BALOO}>{ACCOUNT.badgeSymbol}</text>
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.18} ry={r * 0.1} fill="#fff" opacity={0.45} transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
  </g>
);
