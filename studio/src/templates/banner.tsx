import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../brand/tokens";
import { BALOO, textStyle } from "../brand/type";
import { Badge, Mascot } from "../brand/Mascot";
import { Mark } from "../brand/Avatars";
import { ACCOUNT } from "../brand/account";

// YouTube channel banner, 2560×1440. Only the middle 1546×423 shows on every device
// (x 507..2053, y 508..931). Text and logo live there. Everything else is decoration for TVs.
export const SAFE_BANNER = { x: 507, y: 508, w: 1546, h: 423 };

const Spark: React.FC<{ x: number; y: number; r: number; c?: string; o?: number }> = ({ x, y, r, c = COLORS.accent2, o = 1 }) => (
  <path opacity={o} transform={`translate(${x} ${y})`} d={`M 0,${-r} Q ${r * 0.18},${-r * 0.18} ${r},0 Q ${r * 0.18},${r * 0.18} 0,${r} Q ${-r * 0.18},${r * 0.18} ${-r},0 Q ${-r * 0.18},${-r * 0.18} 0,${-r} Z`} fill={c} />
);

export const YouTubeBanner: React.FC<{ guides?: boolean }> = ({ guides = false }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(255,200,97,0.20), rgba(255,154,42,0.05) 60%, rgba(0,0,0,0) 80%)" }} />
    <svg width={2560} height={1440} viewBox="0 0 2560 1440" style={{ position: "absolute", inset: 0 }}>
      {/* TV-only decoration, outside the safe area */}
      <g transform="translate(330 1250)"><Mascot s={4.4} mood="happy" look={[0.6, -0.4]} wave={40} /></g>
      <g transform="translate(2240 1260)"><Mascot s={4} mood="smile" look={[-0.6, -0.4]} /></g>
      <g transform="translate(2100 1080) rotate(14)"><Badge r={70} /></g>
      <g transform="translate(250 300) rotate(-10)"><Badge r={56} /></g>
      <g transform="translate(2330 260) rotate(8)"><Badge r={44} /></g>
      <Spark x={420} y={480} r={30} /><Spark x={2150} y={470} r={36} /><Spark x={2380} y={700} r={18} c={COLORS.text} o={0.7} />
      <Spark x={170} y={760} r={20} c={COLORS.text} o={0.7} /><Spark x={1280} y={220} r={22} o={0.8} /><Spark x={1290} y={1240} r={18} c={COLORS.text} o={0.6} />
      {/* small sparks just inside the safe area */}
      <Spark x={640} y={560} r={16} o={0.9} /><Spark x={1990} y={880} r={14} c={COLORS.text} o={0.7} />
    </svg>
    {/* safe area content */}
    <div style={{ position: "absolute", left: SAFE_BANNER.x, top: SAFE_BANNER.y, width: SAFE_BANNER.w, height: SAFE_BANNER.h, display: "flex", alignItems: "center", justifyContent: "center", gap: 56 }}>
      <Mark id={ACCOUNT.logoOption as "A" | "B" | "C"} size={300} />
      <div style={{ color: COLORS.text }}>
        <div style={{ fontFamily: BALOO, fontWeight: 800, fontSize: 132, lineHeight: 1 }}>{ACCOUNT.wordmark.plain}<span style={{ color: COLORS.accent }}>{ACCOUNT.wordmark.accent}</span></div>
        <div style={{ ...textStyle("sub"), fontSize: 60, marginTop: 22, opacity: 0.95 }}>{ACCOUNT.tagline}</div>
        <div style={{ ...textStyle("body"), fontSize: 44, marginTop: 14, color: COLORS.accent2 }}>{ACCOUNT.bannerLine}</div>
      </div>
    </div>
    {guides && (
      <AbsoluteFill>
        <div style={{ position: "absolute", left: SAFE_BANNER.x, top: SAFE_BANNER.y, width: SAFE_BANNER.w, height: SAFE_BANNER.h, border: "6px solid #3cf", boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: SAFE_BANNER.y, background: "rgba(255,60,60,0.25)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1440 - SAFE_BANNER.y - SAFE_BANNER.h, background: "rgba(255,60,60,0.25)" }} />
      </AbsoluteFill>
    )}
  </AbsoluteFill>
);
