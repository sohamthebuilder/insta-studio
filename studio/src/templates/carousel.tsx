import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS } from "../brand/tokens";
import { textStyle } from "../brand/type";
import { Badge, Mascot } from "../brand/Mascot";
import { ACCOUNT } from "../brand/account";
import { Bg, DISCLAIMER, Gold, Handle, Logo, SourceLine } from "../brand/ui";

// Carousel templates, 1080×1350 (4:5). Type at 0.85× (BRAND.md 3.3), 60 px margins.
const K = 0.85;
const cream = COLORS.text;
const Art: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1080} height={1350} viewBox="0 0 1080 1350" style={{ position: "absolute", inset: 0 }}>{children}</svg>
);
const Footer: React.FC<{ page?: string }> = ({ page }) => (
  <div style={{ position: "absolute", left: 80, right: 80, bottom: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <Logo size={64} style={{ position: "relative" }} />
      <Handle scale={0.7} />
    </div>
    {page && <div style={{ ...textStyle("source"), color: cream, opacity: 0.7 }}>{page}</div>}
  </div>
);

// 1. Cover slide. Headline (max 8 words), Mascot, swipe hint.
export const CarouselCover: React.FC<{ tag?: string; before?: string; gold?: string; after?: string }> = ({ tag = ACCOUNT.defaultTag, before = "Are you doing this ", gold = "right", after = "?" }) => (
  <AbsoluteFill>
    <Bg glowY={0.7} />
    <div style={{ position: "absolute", top: 120, left: 80, right: 80, color: cream }}>
      <div style={{ ...textStyle("source"), fontSize: 34, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>{tag}</div>
      <div style={{ ...textStyle("hero", K), marginTop: 24, maxWidth: 860 }}>{before}<Gold>{gold}</Gold>{after}</div>
    </div>
    <Art>
      <ellipse cx={420} cy={1112} rx={170} ry={22} fill="#000" opacity={0.25} />
      <g transform="translate(420 1110)"><Mascot s={4.2} mood="o" look={[0.7, -0.5]} /></g>
      <g transform="translate(700 980) rotate(12)"><Badge r={86} /></g>
    </Art>
    <div style={{ position: "absolute", right: 80, bottom: 70, ...textStyle("sub", K), color: cream }}>Swipe →</div>
    <div style={{ position: "absolute", left: 80, bottom: 76, display: "flex", alignItems: "center", gap: 16 }}>
      <Handle scale={0.7} />
    </div>
  </AbsoluteFill>
);

// 2. Explainer slide. Page number, one sub-headline, up to 25 words, one gold number OR one picture.
// Pass `image` (a file in public/, e.g. a reel frame) to show a picture instead of the gold number.
// `imageY` picks which part of a 9:16 frame to show (0 = top), so baked-in subtitles stay out.
export const CarouselExplainer: React.FC<{ page?: string; title?: string; body?: string; value?: string; source?: string; image?: string; imageY?: number }> = ({
  page = "2/6",
  title = "One point per slide",
  body = "Up to 25 words of plain explanation, then one gold number or one picture below.",
  value = "42%",
  source = "Source · date",
  image,
  imageY = 0,
}) => (
  <AbsoluteFill>
    <Bg glowY={0.6} />
    <div style={{ position: "absolute", top: 110, left: 80, right: 80, color: cream }}>
      <div style={{ ...textStyle("sub", K) }}>{title}</div>
      <div style={{ ...textStyle("body", K), marginTop: 30, maxWidth: 880, opacity: 0.92 }}>{body}</div>
    </div>
    {image ? (
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 760, height: 620, borderRadius: 32, overflow: "hidden", border: "5px solid rgba(255,247,230,0.9)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}>
          <Img src={staticFile(image)} style={{ width: 760, height: 1351, marginTop: -imageY * 0.7037 }} />
        </div>
        {source && <SourceLine style={{ marginTop: 18 }}>{source}</SourceLine>}
      </div>
    ) : (
      <div style={{ position: "absolute", top: 640, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ ...textStyle("number", K), color: COLORS.accent }}>{value}</div>
        <SourceLine style={{ marginTop: 24 }}>{source}</SourceLine>
      </div>
    )}
    <Footer page={page} />
  </AbsoluteFill>
);

// 3. Summary slide. "In short", 3 points, save-and-share, disclaimer, sources.
export const CarouselSummary: React.FC<{ points?: string[]; sources?: string }> = ({
  points = ["The first thing to remember.", "The second thing.", "The one-line takeaway."],
  sources = "Figures: source, date",
}) => (
  <AbsoluteFill>
    <Bg glowY={0.3} />
    <div style={{ position: "absolute", top: 110, left: 80, right: 80, color: cream }}>
      <div style={{ ...textStyle("headline", K) }}>In <Gold>short</Gold></div>
      <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 30 }}>
        {points.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 26, alignItems: "flex-start" }}>
            <div style={{ ...textStyle("sub", K), minWidth: 64, height: 64, borderRadius: 32, background: "rgba(255,247,230,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{i + 1}</div>
            <div style={{ ...textStyle("body", K), paddingTop: 6 }}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{ ...textStyle("sub", K), marginTop: 70, fontSize: 48 }}>Save this. Share it with a friend.</div>
    </div>
    <Art><g transform="translate(860 1010)"><Mascot s={2.3} mood="happy" look={[-0.6, -0.6]} /></g></Art>
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 170, color: cream }}>
      <SourceLine style={{ fontWeight: 700, opacity: 0.95 }}>{DISCLAIMER}</SourceLine>
      <SourceLine style={{ marginTop: 6 }}>{sources}</SourceLine>
    </div>
    <Footer />
  </AbsoluteFill>
);
