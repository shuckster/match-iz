export type PatternAsType<P> = P extends (value: any) => value is infer R
  ? R // Handle predicate functions
  : P extends (...args: any[]) => any
    ? P // Preserve literal functions
    : P extends object
      ? { [K in keyof P]: PatternAsType<P[K]> } // Recurse into objects
      : P; // Handle literal values (numbers, strings, etc.)

export type ObjectAsInterface<T> = T & { [key: string]: any };

export type PatternAsInterface<P> = P extends (value: any) => value is infer R
  ? R // Handle predicate functions
  : P extends (...args: any[]) => any
    ? P // Preserve literal functions
    : P extends object // Recurse into objects
      ? ObjectAsInterface<{ [K in keyof P]: PatternAsInterface<P[K]> }>
      : P; // Handle literal values (numbers, strings, etc.)

export type TPredicateAsserting<Kind = any> = (value: any) => value is Kind
export type TPredicate<Input = any> = (value: Input) => boolean
export type TPattern<Input = any> = Input | TPredicate<Input>
export type THandler<Input = any, Output = any> = (value: PatternAsInterface<Input>) => Output

export type TEvaluator<Input, Output> = {
  matched: (value: Input) => boolean
  value: (value: Input) => Output
}

export type TMatchTester<Input = any, Output = any> = (
  value: Input
) => TEvaluator<Input, Output> | Output

export type TMatchHandler<Input = any, Output = any> = (
  handler: THandler<Input, Output> | Output
) => TMatchTester<Input, Output>

export type TIterationLimit = number
export type TPreviousIterationLimit = number

declare module 'match-iz' {
  /**
   * When matching iterators, a built-in upper limit is specified
   * to prevent infinite loops. This limit can be queried and updated
   * by invoking `getIterationLimit` and `setIterationLimit`.
   * @example
   * getIterationLimit()
   * // 20000 (default)
   *
   * let restorePreviousLimit = setIterationLimit(Infinity)
   * getIterationLimit()
   * // Infinity
   *
   * restorePreviousLimit()
   * getIterationLimit()
   * // 20000
   */
  export function getIterationLimit(): TIterationLimit

  /**
   * When matching iterators, a built-in upper limit is specified
   * to prevent infinite loops. This limit can be queried and updated
   * by invoking `getIterationLimit` and `setIterationLimit`.
   * @example
   * getIterationLimit()
   * // 20000 (default)
   *
   * let restorePreviousLimit = setIterationLimit(Infinity)
   * getIterationLimit()
   * // Infinity
   *
   * restorePreviousLimit()
   * getIterationLimit()
   * // 20000
   */
  export function setIterationLimit(
    newMaxiumum: TIterationLimit
  ): () => TPreviousIterationLimit

  /**
   * @example
   * against(
   *   when(valueOrCondition, resultOrHandler),
   *   when(valueOrCondition, resultOrHandler),
   *   otherwise(fallbackResult)
   * )(valueToTestAgainst)
   */
  export function against<Input = any, Output = any>(
    ...needles: TMatchTester<Input, Output>[]
  ): (haystack: Input) => Output

  /**
   * @example
   * match(valueToTestAgainst)(
   *   when(valueOrCondition, resultOrHandler),
   *   when(valueOrCondition, resultOrHandler),
   *   otherwise(fallbackResult)
   * )
   */
  export function match<Input = any, Output = any>(
    haystack: Input
  ): (...needles: TMatchTester<Input, Output>[]) => Output

  /**
   * @example
   * when(pattern, resultOrHandler)
   * Uncurried: when('foo', handler)
   *   Curried: when('foo')(handler)
   * // more:
   * when(anyOf(42, 'baz'))   // 42 or "baz"
   * when(inRange(100, 200))  // inclusive
   * when(/test/)             // RegExp
   * when(x => x)             // predicate
   * when({ value: defined }) // structural
   */
  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>
  ): TMatchHandler<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    guard: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    guard1: TPattern<Input>,
    guard2: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    guard1: TPattern<Input>,
    guard2: TPattern<Input>,
    guard3: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    guard1: TPattern<Input>,
    guard2: TPattern<Input>,
    guard3: TPattern<Input>,
    guard4: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  export function when<Input = any, Output = any>(
    pattern: TPattern<Input>,
    guard1: TPattern<Input>,
    guard2: TPattern<Input>,
    guard3: TPattern<Input>,
    guard4: TPattern<Input>,
    guard5: TPattern<Input>,
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

  /**
   * @example
   * otherwise(fallbackResultOrHandler)
   */
  export function otherwise<Input = any, Output = any>(
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>

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

  export function gt(greaterThan: number): TPredicateAsserting<number>
  export function lt(lessThan: number): TPredicateAsserting<number>
  export function gte(greaterThanOrEqualTo: number): TPredicateAsserting<number>
  export function lte(lessThanOrEqualTo: number): TPredicateAsserting<number>
  export function inRange(min: number, max: number): TPredicateAsserting<number>
  export function startsWith(text: string): TPredicateAsserting<string>
  export function endsWith(text: string): TPredicateAsserting<string>
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
   *   when({ key: 'value', payload: pluck() }, payload => {
   *     payload === 123 // true
   *   })
   * )
   *
   * match({ key: 'value', payload: 123 })(
   *   when({ payload: pluck(isInteger) }, payload => {
   *     payload === 123 // true
   *   })
   * )
   */
  export function pluck(predicate?: TPredicate): TPredicate

  export const isArray: TPredicateAsserting<any[]>
  export const isDate: TPredicateAsserting<Date>
  export const isFunction: TPredicateAsserting<Function>
  export const isNumber: TPredicateAsserting<number>
  export const isPojo: TPredicateAsserting<object>
  export const isRegExp: TPredicateAsserting<RegExp>
  export const isString: TPredicateAsserting<string>
  export const isStrictly: TPredicate
  export const isIterable: TPredicateAsserting<Iterable<any>>

  /**
   * @example
   * const { x, y, z } = spread(defined)
   *
   * match(vector)(
   *   when({ x, y, z }, resultOrHandler)
   * )
   */
  export function spread(fn: TPredicate): object
}
