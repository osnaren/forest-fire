// Small browser shim for server-only native modules (e.g. sharp, fs, crypto)
// This file is intentionally minimal: it exports an empty default and a noop
// helper so that client-side bundlers can safely replace native server
// modules with this shim when resolving for browser targets.

// Default export (used for default imports)
const empty: any = {};
export default empty;

// Named noop helper in case code expects named exports
export const noop = () => undefined;
