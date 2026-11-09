import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// WebGL in headless Chrome (three.js styles through <StyleCanvas webgl>). "angle" uses the GPU;
// on a machine without one, switch to "swangle" (software, slower).
Config.setChromiumOpenGlRenderer("angle");
