---
name: finance-story
description: Make a 60-second 9:16 animated story reel that explains a finance, banking or market idea (Sensex, Nifty, FPIs, repo rate, inflation, EMI, IPO…) through a cartoon analogy world, with an English (Indian accent) ElevenLabs narrator, music and soft effects, every frame drawn in code with Remotion using the story-animator pipeline. No presenter. Use whenever the user asks for a finance reel, a market-news explainer, a "what is X" money video, or "make the next reel".
---

# Finance Story

A finance idea told as a short animated story. One cute analogy world (for example a classroom
whose scoreboard is the Sensex) carries the whole explanation. A narrator tells it, and every
beat lands on the spoken word. **This is the story-animator pipeline**, so read
`~/.claude/skills/story-animator/SKILL.md` and its `references/` first and follow them. This skill
only adds the user's preferences for finance reels on top of it.

**Brand guide first.** Read `/Users/sohambhattacharya/Documents/Personal/projects/story-animator/brand/BRAND.md`
before writing anything. It sets the voice (simple, human, no em-dashes, no semicolons, no formal
phrasing), the 8-beat story formula, palette, fonts, safe zones, caption formats and the **SEBI safety
rules (section 7)**. Where it disagrees with this file, the guide wins. The reel templates (cover,
hook card, text-line, big-number, real-term and end card) are in
`brand/studio/src/templates/reel.tsx`. Copy or import them for those beats, and render the reel cover
with the finance-social skill.

The approved reference film (2026-11-04, "this was good") is `examples/sensex-classroom/`
(Film.tsx, story.ts, audio_cues.json). Read it before building a new one. It shows the analogy
world, the scoreboard, the bean characters, the token, the camera on 9:16, and the closing card.

## The user's preferences (from feedback)
1. **No presenter.** Never draw a host or talking character at the bottom. The user dropped the
   older "finance-reel" presenter style and all of its rules (Zara voice, Hinglish, the minimal
   one-number-per-screen look). Don't bring them back unless asked.
2. **Story-animator look.** A soft, flat storybook cartoon world with cute characters (round bean
   bodies, big eyes via `Face`), one warm light source, gentle camera moves, Patrick Hand
   subtitles. Colour tells the story: warm for good times, grey-blue for "gloomy", warm again at
   the turn.
3. **One analogy world for the whole film.** Map every concept to something in that world:
   - the index is the scoreboard or chalkboard on the wall, showing the real number;
   - the companies are the students, and bigger companies are bigger students;
   - foreign money (FPIs) is paper planes flying out of and back in through the window;
   - oil is barrels on the desks that shrink when oil gets cheaper.
   Keep the story shape: setup → problem (something gloomy) → turn ("Then… two things changed")
   → payoff (the number jumps) → a one-line takeaway. Pick one token object that leaves and
   comes back (the paper plane).
4. **Language and voice:** English narration, voice **Rameez | Documentary Narrator**
   (`RG0hCuGFvl2jxhd4LmtU`, Indian-English accent), model `eleven_v4`, 2 takes. Spell acronyms with
   dots (`F.P.I.s`) and write numbers as words ("twelve hundred and twenty-five"). Use light tags
   only: `[excited]`, `[curious]`, `[warm, storytelling]`, `[softly]`, `[building]`, `[brightly]`,
   `[delighted]`, `[warmly]`. Transcribe both takes with `--model medium` and keep the one that
   says every word. In reel #1, take B said "industries" instead of "investors".
5. **Shape and length:** 9:16, 60 s (`durationFrames: 1800`). Rameez speaks about **2.7 words/s**:
   132 words gave 49.5 s. So write about **150–155 words** to fill 60 s with voice. Otherwise the
   last ~10 s are a cheer + closing card over music, which the user accepted.
6. **Honest numbers.** Fact-check every figure with a web search (mode extended for market data,
   two or more sources). Show the real figures (index close, the points moved) on the scoreboard,
   and don't show a figure the sources disagree on (in reel #1, the Brent price). List the sources
   to the user with links. **Market data (Sensex, Nifty, stock prices) can be recent or old, but must be
   verified with two or more sources and carry its exact date** (rule changed by the user, 2026-11-05). Economic figures (repo, CPI, GDP) use the latest official figure with its date. Save every
   number in `sources.md` in the reel folder (BRAND.md 7.3).
