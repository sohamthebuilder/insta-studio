import type { Piece } from "./types";

// Test piece: a story set to post alongside reel #2 "What is inflation?".
const piece: Piece = {
  slug: "inflation-stories",
  slides: [
    { t: "story-01-teaser", props: { frame: "pieces/inflation-recap/f1250.png", title: "What is inflation, really?" } },
    { t: "story-02-poll", props: { before: "Did your groceries cost ", gold: "more", after: " this month?" } },
    { t: "story-03-quiz", props: { before: "Onions almost doubled. Did prices overall ", gold: "double", after: " too?" } },
    { t: "story-04-ask" },
  ],
};
export default piece;
