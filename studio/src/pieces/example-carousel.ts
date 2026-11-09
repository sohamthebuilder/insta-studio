import type { Piece } from "./types";

// Example piece: a 4-slide carousel using the template sample text. Copy this file for a new piece,
// add it to index.ts, then: bash render-piece.sh <slug> --guides
const piece: Piece = {
  slug: "example-carousel",
  slides: [
    { t: "carousel-01-cover", props: { before: "Are you doing this ", gold: "right", after: "?" } },
    { t: "carousel-02-explainer", props: { page: "2/4", title: "The first point" } },
    { t: "carousel-02-explainer", props: { page: "3/4", title: "The key number", value: "3 in 4", source: "Source · date" } },
    { t: "carousel-03-summary" },
  ],
};
export default piece;
