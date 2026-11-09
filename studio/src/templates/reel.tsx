import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../brand/tokens";
import { textStyle } from "../brand/type";
import { Badge, Mascot } from "../brand/Mascot";
import { ACCOUNT } from "../brand/account";
import { appear, Bg, DISCLAIMER, Gold, Handle, Logo, rise, SourceLine } from "../brand/ui";
import { Glow, StoryDefs } from "../kit/parts";

// Reel templates, 1080×1920. Content stays inside x 60..960, y 220..1500 (BRAND.md 4.1).
// Every template takes `f` to animate in. Without it, it shows the finished state.

const cream = COLORS.text;
const Col: React.FC<{ top: number; children: React.ReactNode; align?: "center" | "left" }> = ({ top, children, align = "center" }) => (
  <div style={{ position: "absolute", top, left: 90, right: 150, display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", textAlign: align, color: cream }}>{children}</div>
);
const Art: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}><StoryDefs />{children}</svg>
);

// 1. Reel cover. Everything inside the 3:4 grid crop (y 240..1680) and above the caption zone.
export const ReelCover: React.FC<{ tag?: string; before?: string; gold?: string; after?: string }> = ({ tag = ACCOUNT.defaultTag, before = "The one thing nobody ", gold = "told", after = " you" }) => (
  <AbsoluteFill>
    <Bg glowY={0.62} />
    <Col top={330}>
      <div style={{ ...textStyle("source"), fontSize: 38, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7, border: `3px solid rgba(255,247,230,0.45)`, borderRadius: 40, padding: "8px 30px" }}>{tag}</div>
      <div style={{ ...textStyle("hero"), marginTop: 40, maxWidth: 840 }}>{before}<Gold>{gold}</Gold>{after}</div>
    </Col>
    <Art>
      <g transform="translate(540 1440)"><Mascot s={5.2} mood="o" look={[0, -0.6]} /></g>
      <g transform="translate(790 1300) rotate(14)"><Badge r={78} /></g>
    </Art>
  </AbsoluteFill>
);

// 2. Hook card. One bold line over the opening scene (first 1.5 s).
export const HookCard: React.FC<{ f?: number; line?: string; gold?: string; scene?: React.ReactNode }> = ({ f, line = "You do this every day. Is it ", gold = "wrong?", scene }) => {
  const p = appear(f, 0, 9);
  return (
    <AbsoluteFill>
      {scene ?? <AnalogyScene subtitle="" />}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(22,30,52,0.92) 0%, rgba(22,30,52,0.75) 34%, rgba(22,30,52,0) 52%)" }} />
      <Col top={300}>
        <div style={{ ...textStyle("headline"), ...rise(p), textShadow: "0 4px 24px rgba(5,8,28,0.7)" }}>{line}<Gold>{gold}</Gold></div>
      </Col>
    </AbsoluteFill>
  );
};

// 3. Text-line scene. One short point on navy, Mascot reacting.
export const TextLine: React.FC<{ f?: number; text?: string; gold?: string }> = ({ f, text = "One short point, in plain words. One key ", gold = "word." }) => {
  const p = appear(f, 0);
  const m = appear(f, 10);
  return (
    <AbsoluteFill>
      <Bg glowY={0.4} />
      <Col top={640}><div style={{ ...textStyle("sub"), ...rise(p), maxWidth: 820 }}>{text}<Gold>{gold}</Gold></div></Col>
      <Art>
        <g transform={`translate(260 ${1470 + (1 - m) * 60})`} opacity={m}><Mascot s={3.6} mood="o" look={[0.6, -0.8]} /></g>
      </Art>
    </AbsoluteFill>
  );
};

// 4. Big-number card. The payoff: one number in gold, label above, date and source below.
export const BigNumber: React.FC<{ f?: number; label?: string; value?: string; source?: string }> = ({ f, label = "The key number", value = "42%", source = "Source · date" }) => {
  const a = appear(f, 0), b = appear(f, 8, 14), c = appear(f, 18);
  return (
    <AbsoluteFill>
      <Bg glowY={0.42} />
      <Col top={560}>
        <div style={{ ...textStyle("sub"), ...rise(a) }}>{label}</div>
        <div style={{ ...textStyle("number"), color: COLORS.accent, marginTop: 30, opacity: b, transform: `scale(${0.8 + 0.2 * b})` }}>{value}</div>
        <SourceLine style={{ marginTop: 34, ...rise(c, 14) }}>{source}</SourceLine>
      </Col>
      <Art>
        <g transform="translate(780 1480)" opacity={c}><Mascot s={2.8} mood="happy" look={[-0.6, -0.9]} /></g>
      </Art>
    </AbsoluteFill>
  );
};

