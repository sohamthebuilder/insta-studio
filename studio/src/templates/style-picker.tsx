import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BALOO } from "../brand/type";
import STYLES from "../../../styles/index.json";

// Style picker: a sheet of style posters with names, so the owner can choose a look.
// Rendered by studio/render-style-picker.sh, which puts the posters in a temporary public dir as
// <slug>.jpg. Data: styles/index.json (made by scripts/styles-index.mjs).
type Row = (typeof STYLES)[number];

const TILE_W = 480, POSTER_H = 270, LABEL_H = 118, GAP = 24, PAD = 48, HEAD = 112;
const cols = (n: number) => (n <= 3 ? Math.max(n, 1) : n <= 8 ? 4 : 6);

const pick = (slugs: string[]): Row[] => (slugs.length ? slugs.map((s) => STYLES.find((r) => r.slug === s)).filter((r): r is Row => !!r) : STYLES);

export const pickerSize = (slugs: string[]) => {
  const n = pick(slugs).length, c = cols(n), r = Math.ceil(n / c);
  const even = (x: number) => x + (x % 2);
  return { width: even(PAD * 2 + c * TILE_W + (c - 1) * GAP), height: even(HEAD + PAD + r * (POSTER_H + LABEL_H) + (r - 1) * GAP) };
};

const INK = "#1F1B16", PAPER = "#F4EFE6", MUTED = "#6F675C", REAL = "#B4442A";

export const StylePicker: React.FC<{ slugs: string[]; title?: string }> = ({ slugs, title }) => {
  const rows = pick(slugs);
  const c = cols(rows.length);
  return (
    <AbsoluteFill style={{ background: PAPER, fontFamily: BALOO, color: INK }}>
      <div style={{ position: "absolute", left: PAD, top: 34, fontSize: 46, fontWeight: 800 }}>
        {title || (slugs.length ? "Style options" : `All ${rows.length} styles`)}
      </div>
      <div style={{ position: "absolute", right: PAD, top: 50, fontSize: 24, color: MUTED }}>Posters: LemoLab, CC BY 4.0 · storybook: insta-studio</div>
      {rows.map((r, i) => {
        const x = PAD + (i % c) * (TILE_W + GAP);
        const y = HEAD + Math.floor(i / c) * (POSTER_H + LABEL_H + GAP);
        return (
          <div key={r.slug} style={{ position: "absolute", left: x, top: y, width: TILE_W }}>
            <div style={{ width: TILE_W, height: POSTER_H, borderRadius: 14, overflow: "hidden", background: "#D9D2C5" }}>
              <Img src={staticFile(`${r.slug}.jpg`)} style={{ width: TILE_W, height: POSTER_H, objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 30, fontWeight: 800, lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {slugs.length ? `${i + 1}. ` : ""}{r.name}
            </div>
            <div style={{ marginTop: 6, fontSize: 21, fontWeight: 500, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {r.slug} · {r.group} · {r.renderer}
              {r.material === "real" && <span style={{ color: REAL, fontWeight: 700 }}> · real material</span>}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
