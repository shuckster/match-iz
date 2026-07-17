/**
 * Compile-time assertion helpers for match-iz type tests.
 * These produce no runtime code; failures surface as tsc errors.
 */
import type { Rest, Plucked } from '../../common';

export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;

type BrandKey = keyof Rest<unknown> | keyof Plucked<unknown>;

/**
 * True if `T` still carries a phantom pluck/rest brand key
 * (i.e. the brand leaked into a handler's first argument).
 */
export type HasBrandLeak<T> = BrandKey extends keyof T
  ? true
  : T extends readonly (infer E)[]
  ? BrandKey extends keyof E
    ? true
    : false
  : false;

/** @deprecated Use HasBrandLeak */
export type HasRestBrandLeak<T> = HasBrandLeak<T>;
