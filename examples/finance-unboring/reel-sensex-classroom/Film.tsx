import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PatrickHand";
import { CAM, CUES as C, STORY, SUBS } from "./story";
import { camera, worldTransform } from "./kit/camera";
import { clamp01, eback, eio, eout, lerp, ramp, rnd, wobble } from "./kit/helpers";
import { Face, Glow, StoryDefs } from "./kit/parts";
import { Subtitles } from "./kit/Subtitles";

// "What IS the Sensex?" A classroom of 30 bean students is the Sensex; the scoreboard on the back
// wall is the class average. Oil barrels weigh the class down, paper planes (foreign money) fly out,
// then oil gets cheaper and the planes fly back with coins, and the average jumps.
// Token: the paper plane.

const { fontFamily: HAND } = loadFont();

// ---------- small helpers ----------
const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b), k = clamp01(t);
  return "#" + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};
const commas = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const pop = (f: number, at: number, len = 14) => eback(ramp(f, at, at + len));
const window01 = (f: number, a: number, b: number, fadeIn = 10, fadeOut = 10) => eio(ramp(f, a, a + fadeIn)) * (1 - eio(ramp(f, b - fadeOut, b)));

// ---------- story clock ----------
const gloom = (f: number) => eio(ramp(f, C.weeks, C.gloomy + 10)) * (1 - eio(ramp(f, C.changed - 8, C.changed + 22)));
const sunBoost = (f: number) => eio(ramp(f, C.changed - 6, C.changed + 30));
const spot = (f: number) => window01(f, C.one - 4, C.check + 6, 12, 14);
const barrels = (f: number) => (f < C.oil ? 0 : 1); // per-desk drop is staggered below
const shrink = (f: number) => eio(ramp(f, C.cheaper - 4, C.cheaper + 22));
const cheer = (f: number) => eio(ramp(f, C.jumped2 - 4, C.jumped2 + 10));

// ---------- the class ----------
const PASTELS = ["#f7b7a3", "#ffd98e", "#a8dcc8", "#b8c6f5", "#f5c3d8", "#c9e4a5", "#ffc59e", "#b6e0f0"];
type Kid = { i: number; r: number; c: number; x: number; y: number; s: number; col: string; extra: boolean };
const rowY = (r: number) => 478 + r * 78;
const rowS = (r: number) => 0.62 + r * 0.09;
const rowGap = (r: number) => 88 + r * 7;
const KIDS: Kid[] = [];
for (let r = 0; r < 5; r++) {
  for (let c = -2; c < 8; c++) {
    const extra = c < 0 || c > 5;
    const i = KIDS.length;
    KIDS.push({ i, r, c, x: 960 + (c - 2.5) * rowGap(r), y: rowY(r), s: rowS(r), col: PASTELS[Math.floor(rnd(`col${r}-${c}`) * PASTELS.length)], extra });
  }
}
const CORE = KIDS.filter((k) => !k.extra);
const HERO = KIDS.find((k) => k.r === 3 && k.c === 1)!; // the one student in the spotlight
const BIG = new Set(KIDS.filter((k) => (k.r === 1 && k.c === 4) || (k.r === 2 && k.c === 1) || (k.r === 4 && k.c === 3) || (k.r === 3 && k.c === 5)).map((k) => k.i));
const MARKS = CORE.map((k) => 52 + Math.floor(rnd(`mk${k.i}`) * 44));
const coreIdx = (k: Kid) => CORE.indexOf(k);
const order = (k: Kid) => (rnd(`ord${k.i}`) * 0.6 + (k.r * 6 + k.c) / 30 * 0.4); // stagger 0..1

// ---------- the room ----------
const BOARD = { x: 700, y: 92, w: 520, h: 280 };
const WIN_R = { x: 1300, y: 120, w: 190, h: 280 };
const WIN_L = { x: 430, y: 120, w: 190, h: 280 };
const MOTES = Array.from({ length: 26 }, (_, k) => ({ x: rnd(`mx${k}`), y: rnd(`my${k}`), s: rnd(`ms${k}`) * 10 }));

