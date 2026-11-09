import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS } from "../brand/tokens";
import { textStyle } from "../brand/type";
import { Badge, Mascot } from "../brand/Mascot";
import { Bg, Gold, Handle } from "../brand/ui";

// Story templates, 1080×1920. Keep the top 250 px and bottom 340 px clear (BRAND.md 4.1).
// Stickers (link, poll, quiz, question box) are added in the Instagram app, in the empty space.
// Never print sticker boxes or "add the sticker" text in the image (owner rule, 7 Nov 2026).
const cream = COLORS.text;
const Art: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>{children}</svg>
);
const Top: React.FC<{ top?: number; children: React.ReactNode }> = ({ top = 300, children }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, textAlign: "center", color: cream, display: "flex", flexDirection: "column", alignItems: "center" }}>{children}</div>
);
const Foot: React.FC = () => <Handle scale={0.8} style={{ position: "absolute", bottom: 360, left: 0, right: 0, textAlign: "center" }} />;

// 1. New reel teaser. A frame from the reel, a headline, the handle.
export const StoryTeaser: React.FC<{ frame?: string; title?: string; imageY?: number }> = ({ frame = "samples/reel-frame.png", title = "The one thing nobody told you", imageY = 62 }) => (
  <AbsoluteFill>
    <Bg glowY={0.4} />
    <Top>
      <div style={{ ...textStyle("headline") }}>New reel is out</div>
      <div style={{ ...textStyle("sub"), marginTop: 16, opacity: 0.9 }}>{title}</div>
    </Top>
    <div style={{ position: "absolute", top: 590, left: 190, width: 700, height: 760, borderRadius: 40, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", border: "6px solid rgba(255,247,230,0.9)" }}>
      <Img src={staticFile(frame)} style={{ width: 700, height: 1244, marginTop: -Math.round(imageY * 0.648) }} />
    </div>
    <Foot />
  </AbsoluteFill>
);

// 2. Poll. A question in big text, space for the poll sticker.
export const StoryPoll: React.FC<{ before?: string; gold?: string; after?: string }> = ({ before = "Do you know the ", gold = "real", after = " answer?" }) => (
  <AbsoluteFill>
    <Bg glowY={0.35} />
    <Top top={380}><div style={{ ...textStyle("headline"), maxWidth: 860 }}>{before}<Gold>{gold}</Gold>{after}</div></Top>
    <Art><g transform="translate(540 1500)"><Mascot s={2.6} mood="smile" look={[0, -1]} /></g></Art>
    <Foot />
  </AbsoluteFill>
);

// 3. Quiz. A question and a picture, space for the quiz sticker.
export const StoryQuiz: React.FC<{ before?: string; gold?: string; after?: string }> = ({ before = "Quick quiz. What's the ", gold = "right", after = " answer?" }) => (
  <AbsoluteFill>
    <Bg glowY={0.3} />
    <Top><div style={{ ...textStyle("sub"), maxWidth: 880 }}>{before}<Gold>{gold}</Gold>{after}</div></Top>
    <Art>
      <g transform="translate(470 830)"><Mascot s={2.4} mood="o" look={[0.8, 0]} /></g>
      <g transform="translate(630 745)"><Badge r={62} /></g>
    </Art>
    <Foot />
  </AbsoluteFill>
);

// 4. Ask us. Mascot curious, space for the question box sticker.
export const StoryAsk: React.FC<{ topic?: string }> = ({ topic = "this" }) => (
  <AbsoluteFill>
    <Bg glowY={0.3} />
    <Top>
      <div style={{ ...textStyle("headline"), maxWidth: 860 }}>Ask us anything about <Gold>{topic}</Gold></div>
      <div style={{ ...textStyle("body"), marginTop: 26, opacity: 0.9, maxWidth: 800 }}>The best questions become our next reel.</div>
    </Top>
    <Art><g transform="translate(540 970)"><Mascot s={2.2} mood="smile" look={[0.4, 0.9]} /></g></Art>
    <Foot />
  </AbsoluteFill>
);

// 5. Festival greeting. A room at home on Diwali night: Mascot holding a lit diya, diyas, a plate of sweets,
// a marigold toran, and fireworks over the city through the open balcony door behind. No sticker.
const Diya: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-34} r={70} fill="url(#flameGlow)" />
    <path d="M -46,0 C -40,30 40,30 46,0 Z" fill="#B85532" />
    <ellipse cx={0} cy={0} rx={46} ry={10} fill="#D9733F" />
    <ellipse cx={0} cy={-1} rx={34} ry={6} fill="#7A3A22" />
    <path d="M -30,14 C -14,20 14,20 30,14" stroke="#F2A15C" strokeWidth={3} fill="none" opacity={0.7} />
    <path d="M 0,-50 C 12,-30 12,-12 0,-6 C -12,-12 -12,-30 0,-50 Z" fill={COLORS.warm2} />
    <path d="M 0,-38 C 6,-26 6,-14 0,-10 C -6,-14 -6,-26 0,-38 Z" fill={COLORS.warm1} />
    <ellipse cx={0} cy={-15} rx={2.5} ry={4} fill="#fff6d8" />
  </g>
);
// A firework burst: rays with a dot at each tip, an inner ring in a second colour, a soft glow.
const Burst: React.FC<{ x: number; y: number; r: number; c1: string; c2: string; rays?: number; rot?: number }> = ({ x, y, r, c1, c2, rays = 16, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: rays }).map((_, i) => {
      const a = (i / rays) * Math.PI * 2;
      const [cx, cy] = [Math.cos(a), Math.sin(a)];
      return (
        <g key={i}>
          <line x1={cx * r * 0.3} y1={cy * r * 0.3} x2={cx * r * 0.88} y2={cy * r * 0.88} stroke={c1} strokeWidth={r * 0.035} strokeLinecap="round" opacity={0.85} />
          <circle cx={cx * r} cy={cy * r} r={r * 0.045} fill={c1} />
          <circle cx={Math.cos(a + 0.2) * r * 0.55} cy={Math.sin(a + 0.2) * r * 0.55} r={r * 0.03} fill={c2} />
        </g>
      );
    })}
    <circle r={r * 0.08} fill={c2} />
  </g>
);
const Trail: React.FC<{ x: number; y1: number; y2: number; c: string }> = ({ x, y1, y2, c }) => (
  <g>
    <line x1={x} y1={y1} x2={x + 6} y2={y2} stroke={c} strokeWidth={4} strokeLinecap="round" opacity={0.5} strokeDasharray="10 12" />
    <circle cx={x + 6} cy={y2} r={6} fill={c} />
  </g>
);
// Marigold toran: a sagging string of orange and yellow flowers with mango leaves hanging below.
const Toran: React.FC<{ y: number; sag: number }> = ({ y, sag }) => {
  const n = 22;
  const pt = (t: number) => [t * 1080, y + 4 * sag * t * (1 - t)];
  return (
    <g>
      {Array.from({ length: 9 }).map((_, k) => {
        const [lx, ly] = pt((k + 0.5) / 9);
        return (
          <g key={"l" + k} transform={`translate(${lx} ${ly + 14})`}>
            <path d="M 0,0 C 14,18 10,44 0,58 C -10,44 -14,18 0,0 Z" fill="#4F8A4B" />
            <line x1={0} y1={4} x2={0} y2={52} stroke="#3A6B38" strokeWidth={2} />
          </g>
        );
      })}
      {Array.from({ length: n + 1 }).map((_, k) => {
        const [fx, fy] = pt(k / n);
        const c = k % 2 ? COLORS.warm1 : COLORS.warm2;
        return (
          <g key={"f" + k} transform={`translate(${fx} ${fy})`}>
            <circle r={24} fill={c} />
            <circle r={24} fill="none" stroke="#C2601F" strokeWidth={3} strokeDasharray="6 6" opacity={0.6} />
            <circle r={8} fill="#C2601F" opacity={0.7} />
          </g>
        );
      })}
    </g>
  );
};
const Sweets: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const laddoo = (lx: number, ly: number) => (
    <g key={`${lx},${ly}`} transform={`translate(${lx} ${ly})`}>
      <circle r={22} fill="#F2A03D" />
      <circle r={22} fill="none" stroke="#D9822A" strokeWidth={2} />
      {[[-8, -6], [6, -10], [9, 5], [-5, 8], [0, -1]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={2.2} fill="#C46A1C" />)}
      <ellipse cx={-7} cy={-10} rx={6} ry={4} fill="#fff" opacity={0.35} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* small wooden table */}
      <rect x={-120} y={0} width={240} height={22} rx={8} fill="#7A4E36" />
      <rect x={-108} y={22} width={18} height={78} fill="#5E3B29" />
      <rect x={90} y={22} width={18} height={78} fill="#5E3B29" />
      {/* brass plate */}
      <ellipse cx={0} cy={-4} rx={110} ry={18} fill="#C9923A" />
      <ellipse cx={0} cy={-8} rx={96} ry={13} fill="#E0AE52" />
      {[-66, -22, 22, 66].map((lx) => laddoo(lx, -30))}
      {[-44, 0, 44].map((lx) => laddoo(lx, -66))}
      {[-22, 22].map((lx) => laddoo(lx, -100))}
      {/* two kaju barfi diamonds beside the plate */}
      <path d="M -150,-6 l 22,-14 l 22,14 l -22,14 Z" fill="#E8CFA6" transform="translate(30 0)" />
      <path d="M 104,-6 l 22,-14 l 22,14 l -22,14 Z" fill="#E8CFA6" transform="translate(-20 0)" />
    </g>
  );
};

