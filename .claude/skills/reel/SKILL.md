---
name: reel
description: Make a 60-second 9:16 animated story reel for this repo's Instagram/YouTube account, explaining one idea from the account's niche through a cartoon analogy world, with an ElevenLabs narrator, music and soft effects, every frame drawn in code with Remotion. No presenter. Use whenever the user asks for a reel, a Short, an explainer video, a "what is X" video, or "make the next reel".
---

# Reel

One idea from the account's niche, told as a short animated story. One cute analogy world carries
the whole explanation. A narrator tells it, and every beat lands on the spoken word.

All paths are relative to the repo root (the folder with `account.json`).

## Read first (every time)
1. `account.json`: handle, spoken handle, voice, music, mascot, disclaimer, hashtags.
2. `BRAND.md`: voice rules, the 8-beat formula (section 2), safe zones, captions (section 6) and the
   **safety rules (section 7)**. Where it disagrees with this file, BRAND.md wins.
   If `account.json` still says `"niche": "TBD"`, stop and run the `new-account` skill first.
3. `LEARNINGS.md`: the owner's feedback rules from earlier reels. They override defaults here.
4. `LOG.md`: past reels, so you never reuse an analogy world.
5. `engine/ENGINE.md` and `engine/references/` (story, pipeline, voice and sound, QA).
   This skill is that pipeline plus the account's preferences.
6. **The look:** `styles/ADAPTING.md`, then `styles/<style>/STYLE.md` for the reel's style
   (`account.json` → `styles.default` unless Gate 1 picked another). `styles/README.md` lists all 67
   with their renderer and fit notes; `styles/catalog.json` has the same as data.
7. A reference film: the latest approved reel in `reels/` (in the same style, if there is one), or
   `examples/finance-unboring/reel-sensex-classroom/` (Film.tsx, story.ts, audio_cues.json) for
   structure, camera on 9:16, characters and the closing card.

## Defaults (each one came from real feedback, keep them unless LEARNINGS.md says otherwise)
1. **No presenter.** Never a host or talking character at the bottom.
2. **The account's look.** `styles.default` from `account.json` (out of the box: `storybook`, the soft,
   flat cartoon world with round bean characters, one warm light and Patrick Hand subtitles). Another
   style only when Gate 1 proposes it and the owner agrees. Whatever the style, `styles/ADAPTING.md`
   section 1 holds: 9:16 safe zones, readable brand subtitles, the mascot redrawn in the style's
   medium, the brand end card. Skip `material: real` styles unless the owner supplies the material.
3. **One analogy world for the whole film.** Map every concept to one thing in that world. Story shape:
   setup → problem → turn ("Then… something changed") → payoff → one-line takeaway. One token object
   that leaves and comes back.
4. **Hook first.** The first spoken line lands the loss or the surprise. Never a setup line.
5. **Voice:** the `account.json` voice, model `eleven_v4`, 2 takes. Light tags only (`voice.tags`).
   Spell acronyms with dots (`F.P.I.s`) and write numbers as words. Transcribe both takes with
   `--model medium` and keep the one that says every word.
6. **Length:** 9:16, 60 s (`durationFrames: 1800`). Words ≈ `voice.wordsPerSecond` × 56
   (2.7 w/s → about 150 words). Measure after take 1 and record the real rate in `LEARNINGS.md`.
7. **Honest facts.** Fact-check every figure and claim with WebSearch (mode extended, 2+ sources).
   Show only figures the sources agree on, each with its date. Save all of them in
   `reels/<slug>/sources.md` and list the sources (with links) to the user.
8. **Closing card** (last ~7 s): the concept in one line, a related one-liner, the handle, then the
   disclaimer (if `account.json` has one) and a source line with dates.
9. **Save-and-share ending.** The last narrated line asks viewers to save and share, tailored to the
   topic, and says the `spokenHandle` ("follow your dot handle"). Count it in the word budget.
10. **Designed cover, every reel.** Never a frame from the reel. 1080×1920: states the topic, makes
    people curious with a question the reel really answers, shows the mascot reacting with art for this
    topic. One accent word, headline max 5 words, all inside the 3:4 middle (BRAND.md section 5).
11. **Sound:** music plus `music.effectsPerReel` subtle effects, each just after its key word. Music
    `eleven_music_v2_5`, 1 take, `music.style`, with an arc that follows the story. Mix with
    `music.gainDb` and `music.sfxBusDb` (aim 16–17 dB under the voice).

## Workflow: two gates, nothing spent before approval
The user gives: **the idea to teach, a hook idea, a story angle** (any can be "you pick").

