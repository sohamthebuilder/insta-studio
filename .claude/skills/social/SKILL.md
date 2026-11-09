---
name: social
description: Make Instagram carousels, single posts, story sets, highlight covers, reel covers and YouTube banner or covers for this repo's account, as PNG images drawn in code with the brand templates so they match the reels exactly. No designer and no AI images. Use whenever the user asks for a carousel, post, slide, story, story set, highlight cover, thumbnail, "turn this reel into a carousel", or any still image for Instagram or YouTube.
---

# Social

Still images for the account, built from the template library in `studio/`. Every image is drawn
in code with Remotion, using the same mascot, palette and fonts as the reels. All paths are
relative to the repo root.

## Read first (every time)
1. `BRAND.md` (source of truth for voice, colours, specs, captions and **section 7, safety**) and
   `account.json`. If the niche is still `TBD`, run the `new-account` skill first.
2. `LEARNINGS.md` (owner feedback rules) and `LOG.md`.
3. `brand/templates/template-sheet.png` to pick templates. (Missing? `bash studio/render-brand.sh`.)

## What it can make

| Ask | Templates (registry keys) | Size |
|---|---|---|
| Carousel (5 to 8 slides) | `carousel-01-cover`, `carousel-02-explainer` (number or picture), `carousel-03-summary` | 1080×1350 |
| Single post | one `carousel-01-cover` or `carousel-02-explainer` | 1080×1350 |
| Story set | `story-01-teaser`, `story-02-poll`, `story-03-quiz`, `story-04-ask`, `story-05-greeting` | 1080×1920 |
| Highlight covers | `highlight-start/basics/news/ask` (rendered by `render-brand.sh`) | 1080×1920 |
| Reel cover | `reel-01-cover` plus new art for the topic (cover rule in BRAND.md 5) | 1080×1920 |
| YouTube banner | `youtube-banner` (rendered to `brand/assets/youtube-banner.jpg`) | 2560×1440 |

Template code: `studio/src/templates/`. Props are at the top of each component (sample text is the
default). Shared pieces: `studio/src/brand/` (all brand values come from `account.json`).

**Two modes**
- **Recap of a reel** (cheapest, best match): pull 3 to 5 frames from `reels/<slug>` with
  `npx remotion still src/index.ts Film <out>.png --frame=<n> --image-format=png` (frames from its
  `story.ts` SUBS/CUES), save them in `studio/public/pieces/<slug>/`, and use them as the `image` of
  explainer slides. Set `imageY` so the frame's baked-in subtitles (around y 1350–1520) stay out.
- **New topic:** explainer slides with an accent number, or new art in the same style
  (`engine/references/visual-style.md`).

## Workflow: two checkpoints, nothing rendered before approval

### Checkpoint 1: the outline (one message, no rendering)
1. Fact-check every figure with WebSearch (extended, 2+ sources). Follow BRAND.md section 7.
2. Send ONE message with:
   - **Slide table:** # / template / headline / body (max 25 words) / accent item / picture / source line.
     One accent item per slide. Headlines max 8 words.
   - **Caption** (BRAND.md 6.1) and, for stories, which sticker goes on each and its options.
   - **Sources** with links and dates.
   - A tick-through of the pre-publish checklist (BRAND.md 7.5).
3. **Stop and wait.** Render nothing until the user approves.

### Checkpoint 2: build and render
1. Write `studio/src/pieces/<slug>.ts` (copy `example-carousel.ts`; story-set examples are in
   `examples/finance-unboring/pieces/`). Each slide is `{ t: "<registry key>", props: { ... } }`.
   Add it to `studio/src/pieces/index.ts`. **One piece = one size** (carousel and stories are separate).
2. `cd studio && npx tsc --noEmit -p .`
3. Check pass: `bash studio/render-piece.sh <slug> --guides`. Look at `social/<slug>/guides/sheet.png`:
   nothing important in the red zones, no text over the mascot or pictures, no subtitle inside a reel
   frame card, one accent item per slide. Fix and re-render until clean.
4. Final: `bash studio/render-piece.sh <slug>` → `social/<slug>/01.png`, `02.png`… and `sheet.png`.
5. Write `social/<slug>/sources.md` (every number, link, the date it applies to, when it goes stale;
   mark example numbers as examples) and `social/<slug>/caption.md` (ready-to-paste caption; for
   stories, posting order and sticker options).
6. Send the sheet with SendUserFile and list the files.

## Voice check before sending anything
Read every headline, body line and caption against BRAND.md section 1. Run
`grep -n "—\|;" social/<slug>/caption.md` and fix any hits.

## Known limits
- Interactive stickers can't be baked in. **Never print a sticker box or "add the sticker" text in an
  image.** Leave plain empty space and say which sticker to add in `caption.md` only.
- No logos, ever. Name companies in text only.
- Emoji render poorly in images. Keep emoji in captions only.
