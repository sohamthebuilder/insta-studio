// "What IS the Sensex?" — a 60 s 9:16 story film. Narration: ElevenLabs "Rameez" (take A).
// Every frame number lives here. Word frames are from scripts/transcribe.py (frame = 15 + round(t × 30)).

export const FPS = 30;
export const OFFSET = 15;

export const SHAPES = {
  "16:9": { width: 1920, height: 1080 },
  "9:16": { width: 1080, height: 1920 },
  "4:5": { width: 1080, height: 1350 },
  "1:1": { width: 1080, height: 1080 },
} as const;

const SHAPE = SHAPES["9:16"];

export const STORY = {
  title: "What IS the Sensex?",
  fps: FPS,
  width: SHAPE.width,
  height: SHAPE.height,
  durationFrames: 1800,
  audio: "audio/mix.wav" as string | null,
};

export const SUBS: [number, number, string][] = [
  [15, 152, "On Tuesday, the Sensex jumped 1,225 points."],
  [160, 216, "But what IS the Sensex?"],
  [222, 284, "Picture a class of 30 students."],
  [291, 374, "One student's marks won't tell you how the class is doing..."],
  [378, 436, "...so you check the class average."],
  [440, 494, "The Sensex is that average,"],
  [495, 566, "for 30 of India's biggest companies."],
  [570, 616, "The Nifty uses 50."],
  [618, 692, "And the bigger the company, the more it counts."],
  [698, 770, "For weeks, the class was gloomy."],
  [773, 882, "Oil was expensive, and India buys most of its oil from abroad."],
  [884, 962, "And foreign investors, called FPIs,"],
  [963, 1006, "were taking their money home."],
  [1011, 1070, "Then... two things changed."],
  [1072, 1108, "Oil got cheaper."],
  [1110, 1160, "And the FPIs came back,"],
  [1162, 1275, "buying over 3,000 crore rupees of Indian shares in a day."],
  [1279, 1340, "More buyers, higher prices..."],
  [1343, 1393, "...and the class average jumped."],
  [1397, 1448, "So when the Sensex goes up..."],
  [1450, 1505, "...the whole class did a little better."],
];

export const CUES = {
  sensex: 56, // "Sensex"
  jumped: 66, // "jumped" — the counter starts
  points: 130,
  what: 160, // "But what"
  is: 179, // "IS" — the question mark
  picture: 222,
  thirty: 254, // "30" — students pop in
  one: 290, // "One" — spotlight
  doing: 361,
  check: 396, // papers rise
  average: 414, // "average" — marks fly to the board
  sensex2: 446, // "Sensex is that average"
  companies: 543,
  nifty: 574, // "Nifty"
  fifty: 596, // extras pop in
  bigger: 627, // "bigger" — big students swell
  counts: 674,
  weeks: 704,
  gloomy: 750, // "gloomy"
  oil: 772, // "Oil" — barrels drop
  abroad: 840, // tanker arrives through the window ("India buys…abroad" f825–874)
  foreign: 894, // planes leave
  home: 986,
  then: 1011,
  changed: 1045, // sun breaks through
  oil2: 1071,
  cheaper: 1085, // barrels shrink
  fpiBack: 1120, // planes return
  crore: 1202,
  day: 1260,
  buyers: 1279,
  jumped2: 1370, // "jumped" — the board climbs
  up: 1430,
  better: 1484,
  card: 1590, // closing card
  end: 1800,
};

// [frame, centreX, centreY, zoom] in the 1920 × 1080 world. On 9:16 the frame shows ~607/z × 1080/z.
export const CAM: [number, number, number, number][] = [
  [0, 960, 380, 1.1],
  [150, 960, 372, 1.14], // hook: the scoreboard, the class below
  [205, 960, 372, 1.15],
  [262, 960, 560, 1.0], // pull back to the whole class
  [290, 960, 565, 1.0],
  [325, 804, 640, 1.85], // push to one student
  [372, 806, 642, 1.9],
  [418, 960, 540, 1.0], // back wide: class + board
  [565, 960, 545, 1.03],
  [600, 960, 600, 0.58], // pull wide for the Nifty's 50
  [618, 960, 600, 0.58],
  [655, 960, 560, 1.0],
  [695, 960, 560, 1.0],
  [770, 960, 545, 1.08], // gloomy creep
  [800, 960, 545, 1.08],
  [860, 1388, 300, 1.55], // drift to the window: oil from abroad
  [900, 1390, 302, 1.55],
  [990, 1300, 400, 1.25], // planes fly out
  [1010, 1300, 400, 1.25],
  [1060, 1250, 430, 1.15], // sun breaks through
  [1095, 960, 560, 1.0], // wide: barrels shrink
  [1118, 960, 560, 1.0],
  [1150, 1300, 380, 1.3], // planes come back in
  [1265, 1030, 555, 1.05],
  [1300, 960, 540, 1.0],
  [1380, 960, 510, 1.08], // the board climbs
  [1430, 960, 515, 1.08],
  [1500, 960, 560, 0.96],
  [1600, 960, 550, 1.0],
  [1800, 960, 548, 1.02],
];
