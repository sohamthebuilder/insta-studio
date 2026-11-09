---
name: finance-social
description: Make Instagram carousels, single posts, story sets and highlight covers (plus YouTube banner or covers) for @finance.unboring, as PNG images drawn in code with the brand templates, so they match the reels exactly. No designer and no AI images needed. Use whenever the user asks for a carousel, post, slide, story, story set, highlight cover, thumbnail, "turn this reel into a carousel", or any still image for Instagram or YouTube.
---

# Finance Social

Still images for @finance.unboring, built from the brand template library. Every image is drawn in
code with Remotion, using the same Mini, palette and fonts as the reels.

## Read first (every time)
1. **The brand guide:** `/Users/sohambhattacharya/Documents/Personal/projects/story-animator/brand/BRAND.md`.
   It is the source of truth for voice, colours, fonts, specs, captions and **section 7 (safety)**.
   If anything here disagrees with it, the guide wins.
2. **The template sheet:** `brand/templates/template-sheet.png` (look at it to pick templates).

All paths below are relative to `/Users/sohambhattacharya/Documents/Personal/projects/story-animator/`.

## What it can make

| Ask | Templates (registry keys) | Size |
|---|---|---|
| Carousel (5 to 8 slides) | `carousel-01-cover`, `carousel-02-explainer` (number or picture), `carousel-03-summary` | 1080×1350 |
| Single post | one `carousel-01-cover` or `carousel-02-explainer` | 1080×1350 |
| Story set | `story-01-teaser`, `story-02-poll`, `story-03-quiz`, `story-04-ask` | 1080×1920 |
| Highlight covers | `highlight-start/basics/news/ask` (already rendered in `brand/templates/png/`) | 1080×1920 |
| Reel cover | `reel-01-cover` plus new art for the topic (BRAND.md 5.1 cover rule: topic, curiosity, Mini, never a reel frame) | 1080×1920, readable in the 3:4 crop |
| YouTube banner | `youtube-banner` (already in `brand/assets/youtube-banner.jpg`) | 2560×1440 |

Template code: `brand/studio/src/templates/`. The props each template takes are at the top of each
component (sample text is the default). Shared pieces: `brand/studio/src/brand/`.

**Two modes**
- **Recap of a reel** (cheapest, best match): pull 3 to 5 frames from the reel project with
  `npx remotion still src/index.ts Film <out>.png --frame=<n> --image-format=png` (pick frames from its
  `story.ts` SUBS/CUES), save them in `brand/studio/public/pieces/<slug>/`, and use them as the
  `image` of explainer slides. Set `imageY` (in source pixels) so the frame's baked-in subtitles
  (around y 1350 to 1520) stay out of the card. The card shows about 880 px of the frame's height.
- **New topic:** explainer slides with a gold number, or new art. If new art is needed, add a
  component next to the templates, in the same style (`references/visual-style.md` of story-animator).

## Workflow: two checkpoints, nothing rendered before approval

### Checkpoint 1: the outline (one message, no rendering)
1. Fact-check every figure with WebSearch (extended for market data, two or more sources). Follow
   BRAND.md 7.1: no buy/sell calls, no targets, no return promises, **market data (Sensex, Nifty, stock
   prices) of any date, but verified with two or more sources and dated**. Economic figures (repo, CPI, GDP) use the latest official figure
   with its date. A figure reused from a reel must still be current: check the reel log for when it goes stale.
2. Send ONE message with:
   - **Slide table:** # / template / headline / body (max 25 words) / gold item / picture / source line.
     One gold item per slide. Headlines max 8 words.
   - **Caption** (BRAND.md 6.1) and, for stories, which sticker goes on each and its options.
   - **Sources** with links and dates.
   - A tick-through of the pre-publish checklist (BRAND.md 7.5).
3. **Stop and wait.** Render nothing until the user approves. If they change something, send back the
   changed rows and wait again.

### Checkpoint 2: build and render
1. Write `brand/studio/src/pieces/<slug>.ts` (copy `inflation-recap.ts` for a carousel or
   `inflation-stories.ts` for stories). Slug is lowercase with dashes. Each slide is
   `{ t: "<registry key>", props: { ... } }`. Add it to `src/pieces/index.ts`.
   **One piece = one size.** Carousel and stories are separate pieces.
2. `cd brand/studio && npx tsc --noEmit -p .`
3. Check pass: `bash render-piece.sh <slug> --guides`. Look at `social/<slug>/guides/sheet.png`:
   nothing important in the red zones, no text overlapping Mini or the pictures, no subtitle
   showing inside a reel frame card, one gold item per slide. Fix and re-render until clean.
4. Final: `bash render-piece.sh <slug>`. This writes `social/<slug>/01.png`, `02.png`… and `sheet.png`.
5. Write `social/<slug>/sources.md` (every number, source link, the date it applies to, when it goes
   stale; mark example numbers as examples) and `social/<slug>/caption.md` (ready-to-paste caption in a
   code block; for stories, posting order and sticker options).
6. Send the sheet with SendUserFile and list the files. Remind the user that stickers are added in the
   Instagram app, in the empty space.

## Voice check before sending anything
Read every headline, body line and caption against BRAND.md section 1: simple, human, no em-dashes,
no semicolons, no formal phrasing, sounds like explaining out loud. Run
`grep -n "—\|;" social/<slug>/caption.md` and fix any hits.

## Known limits
- Interactive stickers (link, poll, quiz, questions) can't be baked in. Templates leave plain empty space. Never print a sticker box or "add the sticker" text in an image (user rule, 7 Nov 2026). Say which sticker to add in `caption.md` only.
- No company logos, ever (BRAND.md 7.4). Name companies in text only.
- Emoji in rendered images look poor in the renderer. Keep emoji in captions only.
- Frames from reels made before the brand guide may use older colour habits (e.g. coral for a price
  rise). That's fine inside a reel frame. New art follows the palette roles.
