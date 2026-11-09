import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Baloo2";
import { COLORS } from "./tokens";
import { Badge, Mascot } from "./Mascot";
import { ACCOUNT } from "./account";

const { fontFamily: BALOO } = loadFont("normal", { weights: ["500", "700", "800"] });
export { BALOO };

const Defs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <radialGradient id={`warm-${id}`} cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor={COLORS.warm1} stopOpacity="0.55" />
      <stop offset="0.45" stopColor={COLORS.warm2} stopOpacity="0.18" />
      <stop offset="1" stopColor={COLORS.warm2} stopOpacity="0" />
    </radialGradient>
  </defs>
);

const Spark: React.FC<{ x: number; y: number; r: number; c?: string }> = ({ x, y, r, c = COLORS.accent2 }) => (
  <path transform={`translate(${x} ${y})`} d={`M 0,${-r} Q ${r * 0.18},${-r * 0.18} ${r},0 Q ${r * 0.18},${r * 0.18} 0,${r} Q ${-r * 0.18},${r * 0.18} ${-r},0 Q ${-r * 0.18},${-r * 0.18} 0,${-r} Z`} fill={c} />
);

// A: Hello Mascot. Full bean, waving, standing in warm light.
const A: React.FC = () => (
  <g>
    <Defs id="a" />
    <circle cx={540} cy={520} r={430} fill="url(#warm-a)" />
    <ellipse cx={540} cy={952} rx={250} ry={34} fill="#000" opacity={0.28} />
    <g transform="translate(540 950)"><Mascot s={6.2} mood="happy" look={[0.2, -0.3]} wave={40} /></g>
  </g>
);

// B: Mascot with a badge. Mid-size bean hugging a big badge, looking at it.
const B: React.FC = () => (
  <g>
    <Defs id="b" />
    <circle cx={540} cy={500} r={430} fill="url(#warm-b)" />
    <ellipse cx={540} cy={962} rx={230} ry={30} fill="#000" opacity={0.28} />
    <g transform="translate(540 960)"><Mascot s={6.4} mood="smile" look={[0, 0.9]} /></g>
    <g transform="translate(540 822)"><Badge r={128} /></g>
    {/* little arms over the coin */}
    <rect x={392} y={800} width={66} height={50} rx={25} fill={COLORS.mascot} />
    <rect x={622} y={800} width={66} height={50} rx={25} fill={COLORS.mascot} />
  </g>
);

// C: Big face. Head and hat fill the circle, bust crop. Best for tiny sizes.
const C: React.FC = () => (
  <g>
    <Defs id="c" />
    <circle cx={540} cy={560} r={470} fill="url(#warm-c)" />
    <g transform="translate(540 1110)"><Mascot s={7.7} mood="smile" look={[0.25, -0.25]} /></g>
    <Spark x={205} y={330} r={34} />
    <Spark x={872} y={372} r={24} />
    <Spark x={250} y={430} r={14} c={COLORS.text} />
  </g>
);

export const AVATARS = { A, B, C } as const;
export type AvatarId = keyof typeof AVATARS;

// The mark as an SVG you can drop anywhere at any size. Navy disc, art clipped to the circle.
export const Mark: React.FC<{ id: AvatarId; size: number; square?: boolean }> = ({ id, size, square = false }) => {
  const Art = AVATARS[id];
  const clip = `clip-${id}-${size}-${square ? "s" : "c"}`;
  return (
    <svg width={size} height={size} viewBox="0 0 1080 1080" style={{ display: "block" }}>
      <defs>
        <clipPath id={clip}>{square ? <rect width={1080} height={1080} /> : <circle cx={540} cy={540} r={540} />}</clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width={1080} height={1080} fill={COLORS.bg} />
        <Art />
      </g>
    </svg>
  );
};

// 1080×1080 square export (platforms crop it to a circle themselves).
export const AvatarStill: React.FC<{ id: AvatarId }> = ({ id }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <Mark id={id} size={1080} square />
  </AbsoluteFill>
);

const NAMES: Record<AvatarId, string> = { A: `Hello ${ACCOUNT.mascot.name}`, B: `${ACCOUNT.mascot.name} with a badge`, C: "Big face" };

const Wordmark: React.FC<{ size: number; onDark: boolean }> = ({ size, onDark }) => (
  <div style={{ fontFamily: BALOO, fontWeight: 800, fontSize: size, lineHeight: 1, color: onDark ? COLORS.text : COLORS.bg }}>
    {ACCOUNT.wordmark.plain}<span style={{ color: onDark ? COLORS.accent : COLORS.accentDark }}>{ACCOUNT.wordmark.accent}</span>
  </div>
);

// Review sheet: each option big, at phone sizes on light and dark, and as a lockup with the wordmark.
export const AvatarSheet: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#ECE7DD", fontFamily: BALOO, padding: 60, flexDirection: "row", gap: 40 }}>
    {(Object.keys(AVATARS) as AvatarId[]).map((id) => (
      <div key={id} style={{ flex: "1 1 0", minWidth: 0, background: "#fff", borderRadius: 28, padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: COLORS.bg }}>{id} · {NAMES[id]}</div>
        <Mark id={id} size={420} />
        <div style={{ display: "flex", gap: 0, width: "100%", borderRadius: 18, overflow: "hidden" }}>
          {[false, true].map((dark) => (
            <div key={String(dark)} style={{ flex: 1, background: dark ? "#000" : "#fff", border: dark ? "none" : "2px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "26px 0", color: dark ? "#aaa" : "#777", fontSize: 22 }}>
              <div style={{ textAlign: "center" }}><Mark id={id} size={110} /><div style={{ marginTop: 6 }}>110 px</div></div>
              <div style={{ textAlign: "center" }}><Mark id={id} size={48} /><div style={{ marginTop: 6 }}>48</div></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: COLORS.bg, borderRadius: 18, padding: "22px 26px", width: "100%", boxSizing: "border-box" }}>
          <Mark id={id} size={84} />
          <Wordmark size={40} onDark />
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