### Gate 1: proposal (one message, no credits spent)
1. Fact-check every figure (WebSearch extended, 2+ sources).
2. Send ONE message with:
   - **Script:** the spine in three sentences, the token, and the full narration ending with the
     save-and-share line.
   - **Style:** the account default plus at most two other options from `styles.allowed` (or from
     the whole library if the owner asked for something new), each with one line on why it suits
     this topic. Render their posters into one sheet and send it:
     `bash studio/render-style-picker.sh <style> <style> ...` → `styles/picker/<styles>.png`.
     If the pick is new to this account, say a look frame comes first in Gate 2.
   - **Voice:** the account voice with its free `preview_url` from `creative_list_voices`, plus 1–2
     alternatives if the topic suggests a different feel.
   - **Storyboard:** beat table (# / narration line / what we see / camera), closing card included.
   - **Cover:** topic tag, curiosity headline (accent word marked), what the mascot and art do.
   - **Sources** and **cost** (narration ≈ 1,800 credits for 2 takes, music ≈ 900, effects ≈ 17 each,
     about 2,750 total).
3. **Stop and wait.** Spend nothing and render nothing until the user confirms all parts.

### Gate 2: production (after the OK)
1. **Project:** `bash scripts/new-reel.sh <slug> --style <style>` (copies `engine/template` to
   `reels/<slug>`, records the style in `src/story.ts`, installs three.js for `renderer: three`
   styles, links the shared `.venv`). Set `SHAPES["9:16"]` in `src/story.ts`.
   **Style new to this account?** Render one look frame first (the analogy world, the mascot redrawn
   in the style, one subtitle; `npm run still -- --frame=<n> out/look.png`), send it, and wait for
   the owner's OK before drawing the rest.
2. **Voice → timing → `story.ts`** (`SUBS`, `CUES`, `CAM`) as in `engine/ENGINE.md` steps 4–5.
   Timing script: `.venv/bin/python engine/scripts/transcribe.py reels/<slug>/public/audio/narration.mp3 --model medium`.
3. **Draw** in the reel's style, per its `renderer` in `styles/catalog.json`:
   - `svg`: React/SVG with the kit; reuse pieces from the reference film when they fit.
   - `canvas` / `three`: draw inside `<StyleCanvas>` (`src/kit/StyleCanvas.tsx`, usage at the top of
     the file). Port the style's engine from its upstream demo: `bash scripts/fetch-style-demo.sh
     <style>`, then read `styles/<style>/DEMO.md` and the code in `styles/<style>/demo/` (reference
     only; ADAPTING.md section 4). Keep subtitles and cards as React on top of the canvas.
   Copy the brand reel templates from `studio/src/templates/reel.tsx` for hook, big-number, real-term
   and end card beats, restyled in the style's medium (fonts, palette, paper or texture).
4. **Contact sheet** at every beat (`bash engine/scripts/contact_sheet.sh ...`) and fix:
   - on 9:16 keep subjects above the subtitles (camera `cy` a little below the subjects' middle);
   - never leave half the frame empty: characters stay on screen and "hello"-bounce on their cue;
   - visible world on 9:16 ≈ 607/z × 1080/z. Pull back (z ≈ 0.58) for crowd moments.
5. **Cover:** draw it in the reel's own world, or extend `ReelCover` in `studio/src/templates/reel.tsx`.
   Render to `reels/<slug>/out/cover.png`. Check the 3:4 crop and a 360 px-wide version.
6. **Sound → mix → render → `ffprobe`** (1080×1920, h264 + aac, 60 s). Send the reel and the cover.
   Report the voice, credits spent, what was measured, and the sources. Ask the user to watch once.

### Delivery: text to paste (same message)
Write `reels/<slug>/caption.md` and also paste in code blocks:
- **Instagram caption** (BRAND.md 6.1), 3–5 hashtags including `hashtags.brand`.
- **YouTube Shorts title** under 70 characters ending in #Shorts.
- **YouTube description** (BRAND.md 6.3).
Run `grep -n "—\|;" reels/<slug>/caption.md` and fix any hits.

### After delivery
- Add a row to `LOG.md` (date, slug, idea, style, analogy world, token, format tested, credits).
- First reel in a new style: add to `LEARNINGS.md` how the mascot was drawn in it and anything that
  had to change for 9:16, so the next reel in that style starts from there.
- When the owner gives feedback that should apply to every future reel, add it to `LEARNINGS.md` as a
  dated rule with the reason.
