import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "./tokens";
import { textStyle } from "./type";
import { Mark } from "./Avatars";
import { ACCOUNT, HANDLE } from "./account";

// Shared building blocks for every template. Animation: pass `f` (frame) to animate in,
// leave it out to show the finished state (stills).
export const appear = (f: number | undefined, at: number, dur = 12) =>
  f === undefined ? 1 : interpolate(f, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });
export const rise = (p: number, px = 30): React.CSSProperties => ({ opacity: p, transform: `translateY(${(1 - p) * px}px)` });

// Safe zones from BRAND.md section 4.
export type Canvas = "reel" | "story" | "carousel";
export const SAFE: Record<Canvas, { top: number; bottom: number; right: number; left: number }> = {
  reel: { top: 220, bottom: 420, right: 120, left: 60 },
  story: { top: 250, bottom: 340, right: 60, left: 60 },
  carousel: { top: 60, bottom: 60, right: 60, left: 60 },
};

// Navy background with one soft warm light. mood "gloom" cools it for the problem part of a story.
export const Bg: React.FC<{ glowY?: number; mood?: "warm" | "gloom" | "plain" }> = ({ glowY = 0.32, mood = "warm" }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    {mood !== "plain" && (
      <AbsoluteFill
        style={{
          background:
            mood === "warm"
              ? `radial-gradient(ellipse 75% 45% at 50% ${glowY * 100}%, rgba(255,200,97,0.20), rgba(255,154,42,0.06) 55%, rgba(0,0,0,0) 75%)`
              : `radial-gradient(ellipse 80% 50% at 50% ${glowY * 100}%, rgba(125,139,168,0.28), rgba(0,0,0,0) 75%)`,
        }}
      />
    )}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 60%, rgba(5,8,28,0.45) 100%)" }} />
  </AbsoluteFill>
);

// Gold: only for the one key number or word on a screen.
export const Gold: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COLORS.accent }}>{children}</span>;

export const Handle: React.FC<{ scale?: number; style?: React.CSSProperties }> = ({ scale = 1, style }) => (
  <div style={{ ...textStyle("handle", scale), color: COLORS.accent2, ...style }}>{HANDLE}</div>
);

export const SourceLine: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ ...textStyle("source"), color: COLORS.text, opacity: 0.8, ...style }}>{children}</div>
);

// Set in account.json. Leave it "" if the niche needs none (then nothing is drawn).
export const DISCLAIMER = ACCOUNT.disclaimer;

// Small logo in a corner (the chosen mark, option C).
export const Logo: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 84, style }) => (
  <div style={{ position: "absolute", ...style }}><Mark id={ACCOUNT.logoOption as "A" | "B" | "C"} size={size} /></div>
);

// Review overlay: shades the zones where app buttons and captions cover the picture.
export const SafeGuides: React.FC<{ canvas: Canvas; w: number; h: number; gridCrop?: boolean }> = ({ canvas, w, h, gridCrop }) => {
  const s = SAFE[canvas];
  const shade = "rgba(255,60,60,0.28)";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: s.top, background: shade }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: s.bottom, background: shade }} />
      <div style={{ position: "absolute", top: s.top, bottom: s.bottom, right: 0, width: s.right, background: shade }} />
      <div style={{ position: "absolute", top: s.top, bottom: s.bottom, left: 0, width: s.left, background: shade }} />
      {gridCrop && <div style={{ position: "absolute", left: 0, top: (h - (w * 4) / 3) / 2, width: w, height: (w * 4) / 3, border: "6px solid #3cf", boxSizing: "border-box" }} />}
    </AbsoluteFill>
  );
};