const Room: React.FC<{ f: number }> = ({ f }) => {
  const g = gloom(f);
  const wallTop = mix("#f6e6c9", "#b9c0cc", g);
  const wallBot = mix("#efd2a8", "#a4acbb", g);
  const floor = mix("#c98f5e", "#7f7a80", g);
  return (
    <g>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={wallTop} /><stop offset="1" stopColor={wallBot} /></linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={floor} /><stop offset="1" stopColor={mix(floor, "#3a2a2a", 0.35)} /></linearGradient>
      </defs>
      <rect x={-300} y={-800} width={2520} height={1440} fill="url(#wall)" />
      {/* wainscot */}
      <rect x={-300} y={430} width={2520} height={210} fill={mix("#d9a877", "#8f96a3", g)} opacity={0.55} />
      <rect x={-300} y={426} width={2520} height={8} fill={mix("#b47c4c", "#6f7684", g)} />
      <rect x={-300} y={640} width={2520} height={1100} fill="url(#floor)" />
      {/* floor boards */}
      {Array.from({ length: 14 }, (_, k) => <line key={k} x1={-300} y1={700 + k * 70} x2={2220} y2={700 + k * 70} stroke="#000" strokeOpacity={0.06} strokeWidth={3} />)}
      <WindowPane f={f} {...WIN_L} side="L" />
      <WindowPane f={f} {...WIN_R} side="R" />
    </g>
  );
};

