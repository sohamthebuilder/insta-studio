# insta-studio

A content studio for one Instagram + YouTube Shorts account, in **any niche**, run with
[Claude Code](https://claude.com/claude-code). It makes:

- **60-second animated story reels** (9:16): one cartoon analogy world explains one idea, an
  ElevenLabs narrator tells it, every beat lands on the spoken word, music and soft effects, and
  every frame is drawn in code with [Remotion](https://remotion.dev). No presenter, no AI images.
- **Stills that match the reels:** carousels, single posts, story sets, highlight covers, reel covers,
  profile pictures and a YouTube banner, all from one template library.
- **Ready-to-paste text:** Instagram captions, Shorts titles and descriptions, plus a `sources.md`
  for every fact.

Everything brand-specific (handle, colours, mascot, voice, disclaimer, hashtags) lives in
**`account.json`** and **`BRAND.md`**. The process lives in three Claude Code skills that ship with
the repo.

## Start a new account

```bash
# 1. make your own copy (or click "Use this template" on GitHub)
gh repo create my-new-account --private --template <owner>/insta-studio --clone
cd my-new-account

# 2. one-time setup: checks Node 18+, ffmpeg, Python 3, installs the studio and the timing venv
bash scripts/setup.sh

# 3. open Claude Code here and say:
#    "set up a new account for <your niche>"
claude
```

You also need ElevenLabs for the voice and music. Connect the ElevenLabs connector in the Claude app
(Settings → Connectors), or set `ELEVENLABS_API_KEY`. A 60 s reel costs about 2,750 credits.

## The skills (in `.claude/skills/`, picked up automatically by Claude Code in this folder)

| Skill | Say | What happens |
|---|---|---|
| `new-account` | "set up a new account for plant care" | Interviews you (niche, audience, handle, voice, mascot, colours, safety rules), fills `account.json` + `BRAND.md`, renders the brand kit, proposes the first 5 reels |
| `reel` | "make the next reel about X" | **Gate 1:** script, voice preview, storyboard, cover and sources for your OK (no credits spent). **Gate 2:** voice → word timing → animation → mix → render → cover → captions |
| `social` | "turn that reel into a carousel" / "make a story set" | Outline for your OK, then renders PNGs into `social/<slug>/` with `caption.md` and `sources.md` |

Rules that came from real feedback (no presenter, hook first, designed covers, no sticker
placeholders, verified and dated facts) are built in. New feedback goes into `LEARNINGS.md` and
becomes a rule for every later piece. `LOG.md` keeps the list of what's been made.

## Layout

```
account.json        brand values the code reads (handle, colours, mascot, voice, music, disclaimer)
BRAND.md            brand guide: voice, 8-beat story formula, specs, captions, safety rules
LEARNINGS.md        owner feedback rules, newest last
LOG.md              every reel and post made
.claude/skills/     new-account, reel, social
engine/             the animation engine: ENGINE.md (pipeline), references/, template/, scripts/
                    (transcribe.py word timing, mix.py audio mix, contact_sheet.sh), examples/
studio/             still-image templates (Remotion): src/brand (mascot, tokens, fonts),
                    src/templates (reel, carousel, story, highlight, banner), src/pieces (posts)
brand/              rendered brand kit: templates/template-sheet.png, assets/ (profile, avatar, banner)
reels/<slug>/       one Remotion project per reel   (scripts/new-reel.sh <slug>)
social/<slug>/      rendered posts and story sets
examples/finance-unboring/   a fully filled account to learn from
```

## Handy commands

```bash
bash studio/render-brand.sh                    # re-render the whole brand kit after editing account.json
bash studio/render-piece.sh <slug> --guides    # check a post against the safe zones
bash scripts/new-reel.sh <slug>                # new reel project
cd reels/<slug> && npm run studio              # preview a reel in the browser
cd reels/<slug> && npm run render              # render out/film.mp4
```

## Credits
Built from the story-animator pipeline and the finance.unboring brand system. Fonts: Baloo 2 and
Patrick Hand (Google Fonts, OFL).
