import React from "react";
import { AbsoluteFill } from "remotion";
import { Canvas, SafeGuides } from "../brand/ui";
import { AnalogyScene, BigNumber, EndCard, HookCard, RealTerm, ReelCover, TextLine } from "./reel";
import { CarouselCover, CarouselExplainer, CarouselSummary } from "./carousel";
import { StoryAsk, StoryGreeting, StoryPoll, StoryQuiz, StoryTeaser } from "./story";
import { HighlightCover } from "./highlight";
import { YouTubeBanner } from "./banner";

type Entry = { C: React.FC<any>; w: number; h: number; canvas: Canvas | null; props?: object; gridCrop?: boolean; selfGuides?: boolean };
const REEL = { w: 1080, h: 1920, canvas: "reel" as const };
const STORY = { w: 1080, h: 1920, canvas: "story" as const };
const CARO = { w: 1080, h: 1350, canvas: "carousel" as const };

export const TEMPLATES: Record<string, Entry> = {
  "reel-01-cover": { C: ReelCover, ...REEL, gridCrop: true },
  "reel-02-hook": { C: HookCard, ...REEL },
  "reel-03-text-line": { C: TextLine, ...REEL },
  "reel-04-big-number": { C: BigNumber, ...REEL },
  "reel-05-analogy-scene": { C: AnalogyScene, ...REEL },
  "reel-06-real-term": { C: RealTerm, ...REEL },
  "reel-07-end-card": { C: EndCard, ...REEL },
  "carousel-01-cover": { C: CarouselCover, ...CARO },
  "carousel-02-explainer": { C: CarouselExplainer, ...CARO },
  "carousel-03-summary": { C: CarouselSummary, ...CARO },
  "story-01-teaser": { C: StoryTeaser, ...STORY },
  "story-02-poll": { C: StoryPoll, ...STORY },
  "story-03-quiz": { C: StoryQuiz, ...STORY },
  "story-04-ask": { C: StoryAsk, ...STORY },
  "story-05-greeting": { C: StoryGreeting, ...STORY },
  "highlight-start": { C: HighlightCover, w: 1080, h: 1920, canvas: null, props: { id: "start" } },
  "highlight-basics": { C: HighlightCover, w: 1080, h: 1920, canvas: null, props: { id: "basics" } },
  "highlight-news": { C: HighlightCover, w: 1080, h: 1920, canvas: null, props: { id: "news" } },
  "highlight-ask": { C: HighlightCover, w: 1080, h: 1920, canvas: null, props: { id: "ask" } },
  "youtube-banner": { C: YouTubeBanner, w: 2560, h: 1440, canvas: null, selfGuides: true },
};

// Renders one template. guides=true shades the safe zones for review.
export const TemplateStill: React.FC<{ name: string; guides?: boolean; props?: object }> = ({ name, guides = false, props }) => {
  const t = TEMPLATES[name];
  const C = t.C;
  return (
    <AbsoluteFill>
      <C {...(t.props ?? {})} {...(props ?? {})} {...(t.selfGuides ? { guides } : {})} />
      {guides && t.canvas && <SafeGuides canvas={t.canvas} w={t.w} h={t.h} gridCrop={t.gridCrop} />}
      {guides && !t.canvas && !t.selfGuides && (
        <svg width={t.w} height={t.h} style={{ position: "absolute", inset: 0 }}>
          <circle cx={540} cy={960} r={300} fill="none" stroke="#3cf" strokeWidth={6} />
        </svg>
      )}
    </AbsoluteFill>
  );
};
