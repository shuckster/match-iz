import { match, otherwise, when } from 'match-iz'

const defaultDescription = 'Assertion failed'

/**
 * @param {unknown} input
 * @param {string} [description]
 * @returns {never}
 */
const throwOnFailure = (input, description = defaultDescription) => {
  throw new TypeError(description, { cause: input })
}

/**
 * Create an `asserts`-shaped function (same dual signature as the default
 * export): either one-shot `fn(pattern, value, description?)` or curried
 * `fn(pattern)(value, description?)`.
 *
 * Custom `onFailure` handlers should throw (or not return) so TypeScript
 * assertion narrowing remains sound.
 *
 * @param {(input: unknown, description: string) => void} [onFailure]
 * @returns {(
 *   pattern: unknown,
 *   value?: unknown,
 *   description?: string
 * ) => void | ((input: unknown, description?: string) => void)}
 */
function makeAsserter(onFailure = throwOnFailure) {
  const forPattern = pattern =>
    function assertMatch(input, description = defaultDescription) {
      const ok = match(input)(
        when(pattern, () => true),
        otherwise(() => false)
      )
      if (ok) return
      onFailure(input, description)
    }

  /**
   * @param {unknown} pattern
   * @param {unknown} [value]
   * @param {string} [description]
   */
  function asserts(pattern, value, description) {
    if (arguments.length >= 2) {
      forPattern(pattern)(value, description)
      return
    }
    return forPattern(pattern)
  }

  return asserts
}

/**
 * Assert that a value matches a match-iz pattern.
 *
 * - Direct:  `asserts(pattern, value, description?)`
 * - Curried: `asserts(pattern)` → `(value, description?) => void`
 *
 * Same signature as `makeAsserter()` / `makeAsserter(onFailure)`.
 */
const asserts = makeAsserter()

export { asserts, makeAsserter }
