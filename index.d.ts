// Helper type to convert a union of types to an intersection.
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Recursively infers a TypeScript type from a match-iz pattern.
 * @template P - The type of the pattern.
 */
export type PatternAsType<P> = P extends (value: any) => value is infer R
  ? R // Handle type guard predicates, extracting the guarded type.
  : P extends (value: infer V) => boolean
  ? V // Handle simple boolean predicates, inferring the input type.
  : P extends readonly (infer E)[]
  ? readonly PatternAsType<E>[] // Handle array patterns recursively.
  : P extends object
  ? { -readonly [K in keyof P]: PatternAsType<P[K]> } // Handle object patterns recursively.
  : P; // Handle literal values (string, number, etc.).

// Infer a union of types from a tuple of patterns.
type UnionPatternTypes<P extends readonly any[]> = PatternAsType<P[number]>;

// Infer an intersection of types from a tuple of patterns.
type IntersectPatternTypes<P extends readonly any[]> = UnionToIntersection<
  UnionPatternTypes<P>
>;

export type TPredicateAsserting<Kind = any> = (value: any) => value is Kind;
export type TPredicate<Input = any> = (value: Input) => boolean;
export type TPattern<Input = any> = Input | TPredicate<Input>;
export type THandler<Input, Output> = (value: Input) => Output;

export type TEvaluator<Input, Output> = {
  matched: (value: Input) => boolean;
  value: (value: Input) => Output;
};

export type TMatchTester<Input = any, Output = any> = (
  value: Input
) => TEvaluator<Input, Output> | Output;

// Infer the union of return types from a list of handlers.
type InferHandlerOutput<T> = T extends TMatchTester<infer _, infer O> ? O : never;

export type TIterationLimit = number;
export type TPreviousIterationLimit = number;

declare module 'match-iz' {
  export function getIterationLimit(): TIterationLimit;
  export function setIterationLimit(
    newMaxiumum: TIterationLimit
  ): () => TPreviousIterationLimit;

  export function against<
    Input,
    const T extends readonly TMatchTester<Input, any>[]
  >(
    ...needles: T
  ): (haystack: Input) => InferHandlerOutput<T[number]>;

  export function match<Input>(
    haystack: Input
  ): <
    const T extends readonly TMatchTester<Input, any>[]
  >(
    ...needles: T
  ) => InferHandlerOutput<T[number]>;

  // --- Improved 'when' overloads ---

  export function when<P, O>(
    pattern: P,
    handler: THandler<PatternAsType<P>, O> | O
  ): TMatchTester<any, O>;

  export function when<P>(
    pattern: P
  ): <O>(handler: THandler<PatternAsType<P>, O> | O) => TMatchTester<any, O>;

  export function when<P, G1, O>(
    pattern: P,
    guard1: G1,
    handler: THandler<PatternAsType<P> & PatternAsType<G1>, O> | O
  ): TMatchTester<any, O>;

  export function when<P, G1, G2, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    handler: THandler<
      PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2>,
      O
    > | O
  ): TMatchTester<any, O>;

  export function when<P, G1, G2, G3, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    guard3: G3,
    handler: THandler<
      PatternAsType<P> &
        PatternAsType<G1> &
        PatternAsType<G2> &
        PatternAsType<G3>,
      O
    > | O
  ): TMatchTester<any, O>;

  export function when<P, G1, G2, G3, G4, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    guard3: G3,
    guard4: G4,
    handler: THandler<
      PatternAsType<P> &
        PatternAsType<G1> &
        PatternAsType<G2> &
        PatternAsType<G3> &
        PatternAsType<G4>,
      O
    > | O
  ): TMatchTester<any, O>;

  export function when<P, G1, G2, G3, G4, G5, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    guard3: G3,
    guard4: G4,
    guard5: G5,
    handler: THandler<
      PatternAsType<P> &
        PatternAsType<G1> &
        PatternAsType<G2> &
        PatternAsType<G3> &
        PatternAsType<G4> &
        PatternAsType<G5>,
      O
    > | O
  ): TMatchTester<any, O>;

  export function otherwise<Input = any, Output = any>(
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>;

  export function cata(catas: any): any;

  export const defined: TPredicate;
  export const empty: TPredicate;
  export const truthy: TPredicate;
  export const falsy: TPredicate;

  export function gt(greaterThan: number): TPredicateAsserting<number>;
  export function lt(lessThan: number): TPredicateAsserting<number>;
  export function gte(greaterThanOrEqualTo: number): TPredicateAsserting<number>;
  export function lte(lessThanOrEqualTo: number): TPredicateAsserting<number>;
  export function inRange(min: number, max: number): TPredicateAsserting<number>;
  export function startsWith(text: string): TPredicateAsserting<string>;
  export function endsWith(text: string): TPredicateAsserting<string>;
  export function includes(content: any): TPredicate;

  export function not(pattern: TPattern): TPredicate;

  // --- Improved helper functions ---
  export function allOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<IntersectPatternTypes<P>>;

  export function anyOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  export function firstOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  export function lastOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  export function some<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;
  export function every<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;

  export function includedIn<const P extends readonly any[]>(...these: P): TPredicateAsserting<P[number]>;
  export function hasOwn(...props: string[]): TPredicateAsserting<Record<string, any>>;
  export function instanceOf<T>(constructor: new (...args: any[]) => T): TPredicateAsserting<T>;

  /**
   * Note: The dynamic nature of `pluck()` makes its return value difficult to type statically.
   * The type of the plucked value in the `when()` handler cannot be inferred
   * and will be typed as `any`.
   */
  export function pluck(predicate?: TPredicate): TPredicate;

  export const isArray: TPredicateAsserting<any[]>;
  export const isDate: TPredicateAsserting<Date>;
  export const isFunction: TPredicateAsserting<Function>;
  export const isNumber: TPredicateAsserting<number>;
  export const isPojo: TPredicateAsserting<object>;
  export const isRegExp: TPredicateAsserting<RegExp>;
  export const isString: TPredicateAsserting<string>;
  export const isStrictly: TPredicate;
  export const isIterable: TPredicateAsserting<Iterable<any>>;

  export function spread(fn: TPredicate): object;
}