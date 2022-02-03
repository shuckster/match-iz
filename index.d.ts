export type TPredicate = (value: any) => boolean

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
   * when('foo')(handler)     // is "foo"
   * // more:
   * when([42, 'baz'])        // 42 or "baz"
   * when(inRange(100, 200))  // inclusive
   * when(/test/)             // RegExp
   * when(x => x)             // predicate
   * when({ value: defined }) // structural
   */
  export function when(pattern: any | TPredicate): TMatchHandler

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

  export function defined(value: any): boolean
  export function empty(value: any): boolean
  export function truthy(value: any): boolean
  export function falsy(value: any): boolean
  export function gt(greaterThan: number): TPredicate
  export function lt(lessThan: number): TPredicate
  export function gte(greaterThanOrEqualTo: number): TPredicate
  export function lte(lessThanOrEqualTo: number): TPredicate
  export function inRange(min: number, max: number): TPredicate
  export function startsWith(text: string): TPredicate
  export function endsWith(text: string): TPredicate
  export function includes(content: any): TPredicate

  export function not(value: any): TPredicate
  export function allOf(...these: any[]): TPredicate
  export function anyOf(...these: any[]): any[]
  export function includedIn(...these: any): any[]
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

  export function isArray(value: any): boolean
  export function isDate(value: any): boolean
  export function isFunction(value: any): boolean
  export function isNumber(value: any): boolean
  export function isPojo(value: any): boolean
  export function isRegExp(value: any): boolean
  export function isString(value: any): boolean

  /**
   * @example
   * const { x, y, z } = spread(defined)
   * match(vector)(
   *   when({ x, y, z })(...)
   * )
   */
  export function spread(fn: TPredicate): object
}