// A window with sky, sea and (on the right) the oil tanker passing.
const WindowPane: React.FC<{ f: number; x: number; y: number; w: number; h: number; side: "L" | "R" }> = ({ f, x, y, w, h, side }) => {
  const g = gloom(f);
  const id = `win${side}`;
  const sky1 = mix("#8fd3f5", "#8a95a8", g), sky2 = mix("#fff1c9", "#b7bcc6", g);
  const sea = mix("#4aa3c9", "#5e6f82", g);
  const ship = side === "R" ? lerp(x - 120, x + w * 0.42, eout(ramp(f, C.abroad - 40, C.abroad + 20))) : -999;
  const sun = side === "R" ? 1 - g * 0.9 : 0;
  return (
    <g>
      <clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={10} /></clipPath>
      <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sky1} /><stop offset="1" stopColor={sky2} /></linearGradient>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}s)`} />
        {side === "R" && <circle cx={x + w * 0.72} cy={y + h * 0.28} r={26} fill="#fff4c2" opacity={sun} />}
        {/* clouds */}
        {[0, 1].map((k) => {
          const cx = x + ((f * (0.25 + k * 0.15) + k * 90 + (side === "L" ? 40 : 0)) % (w + 120)) - 60;
          return <g key={k} opacity={0.8 + g * 0.2}><ellipse cx={cx} cy={y + 60 + k * 50} rx={36} ry={14} fill={mix("#ffffff", "#9aa1ad", g)} /><ellipse cx={cx + 22} cy={y + 52 + k * 50} rx={22} ry={13} fill={mix("#ffffff", "#9aa1ad", g)} /></g>;
        })}
        <rect x={x} y={y + h * 0.7} width={w} height={h * 0.3} fill={sea} />
        <path d={`M ${x},${y + h * 0.7} L ${x + w},${y + h * 0.7}`} stroke="#fff" strokeOpacity={0.4} strokeWidth={2} />
        {side === "R" && (
          <g transform={`translate(${ship} ${y + h * 0.74 + Math.sin(f * 0.15) * 1.5})`}>
            <path d="M -46,0 L 46,0 L 36,16 L -38,16 Z" fill="#c4473b" />
            <rect x={-34} y={-12} width={22} height={12} rx={2} fill="#e9e3d8" />
            <rect x={-8} y={-10} width={14} height={10} rx={3} fill="#3c4a5c" />
            <rect x={10} y={-10} width={14} height={10} rx={3} fill="#3c4a5c" />
            <rect x={28} y={-10} width={12} height={10} rx={3} fill="#3c4a5c" />
          </g>
        )}
      </g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke="#fdf8ee" strokeWidth={12} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#fdf8ee" strokeWidth={7} />
      <line x1={x} y1={y + h * 0.45} x2={x + w} y2={y + h * 0.45} stroke="#fdf8ee" strokeWidth={7} />
      <rect x={x - 14} y={y + h + 2} width={w + 28} height={12} rx={4} fill="#e8dcc6" />
    </g>
  );
};

// Sunlight from the right window: the one light source.
const SunShaft: React.FC<{ f: number }> = ({ f }) => {
  const k = (1 - gloom(f) * 0.85) * (0.75 + 0.35 * sunBoost(f)) * (0.95 + 0.05 * Math.sin(f * 0.05));
  const { x, y, w, h } = WIN_R;
  return (
    <g style={{ mixBlendMode: "screen" }} opacity={k}>
      <defs>
        <linearGradient id="shaft" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff2c4" stopOpacity="0.55" /><stop offset="1" stopColor="#fff2c4" stopOpacity="0" /></linearGradient>
      </defs>
      <path d={`M ${x},${y} L ${x + w},${y} L ${x + w - 260},${y + h + 640} L ${x - 520},${y + h + 640} Z`} fill="url(#shaft)" />
      {MOTES.map((m, j) => {
        const t = m.y;
        const px = lerp(x + w * m.x, x - 300 + 200 * m.x, t) + 14 * Math.sin(f * 0.02 + m.s);
        const py = y + 40 + t * 700 + 10 * Math.sin(f * 0.017 + m.s * 2);
        return <circle key={j} cx={px} cy={py} r={2.2} fill="#fff7d8" opacity={0.35 + 0.35 * Math.sin(f * 0.07 + m.s)} />;
      })}
      <Glow x={x + w * 0.6} y={y + h * 0.4} r={260} opacity={0.5} />
    </g>
  );
};

// ---------- the scoreboard ----------
const Board: React.FC<{ f: number }> = ({ f }) => {
  const { x, y, w, h } = BOARD;
  const cx = x + w / 2;
  const g = gloom(f);
  // which message is showing
  const s1 = 1 - eio(ramp(f, C.is - 6, C.is + 4)); // hook number
  const sQ = window01(f, C.is - 2, C.average, 8, 10); // the question mark
  const sAvg = window01(f, C.average, C.sensex2 + 2, 8, 8); // CLASS AVERAGE
  const sSx = window01(f, C.sensex2, C.weeks + 4, 10, 10); // SENSEX = 30 / NIFTY = 50
  const sDown = window01(f, C.weeks, C.buyers + 40, 12, 10); // gloomy arrow
  const sUp = eio(ramp(f, C.jumped2 - 6, C.jumped2 + 6)) * (1 - eio(ramp(f, C.card - 20, C.card)));
  const count = lerp(75693, 76918, eout(ramp(f, C.jumped + 6, C.points + 8)));
  const count2 = lerp(75693, 76918, eout(ramp(f, C.jumped2 - 4, C.jumped2 + 40)));
  const chalk = "#f4f1e6";
  const T: React.FC<{ y: number; s: number; o: number; col?: string; children: React.ReactNode; dx?: number }> = ({ y: ty, s, o, col = chalk, children, dx = 0 }) => (
    <text x={cx + dx} y={ty} fontFamily={HAND} fontSize={s} fill={col} textAnchor="middle" opacity={o}>{children}</text>
  );
  const up = "#8ff0b4", down = "#ff9a8a";
  return (
    <g>
      <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx={14} fill="#a8703f" />
      <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx={14} fill="none" stroke="#7d4f2b" strokeWidth={4} />
      <defs><linearGradient id="slate" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={mix("#35594a", "#3a4a48", g)} /><stop offset="1" stopColor={mix("#25443a", "#2d3a3a", g)} /></linearGradient></defs>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="url(#slate)" />
      {/* chalk smudges */}
      <ellipse cx={x + 120} cy={y + 210} rx={90} ry={22} fill="#fff" opacity={0.04} />
      <ellipse cx={x + 380} cy={y + 70} rx={110} ry={20} fill="#fff" opacity={0.035} />
      <rect x={x + 30} y={y + h - 4} width={w - 60} height={10} rx={3} fill="#8a5a33" />
      <rect x={x + 70} y={y + h - 9} width={30} height={7} rx={3} fill="#fff" opacity={0.9} />

      {/* 1. the hook number */}
      <g opacity={s1}>
        <T y={y + 70} s={44} o={1}>SENSEX</T>
        <T y={y + 168} s={104} o={1}>{commas(count)}</T>
        <T y={y + 240} s={56} o={eio(ramp(f, C.jumped + 10, C.jumped + 24))} col={up}>▲ +1,225</T>
      </g>
      {/* 2. the question */}
      <g opacity={sQ} transform={`translate(${cx} ${y + 170}) rotate(${wobble(f, 4) * 4}) scale(${pop(f, C.is - 2, 16)}) translate(${-cx} ${-(y + 170)})`}>
        <T y={y + 220} s={230} o={1}>?</T>
      </g>
      {/* 3. class average */}
      <g opacity={sAvg}>
        <T y={y + 82} s={46} o={1}>CLASS AVERAGE</T>
        <T y={y + 210} s={130} o={pop(f, C.average + 6, 14)}>{Math.round(MARKS.reduce((a, b) => a + b, 0) / MARKS.length)}</T>
      </g>
      {/* 4. Sensex = 30, Nifty = 50 */}
      <g opacity={sSx}>
        <T y={y + 96} s={70} o={1}>SENSEX = 30</T>
        <T y={y + 140} s={32} o={eio(ramp(f, C.companies - 20, C.companies))} col="#cfe8dc">India's biggest companies</T>
        <T y={y + 230} s={70} o={eio(ramp(f, C.nifty - 4, C.nifty + 8))} col="#ffe3a3">NIFTY = 50</T>
      </g>
      {/* 5. gloomy: an arrow sagging down */}
      <g opacity={sDown}>
        <T y={y + 80} s={46} o={1}>SENSEX</T>
        <g transform={`translate(${cx} ${y + 175 + Math.sin(f * 0.08) * 6})`}>
          <path d="M -150,-50 C -80,-40 -40,10 20,20 C 70,28 110,40 150,70" stroke={down} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M 150,70 L 112,74 M 150,70 L 136,36" stroke={down} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      </g>
      {/* 6. the jump */}
      <g opacity={sUp} transform={`translate(${cx} ${y + 150}) scale(${0.85 + 0.15 * pop(f, C.jumped2 - 6, 16)}) translate(${-cx} ${-(y + 150)})`}>
        <T y={y + 70} s={44} o={1}>SENSEX</T>
        <T y={y + 168} s={104} o={1}>{commas(count2)}</T>
        <T y={y + 240} s={56} o={eio(ramp(f, C.jumped2 + 6, C.jumped2 + 18))} col={up}>▲ +1,225</T>
      </g>
    </g>
  );
};

// ---------- a student ----------
const Bean: React.FC<{ f: number; k: Kid; mood: "smile" | "happy" | "o" | "sad"; look: [number, number]; scale: number; droop: number; hop: number; paper?: number; mark?: number; halo?: number }> = ({ f, k, mood, look, scale, droop, hop, paper = 0, mark = 0, halo = 0 }) => {
  const breathe = 1 + 0.025 * wobble(f, k.i, 0.8);
  const sy = breathe * (1 - 0.1 * droop);
  const sx = (1 / breathe) * (1 + 0.06 * droop);
  const dark = mix(k.col, "#5a3e3e", 0.25);
  return (
    <g transform={`translate(${k.x} ${k.y - hop}) scale(${k.s * scale})`}>
      {halo > 0 && <circle cx={0} cy={-62} r={70} fill="none" stroke="#ffd36b" strokeWidth={5} opacity={halo * (0.6 + 0.3 * Math.sin(f * 0.2))} />}
      <g transform={`scale(${sx} ${sy})`}>
        <path d="M -38,0 C -44,-62 -24,-104 0,-104 C 24,-104 44,-62 38,0 Z" fill={k.col} />
        <path d="M -38,0 C -36,-26 -26,-40 -6,-44 L 38,0 Z" fill={dark} opacity={0.35} />
        <ellipse cx={-14} cy={-82} rx={9} ry={13} fill="#fff" opacity={0.3} />
        <g transform={`translate(0 ${-62 + droop * 4})`}>
          <Face f={f} seed={k.i * 7 + 3} size={6.5} gap={24} look={look} mood={mood} />
        </g>
      </g>
      {paper > 0 && (
        <g transform={`translate(${28} ${-60 - 50 * paper}) rotate(${-6 + 4 * Math.sin(f * 0.1 + k.i)}) scale(${paper})`}>
          <rect x={-22} y={-28} width={44} height={56} rx={3} fill="#fffdf6" stroke="#d8cdb8" strokeWidth={2} />
          <line x1={-14} y1={-14} x2={14} y2={-14} stroke="#c8d6ea" strokeWidth={2} />
          <text x={0} y={16} fontFamily={HAND} fontSize={26} fill="#d0453a" textAnchor="middle">{mark}</text>
        </g>
      )}
    </g>
  );
};

const Desk: React.FC<{ f: number; k: Kid; barrel: number; small: number; coin: number }> = ({ f, k, barrel, small, coin }) => {
  const bs = lerp(1, 0.3, small);
  return (
    <g transform={`translate(${k.x} ${k.y}) scale(${k.s})`}>
      <rect x={-52} y={-16} width={104} height={14} rx={4} fill="#b97f4b" />
      <rect x={-52} y={-16} width={104} height={5} rx={2} fill="#d9a06a" />
      <rect x={-46} y={-2} width={92} height={42} fill="#9a6538" />
      {barrel > 0 && (
        <g transform={`translate(-24 ${-16 - 60 * (1 - barrel)}) scale(${bs})`} opacity={clamp01(barrel * 2)}>
          <rect x={-14} y={-38} width={28} height={38} rx={5} fill={mix("#3d4250", "#6b7280", small)} />
          <rect x={-14} y={-28} width={28} height={4} fill="#c4473b" />
          <rect x={-14} y={-12} width={28} height={4} fill="#c4473b" />
          <path d="M -3,-24 C -3,-30 0,-34 0,-34 C 0,-34 3,-30 3,-24 A 3,3 0 0 1 -3,-24 Z" fill="#ffd36b" opacity={0.9} />
        </g>
      )}
      {coin > 0 && (
        <g transform={`translate(24 ${-24 - 70 * (1 - eout(clamp01(coin)))}) scale(${eback(clamp01(coin))})`}>
          <ellipse rx={13} ry={11} fill="#f5c542" stroke="#c9952a" strokeWidth={3} />
          <text x={0} y={6} fontFamily={HAND} fontSize={16} fill="#a8761e" textAnchor="middle">₹</text>
        </g>
      )}
    </g>
  );
};

// ---------- paper planes (the token) ----------
const Plane: React.FC<{ x: number; y: number; ang: number; s: number; coin?: boolean }> = ({ x, y, ang, s, coin }) => (
  <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 30,0 L -26,-16 L -14,0 Z" fill="#ffffff" />
    <path d="M 30,0 L -14,0 L -26,14 Z" fill="#e3e8f2" />
    <path d="M 30,0 L -14,0" stroke="#c7cfdd" strokeWidth={1.5} />
    {coin && <g transform="rotate(0) translate(-6 14)"><ellipse rx={9} ry={8} fill="#f5c542" stroke="#c9952a" strokeWidth={2} /></g>}
  </g>
);
// quadratic arc from a to b through a lifted control point
const arcAt = (a: [number, number], b: [number, number], lift: number, t: number) => {
  const c: [number, number] = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - lift];
  const u = 1 - t;
  const x = u * u * a[0] + 2 * u * t * c[0] + t * t * b[0];
  const y = u * u * a[1] + 2 * u * t * c[1] + t * t * b[1];
  const dx = 2 * u * (c[0] - a[0]) + 2 * t * (b[0] - c[0]);
  const dy = 2 * u * (c[1] - a[1]) + 2 * t * (b[1] - c[1]);
  return { x, y, ang: (Math.atan2(dy, dx) * 180) / Math.PI };
};
const OUT_KIDS = CORE.filter((k) => rnd(`out${k.i}`) > 0.6).slice(0, 9);
const IN_KIDS = CORE.filter((k) => rnd(`in${k.i}`) > 0.35);
const WIN_PT: [number, number] = [WIN_R.x + WIN_R.w * 0.5, WIN_R.y + WIN_R.h * 0.55];
const outT = (k: Kid, j: number) => C.foreign + j * 7;
const inT = (k: Kid) => C.fpiBack + order(k) * 90;

const Planes: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {OUT_KIDS.map((k, j) => {
      const t0 = outT(k, j), t = ramp(f, t0, t0 + 70);
      if (t <= 0 || t >= 1) return null;
      const p = arcAt([k.x + 20, k.y - 70 * k.s], [WIN_PT[0] + 260, WIN_PT[1] - 60], 120, eio(t));
      return <Plane key={k.i} x={p.x} y={p.y} ang={p.ang} s={1.1} coin />;
    })}
    {IN_KIDS.map((k) => {
      const t0 = inT(k), t = ramp(f, t0, t0 + 60);
      if (t <= 0 || t >= 1) return null;
      const p = arcAt([WIN_PT[0] + 240, WIN_PT[1] - 80], [k.x + 24, k.y - 30 * k.s], 90, eio(t));
      return <Plane key={k.i} x={p.x} y={p.y} ang={p.ang} s={1.1} coin />;
    })}
  </g>
);

// ---------- confetti chalk ----------
const CONF = Array.from({ length: 70 }, (_, k) => ({ x: 560 + rnd(`cx${k}`) * 800, d: rnd(`cd${k}`) * 30, v: 3 + rnd(`cv${k}`) * 3, c: PASTELS[k % PASTELS.length], s: rnd(`cs${k}`) * 6 }));
const Confetti: React.FC<{ f: number }> = ({ f }) => {
  const t0 = C.jumped2 - 2;
  if (f < t0 || f > C.card + 20) return null;
  return (
    <g>
      {CONF.map((p, k) => {
        const age = f - t0 - p.d;
        if (age < 0) return null;
        const y = -60 + age * p.v;
        if (y > 1000) return null;
        return <rect key={k} x={p.x + 30 * Math.sin(age * 0.08 + p.s)} y={y} width={10} height={6} rx={2} fill={p.c} transform={`rotate(${age * 6 + p.s * 30} ${p.x} ${y})`} />;
      })}
    </g>
  );
};

// ---------- the class, in draw order ----------
const Class: React.FC<{ f: number }> = ({ f }) => {
  const g = gloom(f);
  return (
    <g>
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          {KIDS.filter((k) => k.r === r).map((k) => {
            // appear
            const appearAt = k.extra ? C.fifty - 18 + order(k) * 26 : -100;
            const leaveAt = C.bigger - 4 + order(k) * 10;
            let a = pop(f, appearAt, 14);
            if (k.extra) a *= 1 - eio(ramp(f, leaveAt, leaveAt + 14));
            if (a <= 0.001) return null;
            const ci = coreIdx(k);
            // moods
            let mood: "smile" | "happy" | "o" | "sad" = "smile";
            if (f >= C.is && f < C.thirty + 20) mood = "o";
            if (g > 0.5) mood = "sad";
            if (f >= C.changed && f < C.cheaper) mood = "o";
            if (f >= C.cheaper + 6) mood = "smile";
            if (f >= C.jumped2 - 4) mood = "happy";
            const lookUp = f >= C.changed - 4 && f < C.cheaper + 20;
            const look: [number, number] = lookUp ? [0.9, -0.9] : f >= C.fpiBack && f < C.day + 30 ? [0.8, -0.4] : [0.2 * Math.sin(f * 0.01 + k.i), 0.3];
            const swell = BIG.has(k.i) ? eback(ramp(f, C.bigger - 2, C.bigger + 14)) * (1 - eio(ramp(f, C.weeks - 10, C.weeks + 10))) : 0;
            const hello = Math.sin(Math.PI * ramp(f, C.thirty - 6 + order(k) * 30, C.thirty + 8 + order(k) * 30)) * 16;
            const hopP = hello + (cheer(f) > 0 ? Math.abs(Math.sin((f - C.jumped2) * 0.18 + k.i)) * 14 * cheer(f) * (1 - ramp(f, C.card - 30, C.card)) : 0);
            const paperUp = !k.extra && ci >= 0 ? (k === HERO ? eback(ramp(f, C.one + 6, C.one + 20)) : eback(ramp(f, C.check - 4 + order(k) * 10, C.check + 10 + order(k) * 10))) * (1 - eio(ramp(f, C.average + 4 + order(k) * 8, C.average + 14 + order(k) * 8))) : 0;
            // barrels: drop staggered on "Oil", shrink on "cheaper"
            const bDrop = !k.extra ? eout(ramp(f, C.oil - 4 + order(k) * 24, C.oil + 10 + order(k) * 24)) * barrels(f) : 0;
            const coinT = IN_KIDS.includes(k) ? (f - (inT(k) + 58)) / 10 : -1;
            return (
              <g key={k.i} opacity={Math.min(1, a)} transform={`translate(${k.x} ${k.y}) scale(${a}) translate(${-k.x} ${-k.y})`}>
                <Bean f={f} k={k} mood={mood} look={look} scale={1 + 0.4 * swell} droop={g} hop={hopP} paper={paperUp} mark={ci >= 0 ? MARKS[ci] : 0} halo={swell} />
                <Desk f={f} k={k} barrel={bDrop} small={shrink(f)} coin={coinT} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
};

// marks fly from the papers to the board on "average"
const MarkSparks: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {CORE.map((k) => {
      const t0 = C.average - 2 + order(k) * 10, t = ramp(f, t0, t0 + 22);
      if (t <= 0 || t >= 1) return null;
      const p = arcAt([k.x + 28 * k.s, k.y - 110 * k.s], [960, BOARD.y + 160], 60, eio(t));
      return <circle key={k.i} cx={p.x} cy={p.y} r={7} fill="#ffe7a0" opacity={0.9} />;
    })}
  </g>
);

// the spotlight on one student
const Spotlight: React.FC<{ f: number }> = ({ f }) => {
  const s = spot(f);
  if (s <= 0) return null;
  return (
    <g opacity={s}>
      <defs>
        <radialGradient id="spotHole" cx={HERO.x} cy={HERO.y - 50} r={130} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" stopColor="#120f24" stopOpacity="0" /><stop offset="1" stopColor="#120f24" stopOpacity="0.62" />
        </radialGradient>
      </defs>
      <rect x={-300} y={-800} width={2520} height={2600} fill="url(#spotHole)" />
    </g>
  );
};

// ---------- closing card ----------
const Card: React.FC<{ f: number; w: number; h: number }> = ({ f, w, h }) => {
  const o = eio(ramp(f, C.card, C.card + 18));
  if (o <= 0) return null;
  const line = (at: number) => eio(ramp(f, at, at + 14));
  return (
    <AbsoluteFill style={{ background: "rgba(22,30,52,0.92)", opacity: o, fontFamily: HAND, color: "#fff7e6", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 90 }}>
      <div style={{ fontSize: 120, opacity: line(C.card + 6), transform: `translateY(${(1 - line(C.card + 6)) * 30}px)` }}>Sensex</div>
      <div style={{ fontSize: 60, lineHeight: 1.2, marginTop: 20, opacity: line(C.card + 22), maxWidth: w * 0.8 }}>the class average of India's 30 biggest companies</div>
      <div style={{ fontSize: 46, marginTop: 50, color: "#8ff0b4", opacity: line(C.card + 40) }}>Nifty: the same idea, with 50</div>
      <div style={{ position: "absolute", bottom: h * 0.12, left: 0, right: 0, fontSize: 34, opacity: line(C.card + 60) * 0.85, lineHeight: 1.4 }}>
        For education only. Not investment advice.<br />Figures: BSE &amp; NSE closes, 3 Nov 2026, via news reports.
      </div>
    </AbsoluteFill>
  );
};

export const Film: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = STORY;
  const cam = camera(f, CAM);
  const fade = Math.max(1 - ramp(f, 0, 8), ramp(f, STORY.durationFrames - 20, STORY.durationFrames - 1));
  const g = gloom(f);
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1d2e" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <StoryDefs />
        <g transform={worldTransform(cam, width, height)}>
          <Room f={f} />
          <Board f={f} />
          <SunShaft f={f} />
          <Class f={f} />
          <MarkSparks f={f} />
          <Spotlight f={f} />
          <Planes f={f} />
          <Confetti f={f} />
        </g>
        <rect width={width} height={height} fill="#2a3550" opacity={g * 0.18} style={{ mixBlendMode: "multiply" }} />
        <rect width={width} height={height} fill="url(#vignette)" />
        <rect y={height * 0.66} width={width} height={height * 0.34} fill="url(#subScrim)" opacity={eio(ramp(f, 8, 18)) * (1 - ramp(f, C.card, C.card + 10))} />
      </svg>
      <Subtitles f={f} subs={SUBS} width={width} height={height} />
      <Card f={f} w={width} h={height} />
      {STORY.audio && <Audio src={staticFile(STORY.audio)} />}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: fade }} />
    </AbsoluteFill>
  );
};
