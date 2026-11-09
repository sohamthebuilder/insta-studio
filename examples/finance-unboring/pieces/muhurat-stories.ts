import type { Piece } from "./types";

// Story to post alongside reel #6 "The market's bohni" (muhurat-bohni/).
// The picture is the Teaser composition there: the reel's world with no subtitles or on-screen text.
const piece: Piece = {
  slug: "muhurat-stories",
  slides: [
    { t: "story-01-teaser", props: { frame: "pieces/muhurat-stories/shutter.png", title: "Why is the market open on Sunday?", imageY: 325 } },
  ],
};
export default piece;
