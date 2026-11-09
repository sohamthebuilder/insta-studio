# First-time setup: create your profile and your first reel

From an empty machine to a posted Instagram reel. Expect about an hour the first time: 15 minutes
of setup, 15 for the brand interview, the rest for the reel. Claude Code does the work; you answer
questions and approve at each checkpoint.

## 0. What you need

| Thing | Why | Check |
|---|---|---|
| [Claude Code](https://claude.com/claude-code) | runs the skills | `claude --version` |
| Node.js 18+ | Remotion renders every frame | `node -v` |
| ffmpeg | audio mix and video checks | `ffmpeg -version` (Mac: `brew install ffmpeg`) |
| Python 3 | word timing (faster-whisper) | `python3 --version` |
| git + GitHub | your own copy of the studio | `git --version`, `gh auth status` |
| An [ElevenLabs](https://elevenlabs.io) account | narrator voice and music | about **2,750 credits per 60 s reel** |
| An Instagram account (and a YouTube channel, optional) | where the reel goes | |

## 1. Make your own copy (2 min)

One repo = one account. Make a private copy for your new account:

```bash
gh repo create my-account --private --template sohamthebuilder/insta-studio --clone
```

```bash
cd my-account
```

No access to the template? Clone it and point it at your own empty repo instead:
`git clone <insta-studio url> my-account && cd my-account && git remote set-url origin <your repo url>`.

## 2. Install (5–10 min)

```bash
bash scripts/setup.sh
```

It checks Node, ffmpeg and Python, installs the still-image studio, and creates `.venv` for word
timing. Fix anything marked ✗ and run it again.

## 3. Connect ElevenLabs (2 min)

Pick one:
- **Connector (easiest):** Claude app → Settings → Connectors → ElevenLabs → Connect, and log in.
  Start a new Claude Code session afterwards so the tools load.
- **API key:** add `export ELEVENLABS_API_KEY=...` to your shell profile and open a new terminal.

## 4. Set up the account (15 min)

```bash
claude
```

Then say:

> set up a new account for **&lt;your niche&gt;**

Claude asks everything in one message, each with a suggested answer: niche and promise, audience,
handle, content pillars, narrator voice (with free previews), music feel, mascot, colours, safety
rules and disclaimer, hashtags, and **house styles** (it sends a poster sheet of 3–4 looks that suit
your niche; there are 67 in total, listed in the [README](README.md#styles)). Reply with changes, or
**"go"** to accept every default.

Before you answer:
- Check the handle is free on Instagram and YouTube yourself.
- Keep **storybook** as the default style for your first reel. It matches the mascot and templates out
  of the box. Add others to `allowed` to try later.

Claude then fills `account.json` and `BRAND.md`, renders the brand kit, and shows you three logo
options. **Pick A, B or C.**

## 5. Set up your Instagram profile (10 min)

Everything is in `brand/`:

| On Instagram | Use |
|---|---|
| Account type | Settings → Account type and tools → switch to a **Professional (Creator)** account, for insights |
| Profile picture | `brand/assets/profile/profile-instagram-1080.png` |
| Name and bio | the bios in `BRAND.md` section 6.4 (Claude also pastes them in the chat) |
| Highlights | `brand/templates/png/highlight-*.png`, set as each highlight's cover once you have stories to save in it |

YouTube (optional): profile `brand/assets/profile/profile-youtube-800.png`, banner
`brand/assets/youtube-banner.jpg`, description from `BRAND.md` 6.4.

Claude ends the setup with **5 starter reel ideas**. Commit the account:

```bash
git add -A && git commit -m "Set up my account" && git push
```

## 6. Make your first reel (30–45 min)

In Claude Code, say:

> make the next reel about **&lt;idea 1&gt;**

(or "make the next reel, you pick" to use idea 1 from the starter plan).

**Gate 1: the proposal. Nothing is spent yet.** You get one message with:
- the full script, ending with a save-and-share line;
- style options with a poster sheet (keep storybook for this first one);
- the voice with a free preview;
- a beat-by-beat storyboard, the cover idea, the sources for every fact, and the credit cost.

Read it, ask for changes, and reply **"OK"** when you are happy. Check the facts and sources
yourself: you are the publisher.

**Gate 2: production.** Claude makes the voice, times every word, draws and animates the film, adds
music and effects, mixes, renders and checks it. You get:

| File | What |
|---|---|
| `reels/<slug>/out/film.mp4` | the reel, 1080×1920, 60 s |
| `reels/<slug>/out/cover.png` | the designed cover |
| `reels/<slug>/caption.md` | Instagram caption, YouTube Shorts title and description |
| `reels/<slug>/sources.md` | every fact with its source and date |

**Watch and listen once, all the way through.** Claude can't hear audio or watch motion, so this is
your check. Ask for fixes in plain words ("the music is too loud at the end", "hold the number longer").

## 7. Post it (5 min)

**Instagram:**
1. Send `film.mp4` and `cover.png` to your phone (AirDrop, Drive, etc.).
2. Instagram → **+** → **Reel** → pick `film.mp4`. Don't add Instagram's own music or captions on top.
3. **Edit cover** → **Add from camera roll** → `cover.png`. Check the 3:4 crop shown for the profile grid.
4. Paste the caption from `caption.md`. Keep **Share to feed** on. Post.

**YouTube Shorts (optional):** upload the same `film.mp4`; paste the title and description from
`caption.md`.

## 8. After posting

- Tell Claude what you'd change next time ("hooks should be shorter", "less gold on the cover").
  Rules that apply to every reel go into `LEARNINGS.md` and are followed from then on.
- The reel is logged in `LOG.md` so analogy worlds never repeat.
- Commit: `git add -A && git commit -m "Reel: <slug>" && git push`. Big renders and audio stay local
  (they're git-ignored).
- Next: "make the next reel about <idea 2>", or "turn that reel into a carousel".

## If something goes wrong

| Problem | Fix |
|---|---|
| `setup.sh` says ✗ for a tool | install it (table in step 0), then rerun |
| Claude can't find ElevenLabs tools | connect the connector (step 3), then start a **new** session |
| The reel skill says to set up the account first | `account.json` still has `"niche": "TBD"`: run step 4 |
| A 3D style renders very slowly | expected without a GPU; stay with a 2D style, or set `"swangle"` in the reel's `remotion.config.ts` |
| You want to see all the looks | `bash studio/render-style-picker.sh` → `styles/picker/all.jpg` |
