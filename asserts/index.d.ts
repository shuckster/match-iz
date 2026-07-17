import type { PatternAsType } from '../index'

/**
 * Called when a value fails to match the pattern.
 * Must throw (or not return) for assertion narrowing to remain sound.
 */
export type TOnFailure = (input: unknown, description: string) => void

/**
 * A reusable asserter for pattern `P`.
 * Bindings must be **explicitly annotated** with this type for TypeScript
 * to apply assertion narrowing (TS2775):
 *
 * @example
 * const isUser: TAssertMatch<typeof pattern> = asserts(pattern)
 * isUser(user) // narrows user
 */
export type TAssertMatch<P> = (
  value: unknown,
  description?: string
) => asserts value is PatternAsType<P>

/**
 * Dual-arity asserts function — same shape for `asserts` and
 * `makeAsserter()` / `makeAsserter(onFailure)`.
 */
export type TAsserts = {
  <P>(
    pattern: P,
    value: unknown,
    description?: string
  ): asserts value is PatternAsType<P>
  <P>(pattern: P): TAssertMatch<P>
}

declare module 'match-iz/asserts' {
  export type TOnFailure = (input: unknown, description: string) => void

  export type TAssertMatch<P> = (
    value: unknown,
    description?: string
  ) => asserts value is PatternAsType<P>

  export type TAsserts = {
    <P>(
      pattern: P,
      value: unknown,
      description?: string
    ): asserts value is PatternAsType<P>
    <P>(pattern: P): TAssertMatch<P>
  }

  /**
   * Create an asserts function with custom failure handling.
   * Returns the **same dual signature** as the default `asserts` export:
   *
   * - Direct:  `fn(pattern, value, description?)`
   * - Curried: `fn(pattern)` → `(value, description?) => …`
   *
   * Default `onFailure` throws a `TypeError` with the bad value as
   * `error.cause`. Custom handlers should throw (or not return).
   *
   * @example
   * const asserts = makeAsserter((input, description) => {
   *   throw new Error(`${description}: ${JSON.stringify(input)}`)
   * })
   * asserts(isString, value)
   * const isName = asserts(isString)
   * isName(value)
   */
  export function makeAsserter(onFailure?: TOnFailure): TAsserts

  /**
   * Assert that a value matches a match-iz pattern.
   * Equivalent to `makeAsserter()` (default throw-on-failure).
   *
   * **Direct** (best for TypeScript narrowing):
   * @example
   * function greet(user: unknown) {
   *   asserts({ id: isNumber, name: isString }, user)
   *   return user.name // string
   * }
   *
   * **Curried** (annotate the binding for narrowing — TS2775):
   * @example
   * const pattern = { id: isNumber, name: isString }
   * const isUser: TAssertMatch<typeof pattern> = asserts(pattern)
   * isUser(user)
   */
  export const asserts: TAsserts
}
