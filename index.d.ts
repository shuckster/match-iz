export type TPredicate = (value: any) => boolean
export type TMatchTester = (value: any) => TEvaluator | any
export type TMatchHandler = (handler: any) => TMatchTester
export type TEvaluator = {
  matched: () => boolean
  value: () => any
}

declare module 'match-iz' {
  /**
   * @example
   * against(
   *   when(valueOrCondition)(result),
   *   when(valueOrCondition)(result),
   *   otherwise(fallbackResult)
   * )(valueToTestAgainst)
   * @param fns
   */
  export function against(...fns: TMatchTester[]): (match: any) => any

  /**
   * @example
   * match(valueToTestAgainst)(
   *   when(valueOrCondition)(result),
   *   when(valueOrCondition)(result),
   *   otherwise(fallbackResult)
   * )
   * @param value
   */
  export function match(value: any): (...fns: TMatchTester[]) => any

  /**
   * @example
   * when('foo')(handler)     // is "foo"
   * // more:
   * when([42, 'baz'])        // 42 or "baz"
   * when(inRange(100, 200))  // inclusive
   * when(/test/)             // RegExp
   * when(x => x)             // predicate
   * when({ value: defined }) // structural
   * @param pattern
   */
  export function when(pattern: any | TPredicate): TMatchHandler

  /**
   * @example
   * otherwise(fallbackResult)
   * @param handler
   */
  export function otherwise(handler: any): TMatchTester

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

  /**
   * @example
   * const { x, y, z } = spread(defined)
   * match(vector)(
   *   when({ x, y, z })(...)
   * )
   * @param fn
   * @returns object
   */
  export function spread(fn: TPredicate): object
}