export const StoryGreeting: React.FC<{ before?: string; gold?: string; after?: string; line?: string }> = ({
  before = "Happy ", gold = "Diwali", after = "", line = "May your home stay bright and your worries stay small.",
}) => {
  const door = "M 190,1290 L 190,880 Q 190,760 310,760 L 770,760 Q 890,760 890,880 L 890,1290 Z";
  return (
    <AbsoluteFill>
      <Bg glowY={0.4} />
      <Art>
        <defs>
          <radialGradient id="flameGlow">
            <stop offset="0%" stopColor={COLORS.warm1} stopOpacity={0.55} />
            <stop offset="45%" stopColor={COLORS.warm2} stopOpacity={0.18} />
            <stop offset="100%" stopColor={COLORS.warm2} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="floorGlow">
            <stop offset="0%" stopColor={COLORS.warm1} stopOpacity={0.3} />
            <stop offset="100%" stopColor={COLORS.warm1} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1024" />
            <stop offset="100%" stopColor="#24294A" />
          </linearGradient>
          <clipPath id="doorClip"><path d={door} /></clipPath>
        </defs>
        {/* floor */}
        <rect x={0} y={1290} width={1080} height={630} fill="#231C2C" />
        <rect x={0} y={1290} width={1080} height={8} fill="#3A2C38" />
        {/* balcony doorway: sky, fireworks, city, railing */}
        <g clipPath="url(#doorClip)">
          <rect x={190} y={760} width={700} height={530} fill="url(#nightSky)" />
          <Burst x={340} y={900} r={115} c1={COLORS.warm1} c2={COLORS.text} rot={8} />
          <Burst x={740} y={880} r={100} c1={COLORS.text} c2={COLORS.warm2} rays={14} />
          <Burst x={560} y={830} r={62} c1={COLORS.warm2} c2={COLORS.warm1} rays={12} rot={15} />
          <Burst x={270} y={1070} r={52} c1={COLORS.text} c2={COLORS.warm1} rays={12} />
          <Burst x={810} y={1060} r={58} c1={COLORS.warm1} c2={COLORS.text} rays={12} rot={10} />
          <Trail x={450} y1={1180} y2={1010} c={COLORS.warm1} />
          <Trail x={660} y1={1180} y2={980} c={COLORS.text} />
          {[[190, 1150, 90], [280, 1120, 70], [350, 1160, 110], [470, 1130, 80], [550, 1100, 100], [650, 1140, 90], [740, 1110, 80], [820, 1150, 80]].map(([bx, by, bw], i) => (
            <g key={i}>
              <rect x={bx} y={by} width={bw} height={1290 - by} fill="#141832" />
              {Array.from({ length: 6 }).map((_, j) => (
                <rect key={j} x={bx + 14 + (j % 3) * ((bw - 34) / 2)} y={by + 16 + Math.floor(j / 3) * 26} width={8} height={10} fill={COLORS.warm1} opacity={(i + j) % 3 ? 0.55 : 0.15} />
              ))}
            </g>
          ))}
          <rect x={190} y={1196} width={700} height={12} fill="#6B4A3A" />
          {Array.from({ length: 18 }).map((_, k) => <rect key={k} x={200 + k * 39} y={1208} width={8} height={82} fill="#5A3D30" />)}
        </g>
        <path d={door} fill="none" stroke="#5E3B29" strokeWidth={22} />
        {/* curtains */}
        <path d="M 160,750 L 270,750 C 250,900 210,1000 250,1120 C 230,1200 220,1260 230,1300 L 150,1300 Z" fill="#8E3B2E" />
        <path d="M 920,750 L 810,750 C 830,900 870,1000 830,1120 C 850,1200 860,1260 850,1300 L 930,1300 Z" fill="#8E3B2E" />
        <path d="M 190,760 C 215,900 200,1020 225,1120" stroke="#A9493A" strokeWidth={6} fill="none" />
        <path d="M 890,760 C 865,900 880,1020 855,1120" stroke="#A9493A" strokeWidth={6} fill="none" />
        <rect x={150} y={736} width={780} height={18} rx={9} fill="#7A4E36" />
        {/* diyas on the balcony rail */}
        {[300, 400, 680, 780].map((x) => <Diya key={x} x={x} y={1196} s={0.55} />)}
        {/* warm light on the floor, floor diyas, sweets */}
        <ellipse cx={540} cy={1440} rx={480} ry={100} fill="url(#floorGlow)" />
        {[130, 270].map((x) => <Diya key={x} x={x} y={1460} s={1.0} />)}
        <Sweets x={860} y={1370} />
        <g transform="translate(540 1460)"><Mascot s={3.4} mood="happy" look={[0, 0.6]} hold /></g>
        <Diya x={540} y={1402} s={1.3} />
        <Toran y={270} sag={70} />
      </Art>
      <Top top={440}>
        <div style={{ ...textStyle("hero") }}>{before}<Gold>{gold}</Gold>{after}</div>
        <div style={{ ...textStyle("body"), marginTop: 24, opacity: 0.92, maxWidth: 820 }}>{line}</div>
      </Top>
      <Foot />
    </AbsoluteFill>
  );
};
