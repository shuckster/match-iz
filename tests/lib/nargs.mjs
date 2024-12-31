export function nargs(fn) {
  return (...args) => fn(args);
}
