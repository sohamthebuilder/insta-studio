import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cancelRender, continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";

// StyleCanvas: the bridge for library styles drawn on a <canvas> (styles/catalog.json renderer
// "canvas" or "three"). The upstream demos expose `render(t)` on a web page; here the same drawing
// runs inside Remotion, one call per frame, with t in seconds.
//
//   const makeWatercolor: MakePainter = async ({ ctx, width, height }) => {
//     const paper = await buildPaper(width, height);           // slow work once: sprites, textures, fonts
//     return { draw: (t) => { ctx!.drawImage(paper, 0, 0); paintStrokes(ctx!, t); } };
//   };
//   <StyleCanvas make={makeWatercolor} />                       // full frame, 2D
//
//   const makeIsland: MakePainter = ({ canvas, width, height }) => {
//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
//     renderer.setSize(width, height, false);
//     const scene = buildScene(), camera = buildCamera(width / height);
//     return { draw: (t) => { poseScene(scene, camera, t); renderer.render(scene, camera); },
//              dispose: () => renderer.dispose() };
//   };
//   <StyleCanvas make={makeIsland} webgl />                     // three.js (npm i three in the project)
//
// Rules (styles/ADAPTING.md section 3):
// - draw(t) must be a pure function of t: Remotion renders frames in parallel tabs and out of order.
//   Seed every random choice (mulberry32 below, or rnd() in helpers.ts). No state between frames.
// - `make` runs once per mount; the render waits (delayRender) until its promise resolves.
// - Put subtitles, cards and the handle on top as React, not on the canvas.
// - three.js: pass preserveDrawingBuffer: true, and keep remotion.config.ts on the "angle" GL backend.

export type PainterContext = {
  canvas: HTMLCanvasElement;
  /** The 2D context, or null when `webgl` is set (the painter creates its own WebGL renderer). */
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  fps: number;
};
export type Painter = { draw: (t: number) => void; dispose?: () => void };
export type MakePainter = (c: PainterContext) => Painter | Promise<Painter>;

export const StyleCanvas: React.FC<{
  make: MakePainter;
  webgl?: boolean;
  /** Canvas size in pixels. Defaults to the composition size. */
  width?: number;
  height?: number;
  /** Seconds added to the frame time, e.g. to start a Sequence part-way into a painter's timeline. */
  timeOffset?: number;
  style?: React.CSSProperties;
}> = ({ make, webgl = false, width, height, timeOffset = 0, style }) => {
  const frame = useCurrentFrame();
  const cfg = useVideoConfig();
  const w = width ?? cfg.width;
  const h = height ?? cfg.height;
  const ref = useRef<HTMLCanvasElement>(null);
  const makeRef = useRef(make); // `make` runs once; a new function identity on re-render is ignored
  const [painter, setPainter] = useState<Painter | null>(null);
  const [handle] = useState(() => delayRender("StyleCanvas: waiting for the painter's setup"));

  useEffect(() => {
    const canvas = ref.current!;
    let alive = true;
    let made: Painter | null = null;
    const ctx = webgl ? null : canvas.getContext("2d");
    Promise.resolve(makeRef.current({ canvas, ctx, width: w, height: h, fps: cfg.fps }))
      .then((p) => {
        made = p;
        if (alive) setPainter(p);
        else p.dispose?.();
      })
      .catch((err) => cancelRender(err));
    return () => {
      alive = false;
      made?.dispose?.();
    };
    // the canvas is built once per size; changing webgl/size remounts the painter
  }, [webgl, w, h, cfg.fps]);

  useLayoutEffect(() => {
    if (!painter) return;
    try {
      painter.draw(frame / cfg.fps + timeOffset);
    } catch (err) {
      cancelRender(err);
      return;
    }
    continueRender(handle); // only the first call matters; later calls are no-ops
  }, [painter, frame, cfg.fps, timeOffset, handle]);

  return <canvas ref={ref} width={w} height={h} style={{ position: "absolute", left: 0, top: 0, width: w, height: h, ...style }} />;
};

/** Seeded random numbers for painters: const r = mulberry32(42); r() → [0, 1). Same seed, same sequence. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Run fn with a fixed seed (for builders that consume a shared RNG, like the upstream stroke engines). */
export function withSeed<T>(seed: number, fn: (rand: () => number) => T): T {
  return fn(mulberry32(seed));
}
