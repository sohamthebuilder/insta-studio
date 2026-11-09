// Everything brand-specific comes from ../../../account.json (the repo root).
// Edit that file (or run the new-account skill), not this one.
import raw from "../../../account.json";

export const ACCOUNT = raw;
export const HANDLE = `@${raw.handle}`;