// 5. Analogy scene. The layout every story world follows: world in the top 2/3,
// subtitles in the band y 1320..1500, nothing important in the bottom 420 px.
export const AnalogyScene: React.FC<{ subtitle?: string }> = ({ subtitle = "Think of it as a little boat on a lake." }) => (
  <AbsoluteFill style={{ backgroundColor: "#a9c6e0" }}>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f6d9a8 0%, #f3c58e 38%, #6fa3c4 39%, #3d6f93 70%, #1A1D2E 100%)" }} />
    <Art>
      <Glow x={760} y={430} r={420} />
      <circle cx={760} cy={430} r={90} fill="#ffe7a8" />
      <path d="M 0,740 Q 270,690 540,742 T 1080,736 L 1080,760 L 0,760 Z" fill="#8fb8d6" opacity={0.7} />
      {/* the boat-bank */}
      <g transform="translate(470 800)">
        <path d="M -230,-40 L 230,-40 Q 200,60 120,70 L -120,70 Q -200,60 -230,-40 Z" fill="#8b6f7a" />
        <rect x={-230} y={-54} width={460} height={18} rx={9} fill="#b7a3a9" />
        <rect x={-6} y={-330} width={12} height={290} fill="#4b4044" />
        <path d="M 6,-320 Q 150,-200 6,-60 Z" fill="#f2ede4" />
        <g transform="translate(-110 -50)"><Mascot s={2.6} mood="smile" look={[0.6, -0.3]} /></g>
      </g>
      {[[160, 980], [700, 1050], [380, 1150], [880, 930]].map(([x, y], i) => (
        <path key={i} d={`M ${x - 50},${y} q 25,-16 50,0 t 50,0`} stroke="#d7ecfa" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} />
      ))}
    </Art>
    <div style={{ position: "absolute", left: 90, right: 150, top: 1320, height: 180, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", ...textStyle("subtitle"), color: cream, textShadow: "0 2px 0 rgba(10,14,40,0.85), 0 0 18px rgba(10,14,40,0.9)" }}>{subtitle}</div>
  </AbsoluteFill>
);

// 6. "The real term" card. Show the idea first, then name it.
export const RealTerm: React.FC<{ f?: number; term?: string; meaning?: string }> = ({ f, term = "The real term", meaning = "What it means, in one plain line." }) => {
  const a = appear(f, 0), b = appear(f, 10, 14), c = appear(f, 24);
  return (
    <AbsoluteFill>
      <Bg glowY={0.45} />
      <Col top={600}>
        <div style={{ ...textStyle("body"), opacity: 0.85, ...rise(a) }}>This is called</div>
        <div style={{ ...textStyle("hero"), color: COLORS.accent, marginTop: 24, ...rise(b, 40) }}>{term}</div>
        <div style={{ width: 160, height: 6, borderRadius: 3, background: "rgba(255,247,230,0.35)", margin: "46px 0", opacity: c }} />
        <div style={{ ...textStyle("body"), maxWidth: 760, ...rise(c) }}>{meaning}</div>
      </Col>
    </AbsoluteFill>
  );
};

// 7. End card. Concept, handle, disclaimer, sources. Last ~6 s.
export const EndCard: React.FC<{ f?: number; gold?: string; rest?: string; line?: string; sources?: string }> = ({
  f,
  gold = "The idea",
  rest = " in one line",
  line = "The one thing the viewer keeps.",
  sources = "Figures: source, date",
}) => {
  const a = appear(f, 0), b = appear(f, 12), c = appear(f, 26), d = appear(f, 40);
  return (
    <AbsoluteFill>
      <Bg glowY={0.3} />
      <Logo size={170} style={{ left: 455 - 30, top: 300, opacity: a }} />
      <Col top={560}>
        <div style={{ ...textStyle("headline"), maxWidth: 820, ...rise(a) }}><Gold>{gold}</Gold>{rest}</div>
        <div style={{ ...textStyle("body"), marginTop: 40, maxWidth: 780, opacity: 0.92, ...rise(b) }}>{line}</div>
        <Handle style={{ marginTop: 70, ...rise(c) }} />
      </Col>
      <div style={{ position: "absolute", left: 90, right: 150, top: 1290, textAlign: "center", opacity: d }}>
        <SourceLine style={{ fontWeight: 700, opacity: 0.95 }}>{DISCLAIMER}</SourceLine>
        <SourceLine style={{ marginTop: 10 }}>{sources}</SourceLine>
      </div>
    </AbsoluteFill>
  );
};