7. **Closing card** (the last ~7 s): the concept in one line ("Sensex: the class average of India's
   30 biggest companies"), a related one-liner, then "For education only. Not investment advice."
   and a figures/source line with the date. No real company logos.
8. **Sound:** music plus **3 subtle effects** (a soft paper-plane swish, a light coin cascade, a
   bright soft chime), each placed just after its key word. Music: `eleven_music_v2_5`, 1 take,
   playful pizzicato and marimba, with an arc that follows the story (a dip for the gloomy part,
   a swell at the turn, a joyful lift at the payoff). Mix with music `gain_db` about **−3.5** and
   `sfx_bus_db` **−13**. That gave the background **16.8 dB** under Rameez; at −9 it was too quiet
   (22 dB).

9. **Save-and-share ending (every reel).** The narrator's last line asks viewers to save and share
   the reel if they found it useful, and names **finance.unboring**. Tailor it to the topic, e.g.
   "Found this useful? Save it for the next time someone says 'the Sensex is up', and share it with
   a friend who still doesn't get it. Follow finance dot unboring for more." Write the handle as
   "finance dot unboring" in the narration so it's spoken correctly, and as **@finance.unboring**
   on the closing card, under the concept line and above the disclaimer. Count this line in the
   ~150-word budget.

10. **Designed cover (every reel, rule from 2026-11-07).** Never offer a frame from the reel as the
    cover. Frames looked unappealing in the feed and gave no reason to open. Every reel ships with
    its own 1080×1920 cover that (a) states the topic, (b) makes the viewer curious with a question
    or gap the reel really answers, and (c) shows Mini reacting, plus graphics drawn for this topic.
    One gold word, headline max 5 words, everything inside the 3:4 middle area (BRAND.md 5.1).

## Workflow: two gates, nothing spent before approval
The user gives the inputs: **concept to teach, hook idea, story angle** (and optionally a news item).

### Gate 1: proposal (one message, no credits spent)
1. Fact-check every figure (WebSearch extended, two or more sources).
2. Send ONE message with four parts for the user to confirm:
   - **Script:** the spine in three sentences, the token, and the full narration (about 150 words).
     The narration ENDS with the save-and-share line (rule 9 below).
   - **Voice:** the proposed voice (default Rameez, `RG0hCuGFvl2jxhd4LmtU`) with its free
     `preview_url` from `creative_list_voices`, plus 1–2 alternatives with preview links if the
     topic suggests a different feel.
   - **Storyboard:** the beat table (# / narration line / what we see / camera), including the
     closing card.
   - **Cover:** topic tag, curiosity headline (gold word marked), and what Mini and the art are doing.
   Also list the sources and the cost (narration about 1,800 credits for 2 takes, music 900,
   effects about 17 each, about 2,750 in total).
3. **Stop and wait.** Spend no credits and render nothing until the user confirms all four. If they
   change something, send back the revised part and wait again.

### Gate 2: production (after the user confirms)
1. **Project:** `cp -R ~/.claude/skills/story-animator/template ./<slug>` next to the other
   projects, `npm install`, and reuse an existing faster-whisper venv
   (`ln -s ../sensex-class-average/.venv .venv`) or create one. Set `SHAPES["9:16"]`.
2. **Voice → timing → `story.ts`** (`SUBS`, `CUES`, `CAM`), as in story-animator Steps 4–5.
3. **Draw:** start from `examples/sensex-classroom/Film.tsx` when the analogy fits, and reuse its
   pieces (Room, WindowPane, SunShaft, Board, Bean, Desk, Plane + `arcAt`, Confetti, Card).
   Otherwise build a new world in the same style.
4. **Contact sheet** at every beat, and fix:
   - **On 9:16 keep subjects above the subtitles.** The wide shot's camera `cy` was about 560 for
     rows at world y 478–790. At cy 520 the subtitles sat on the front row.
   - **Never leave half the frame empty.** In a close-up on the board, keep the characters visible
     below it (they are always on screen and do a "hello" bounce on their cue rather than popping
     in from nothing).
   - Visible world on 9:16 is about 607/z × 1080/z. For a "50 of them" moment, pull back to z ≈ 0.58.
5. **Cover:** draw it in the reel project's own world and characters, or extend `ReelCover` in
   `brand/studio/src/templates/reel.tsx` with new art. Render it to `out/cover.png`. Check the 3:4
   crop and a small phone-feed size (about 360 px wide): the topic and headline must still read.
6. **Sound → mix → render → `ffprobe`** (1080×1920, h264 + aac, 60 s). Send the reel and the cover. Report the
   voice, the credits spent, what was measured, and the sources. Ask the user to watch and listen once.

### After the output: descriptions (always, in the same delivery message)
The reels are posted from **@finance.unboring** on Instagram (Reels) and YouTube (Shorts). With
every finished reel, give ready-to-paste text in code blocks:
- **Instagram caption:** a hook line; 3–5 short lines of the explanation; a save-and-share +
  follow @finance.unboring line; "Data: <source, date>. For education only. Not investment
  advice."; 3–5 hashtags including #financeunboring (Instagram limits posts to 5). Follow the
  exact templates in BRAND.md section 6.
- **YouTube Shorts title:** under 70 characters, ending in #Shorts.
- **YouTube description:** 2–3 lines of the explanation, follow @finance.unboring, the sources,
  the disclaimer, and 4–6 hashtags.
