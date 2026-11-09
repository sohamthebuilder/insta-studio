import type React from "react";

// Pictures for social pieces drawn in a library style (social skill, "New topic").
// Each entry becomes a still with the id "art--<name>". Render it into the piece's public folder:
//   npx remotion still src/index.ts art--<name> public/pieces/<slug>/<name>.png
// then use "pieces/<slug>/<name>.png" as a slide's `image`.
// A canvas or three.js style draws with <StyleCanvas> from ../../kit/StyleCanvas.
export type Art = { C: React.FC; w: number; h: number };

export const ART: Record<string, Art> = {
  // "inflation-basket": { C: InflationBasket, w: 760, h: 620 },
};
