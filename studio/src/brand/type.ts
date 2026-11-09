import { loadFont as loadBaloo } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadHand } from "@remotion/google-fonts/PatrickHand";

// Fonts and sizes from BRAND.md section 3.3. Sizes are for a 1080×1920 canvas.
export const BALOO = loadBaloo("normal", { weights: ["500", "700", "800"] }).fontFamily;
export const HAND = loadHand().fontFamily;

export const TYPE = {
  number: { size: 220, weight: 800, lh: 1.0 },
  hero: { size: 120, weight: 800, lh: 1.02 }, // reel cover headline and "the real term"
  headline: { size: 96, weight: 800, lh: 1.05 },
  sub: { size: 64, weight: 700, lh: 1.15 },
  body: { size: 50, weight: 500, lh: 1.3 },
  subtitle: { size: 64, weight: 400, lh: 1.2 },
  handle: { size: 52, weight: 700, lh: 1.0 },
  source: { size: 30, weight: 500, lh: 1.4 },
} as const;
export type TypeRole = keyof typeof TYPE;

// Carousels (1080×1350) use 0.85×, but the source line never drops below 30 px.
export const size = (role: TypeRole, scale = 1) => (role === "source" ? Math.max(30, TYPE[role].size * scale) : Math.round(TYPE[role].size * scale));
export const textStyle = (role: TypeRole, scale = 1): React.CSSProperties => ({
  fontFamily: role === "subtitle" ? HAND : BALOO,
  fontWeight: TYPE[role].weight,
  fontSize: size(role, scale),
  lineHeight: TYPE[role].lh,
});
