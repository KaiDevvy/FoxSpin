export {};

declare global {
  interface Math {
    lerp(start: number, end: number, alpha: number): number;
    clamp(value: number, min: number, max: number): number;
  }
}

Math.lerp = (start, end, alpha) => start * (1 - alpha) + end * alpha;
Math.clamp = (value, min, max) => Math.min(Math.max(value, min), max);