export type TPredicate = (value: any) => boolean
export type TPattern = any | TPredicate

export type TEvaluator = {
  matched: () => boolean
  value: () => any
}

export type TMatchTester = (value: any) => TEvaluator | any
export type TMatchHandler = (handler: any) => TMatchTester

declare module 'match-iz' {
  /**
   * @example
   * against(
   *   when(valueOrCondition)(result),
   *   when(valueOrCondition)(result),
   *   otherwise(fallbackResult)
   * )(valueToTestAgainst)
   */
  export function against(...needles: TMatchTester[]): (haystack: any) => any

  /**
   * @example
   * match(valueToTestAgainst)(
   *   when(valueOrCondition)(result),
   *   when(valueOrCondition)(result),
   *   otherwise(fallbackResult)
   * )
   */
  export function match(haystack: any): (...needles: TMatchTester[]) => any

  /**
   * @example
   * Uncurried: when('foo', handler)
   *   Curried: when('foo')(handler)
   * // more:
   * when(anyOf(42, 'baz'))   // 42 or "baz"
   * when(inRange(100, 200))  // inclusive
   * when(/test/)             // RegExp
   * when(x => x)             // predicate
   * when({ value: defined }) // structural
   */
  export function when(pattern: TPattern): TMatchHandler
  export function when(pattern: TPattern, handler: any): TMatchTester
  export function when(
    pattern: TPattern,
    guard: TPattern,
    handler: any
  ): TMatchTester

  export function when(
    pattern: TPattern,
    guard1: TPattern,
    guard2: TPattern,
    handler: any
  ): TMatchTester

  export function when(
    pattern: TPattern,
    guard1: TPattern,
    guard2: TPattern,
    guard3: TPattern,
    handler: any
  ): TMatchTester

  export function when(
    pattern: TPattern,
    guard1: TPattern,
    guard2: TPattern,
    guard3: TPattern,
    guard4: TPattern,
    handler: any
  ): TMatchTester

  export function when(
    pattern: TPattern,
    guard1: TPattern,
    guard2: TPattern,
    guard3: TPattern,
    guard4: TPattern,
    guard5: TPattern,
    handler: any
  ): TMatchTester

  /**
   * @example
   * otherwise(fallbackResult)
   */
  export function otherwise(handler: any): TMatchTester

  /**
   * Specify how match/against should detect ADTs/monads and extract their values
   * @example
   * const { just, nothing } = cata({
   *   just: m => m?.isJust,
   *   nothing: m => m?.isNothing,
   *   getValue: m => m?.valueOf()
   * })
   *
   * match(maybeDate('2022-01-01'))(
   *   just(dateObj => {
   *     console.log('Parsed date: ', dateObj)
   *   }),
   *   nothing(() => {
   *     console.log('Invalid date')
   *   })
   * )
   */
  export function cata(catas: any): any

  export const defined: TPredicate
  export const empty: TPredicate
  export const truthy: TPredicate
  export const falsy: TPredicate

  export function gt(greaterThan: number): TPredicate
  export function lt(lessThan: number): TPredicate
  export function gte(greaterThanOrEqualTo: number): TPredicate
  export function lte(lessThanOrEqualTo: number): TPredicate
  export function inRange(min: number, max: number): TPredicate
  export function startsWith(text: string): TPredicate
  export function endsWith(text: string): TPredicate
  export function includes(content: any): TPredicate

  export function not(pattern: TPattern): TPredicate
  export function allOf(...these: TPattern[]): TPredicate
  export function anyOf(...these: TPattern[]): TPredicate
  export function firstOf(...these: TPattern[]): TPredicate
  export function lastOf(...these: TPattern[]): TPredicate
  export function some(pattern: TPattern): TPredicate
  export function every(pattern: TPattern): TPredicate
  export function includedIn(...these: TPattern): TPredicate
  export function hasOwn(...props: string[]): TPredicate
  export function instanceOf(constructor: any): TPredicate

  /**
   * @example
   * match({ key: 'value', payload: 123 })(
   *   when({ key: 'value', payload: pluck() })(payload => {
   *     payload === 123 // true
   *   })
   * )
   *
   * match({ key: 'value', payload: 123 })(
   *   when({ payload: pluck(isInteger) })(payload => {
   *     payload === 123 // true
   *   })
   * )
   */
  export function pluck(predicate?: TPredicate): TPredicate

  export const isArray: TPredicate
  export const isDate: TPredicate
  export const isFunction: TPredicate
  export const isNumber: TPredicate
  export const isPojo: TPredicate
  export const isRegExp: TPredicate
  export const isString: TPredicate

  /**
   * @example
   * const { x, y, z } = spread(defined)
   * match(vector)(
   *   when({ x, y, z })(...)
   * )
   */
  export function spread(fn: TPredicate): object
}
