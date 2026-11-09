import type { Piece } from "./types";

// Story to post alongside reel #4 "UPI is free. So who pays?" (upi-courier/).
// Frame 1000 on purpose: no "Starts after Diwali" sign, so the story stays true once MDR starts.
// Rendered with a wider camera than the reel (cx 1095, cy 600, z 1.12) so "SHOP'S BANK" is not cut off.
const piece: Piece = {
  slug: "upi-stories",
  slides: [
    { t: "story-01-teaser", props: { frame: "pieces/upi-stories/f1000.png", title: "UPI is free. So who pays?", imageY: 265 } },
  ],
};
export default piece;
