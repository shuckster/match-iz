// Helper type to convert a union of types to an intersection.
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Recursively infers a TypeScript type from a match-iz pattern.
 * @template P - The type of the pattern.
 */
export type PatternAsType<P> = P extends RegExp
  ? RegExpMatchArray | Record<string, string | undefined> // Handle RegExp patterns
  : P extends (value: unknown) => value is infer R
  ? R // Handle type guard predicates, extracting the guarded type.
  : P extends (value: infer V) => boolean
  ? V // Handle simple boolean predicates, inferring the input type.
  : P extends readonly (infer E)[]
  ? readonly PatternAsType<E>[] // Handle array patterns recursively.
  : P extends object
  ? { -readonly [K in keyof P]: PatternAsType<P[K]> } // Handle object patterns recursively.
  : P; // Handle literal values (string, number, etc.).

// Infer a union of types from a tuple of patterns.
type UnionPatternTypes<P extends readonly unknown[]> = PatternAsType<P[number]>;

// Infer an intersection of types from a tuple of patterns.
type IntersectPatternTypes<P extends readonly unknown[]> = UnionToIntersection<
  UnionPatternTypes<P>
>;

export type TPredicateAsserting<Kind> = (value: unknown) => value is Kind;
export type TPredicate<Input> = (value: Input) => boolean;
export type TPattern<Input> = Input | TPredicate<Input>;
export type THandler<Input, Output> = (value: Input) => Output;

export type TEvaluator<Input, Output> = {
  matched: (value: Input) => boolean;
  value: (value: Input) => Output;
};

export type TMatchTester<Input, Output> = (
  value: Input
) => TEvaluator<Input, Output> | Output;

// Infer the union of return types from a list of handlers.
type InferHandlerOutput<T> = T extends TMatchTester<infer _, infer O> ? O : never;

export type TIterationLimit = number;
export type TPreviousIterationLimit = number;

declare module 'match-iz' {
  /**
   * Returns the current iteration limit for recursive patterns.
   *
   * @returns {TIterationLimit} The current iteration limit.
   */
  export function getIterationLimit(): TIterationLimit;

  /**
   * Sets a new iteration limit for recursive patterns.
   *
   * @param {TIterationLimit} newMaxiumum - The new iteration limit.
   * @returns {() => TPreviousIterationLimit} A function that restores the previous limit.
   */
  export function setIterationLimit(
    newMaxiumum: TIterationLimit
  ): () => TPreviousIterationLimit;

  /**
   * Creates a reusable pattern matching function.
   *
   * @template Input - The type of the value to match against.
   * @template {readonly TMatchTester<Input, unknown>[]} T - A tuple of `when` and `otherwise` clauses.
   * @param {...T} needles - A sequence of `when` and `otherwise` clauses.
   * @returns {(haystack: Input) => InferHandlerOutput<T[number]>} A function that takes a value and executes the pattern match.
   * @example
   * const isSuccess = against(
   *   when({ statusCode: 200 }, ({ body }) => body),
   *   otherwise(() => null)
   * );
   * const result = isSuccess({ statusCode: 200, body: 'Success!' });
   */
  export function against<
    Input,
    const T extends readonly TMatchTester<Input, unknown>[]
  >(
    ...needles: T
  ): (haystack: Input) => InferHandlerOutput<T[number]>;

  /**
   * Matches a value against a series of patterns.
   *
   * @template Input - The type of the value to match against.
   * @param {Input} haystack - The value to match.
   * @returns {<const T extends readonly TMatchTester<Input, unknown>[]>(...needles: T) => InferHandlerOutput<T[number]>} A function that takes a sequence of `when` and `otherwise` clauses.
   * @example
   * const result = match(response)(
   *   when({ statusCode: 200 }, ({ body }) => body),
   *   when({ statusCode: 404 }, () => 'Not Found'),
   *   otherwise(() => 'Error')
   * );
   */
  export function match<Input>(
    haystack: Input
  ): <
    const T extends readonly TMatchTester<Input, unknown>[]
  >(
    ...needles: T
  ) => InferHandlerOutput<T[number]>;

  /**
   * Defines a pattern and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template O - The output type of the handler.
   * @param {P} pattern - The pattern to match. Can be a literal value, an object, an array, or a predicate function.
   * @param {THandler<PatternAsType<P>, O> | O} handler - The handler to execute if the pattern matches. Can be a function or a value.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
  export function when<P, O>(
    pattern: P,
    handler: THandler<PatternAsType<P>, O> | O
  ): TMatchTester<unknown, O>;

  /**
   * Defines a pattern and returns a function that takes a handler.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to match.
   * @returns {<O>(handler: THandler<PatternAsType<P>, O> | O) => TMatchTester<unknown, O>} A function that takes a handler and returns a match tester object.
   */
  export function when<P>(
    pattern: P
  ): <O>(handler: THandler<PatternAsType<P>, O> | O) => TMatchTester<unknown, O>;

  /**
   * Defines a pattern with a guard and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template G1 - The first guard pattern.
   * @template O - The output type of the handler.
   * @param {P} pattern - The main pattern.
   * @param {G1} guard1 - The first guard pattern.
   * @param {THandler<PatternAsType<P> & PatternAsType<G1>, O> | O} handler - The handler to execute if all patterns match.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
  export function when<P, G1, O>(
    pattern: P,
    guard1: G1,
    handler: THandler<PatternAsType<P> & PatternAsType<G1>, O> | O
  ): TMatchTester<unknown, O>;

  /**
   * Defines a pattern with two guards and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template G1 - The first guard pattern.
   * @template G2 - The second guard pattern.
   * @template O - The output type of the handler.
   * @param {P} pattern - The main pattern.
   * @param {G1} guard1 - The first guard pattern.
   * @param {G2} guard2 - The second guard pattern.
   * @param {THandler<PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2>, O> | O} handler - The handler to execute if all patterns match.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
  export function when<P, G1, G2, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    handler: THandler<
      PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2>,
      O
    > | O
  ): TMatchTester<unknown, O>;

  /**
   * Defines a pattern with three guards and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template G1 - The first guard pattern.
   * @template G2 - The second guard pattern.
   * @template G3 - The third guard pattern.
   * @template O - The output type of the handler.
   * @param {P} pattern - The main pattern.
   * @param {G1} guard1 - The first guard pattern.
   * @param {G2} guard2 - The second guard pattern.
   * @param {G3} guard3 - The third guard pattern.
   * @param {THandler<PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2> & PatternAsType<G3>, O> | O} handler - The handler to execute if all patterns match.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
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
  ): TMatchTester<unknown, O>;

  /**
   * Defines a pattern with four guards and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template G1 - The first guard pattern.
   * @template G2 - The second guard pattern.
   * @template G3 - The third guard pattern.
   * @template G4 - The fourth guard pattern.
   * @template O - The output type of the handler.
   * @param {P} pattern - The main pattern.
   * @param {G1} guard1 - The first guard pattern.
   * @param {G2} guard2 - The second guard pattern.
   * @param {G3} guard3 - The third guard pattern.
   * @param {G4} guard4 - The fourth guard pattern.
   * @param {THandler<PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2> & PatternAsType<G3> & PatternAsType<G4>, O> | O} handler - The handler to execute if all patterns match.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
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
  ): TMatchTester<unknown, O>;

  /**
   * Defines a pattern with five guards and a corresponding handler.
   *
   * @template P - The pattern to match against.
   * @template G1 - The first guard pattern.
   * @template G2 - The second guard pattern.
   * @template G3 - The third guard pattern.
   * @template G4 - The fourth guard pattern.
   * @template G5 - The fifth guard pattern.
   * @template O - The output type of the handler.
   * @param {P} pattern - The main pattern.
   * @param {G1} guard1 - The first guard pattern.
   * @param {G2} guard2 - The second guard pattern.
   * @param {G3} guard3 - The third guard pattern.
   * @param {G4} guard4 - The fourth guard pattern.
   * @param {G5} guard5 - The fifth guard pattern.
   * @param {THandler<PatternAsType<P> & PatternAsType<G1> & PatternAsType<G2> & PatternAsType<G3> & PatternAsType<G4> & PatternAsType<G5>, O> | O} handler - The handler to execute if all patterns match.
   * @returns {TMatchTester<unknown, O>} A match tester object.
   */
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
  ): TMatchTester<unknown, O>;

  /**
   * Defines a default handler when no other patterns match.
   *
   * @template Input - The type of the value passed to the handler.
   * @template Output - The output type of the handler.
   * @param {THandler<Input, Output> | Output} handler - The handler to execute. Can be a function or a value.
   * @returns {TMatchTester<Input, Output>} A match tester object.
   */
  export function otherwise<Input, Output>(
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>;

  /**
   * A catamorphism for matching, allowing for recursive data structures.
   *
   * @param {unknown} catas - The catamorphism definition.
   * @returns {unknown} The result of the catamorphism.
   */
  export function cata(catas: unknown): unknown;

  /**
   * A predicate that checks if a value is not `null` or `undefined`.
   */
  export const defined: TPredicate;
  /**
   * A predicate that checks if a value is empty (e.g., empty string, empty array, or empty object).
   */
  export const empty: TPredicate;
  /**
   * A predicate that checks if a value is truthy.
   */
  export const truthy: TPredicate;
  /**
   * A predicate that checks if a value is falsy.
   */
  export const falsy: TPredicate;

  /**
   * A predicate that checks if a number is greater than the specified value.
   *
   * @param {number} greaterThan - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   */
  export function gt(greaterThan: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is less than the specified value.
   *
   * @param {number} lessThan - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   */
  export function lt(lessThan: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is greater than or equal to the specified value.
   *
   * @param {number} greaterThanOrEqualTo - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   */
  export function gte(greaterThanOrEqualTo: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is less than or equal to the specified value.
   *
   * @param {number} lessThanOrEqualTo - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   */
  export function lte(lessThanOrEqualTo: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is within a specified range (inclusive).
   *
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @returns {TPredicateAsserting<number>} A predicate function.
   */
  export function inRange(min: number, max: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a string starts with the specified text.
   *
   * @param {string} text - The text to check for.
   * @returns {TPredicateAsserting<string>} A predicate function.
   */
  export function startsWith(text: string): TPredicateAsserting<string>;

  /**
   * A predicate that checks if a string ends with the specified text.
   *
   * @param {string} text - The text to check for.
   * @returns {TPredicateAsserting<string>} A predicate function.
   */
  export function endsWith(text: string): TPredicateAsserting<string>;

  /**
   * A predicate that checks if a string or array includes the specified content.
   *
   * @param {unknown} content - The content to check for.
   * @returns {TPredicate} A predicate function.
   */
  export function includes(content: unknown): TPredicate;

  /**
   * A predicate that negates the result of another pattern.
   *
   * @param {TPattern} pattern - The pattern to negate.
   * @returns {TPredicate} A predicate function.
   */
  export function not(pattern: TPattern): TPredicate;

  /**
   * A combinator that checks if a value matches all of the specified patterns.
   *
   * @template {readonly TPattern[]} P - A tuple of patterns.
   * @param {...P} these - The patterns to check against.
   * @returns {TPredicateAsserting<IntersectPatternTypes<P>>} A predicate
   *   function.
   */
  export function allOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<IntersectPatternTypes<P>>;

  /**
   * A combinator that checks if a value matches any of the specified patterns.
   *
   * @template {readonly TPattern[]} P - A tuple of patterns.
   * @param {...P} these - The patterns to check against.
   * @returns {TPredicateAsserting<UnionPatternTypes<P>>} A predicate function.
   */
  export function anyOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  /**
   * A combinator that checks if a value matches any of the specified patterns, returning the first match.
   *
   * @template {readonly TPattern[]} P - A tuple of patterns.
   * @param {...P} these - The patterns to check against.
   * @returns {TPredicateAsserting<UnionPatternTypes<P>>} A predicate function.
   */
  export function firstOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  /**
   * A combinator that checks if a value matches any of the specified patterns, returning the last match.
   *
   * @template {readonly TPattern[]} P - A tuple of patterns.
   * @param {...P} these - The patterns to check against.
   * @returns {TPredicateAsserting<UnionPatternTypes<P>>} A predicate function.
   */
  export function lastOf<const P extends readonly TPattern[]>(
    ...these: P
  ): TPredicateAsserting<UnionPatternTypes<P>>;

  /**
   * A predicate that checks if at least one element in an array matches the specified pattern.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to check.
   * @returns {TPredicateAsserting<Array<PatternAsType<P>>>} A predicate function.
   */
  export function some<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;

  /**
   * A predicate that checks if every element in an array matches the specified pattern.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to check.
   * @returns {TPredicateAsserting<Array<PatternAsType<P>>>} A predicate function.
   */
  export function every<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;

  /**
   * A predicate that checks if a value is included in the specified list of values.
   *
   * @template {readonly unknown[]} P - A tuple of values.
   * @param {...P} these - The values to check against.
   * @returns {TPredicateAsserting<P[number]>} A predicate function.
   */
  export function includedIn<const P extends readonly unknown[]>(...these: P): TPredicateAsserting<P[number]>;

  /**
   * A predicate that checks if an object has the specified own properties.
   *
   * @param {...string[]} props - The properties to check for.
   * @returns {TPredicateAsserting<Record<string, unknown>>} A predicate function.
   */
  export function hasOwn(...props: string[]): TPredicateAsserting<Record<string, unknown>>;

  /**
   * A predicate that checks if an object is an instance of the specified constructor.
   *
   * @template T - The type of the instance.
   * @param {new (...args: unknown[]) => T} constructor - The constructor to check against.
   * @returns {TPredicateAsserting<T>} A predicate function.
   */
  export function instanceOf<T>(constructor: new (...args: unknown[]) => T): TPredicateAsserting<T>;

  /**
   * A predicate that plucks a value from an object and applies a predicate to it.
   *
   * @param {TPredicate} [predicate] - An optional predicate to apply to the plucked value.
   * @returns {TPredicate} A predicate function.
   * @remarks The dynamic nature of `pluck()` makes its return value difficult to type statically. The type of the plucked value in the `when()` handler cannot be inferred and will be typed as `unknown`.
   */
  export function pluck(predicate?: TPredicate): TPredicate;

  /**
   * A predicate that checks if a value is an array.
   */
  export const isArray: TPredicateAsserting<unknown[]>;
  /**
   * A predicate that checks if a value is a Date object.
   */
  export const isDate: TPredicateAsserting<Date>;
  /**
   * A predicate that checks if a value is a function.
   */
  export const isFunction: TPredicateAsserting<(...args: unknown[]) => unknown>;
  /**
   * A predicate that checks if a value is a number.
   */
  export const isNumber: TPredicateAsserting<number>;
  /**
   * A predicate that checks if a value is a plain old JavaScript object.
   */
  export const isPojo: TPredicateAsserting<object>;
  /**
   * A predicate that checks if a value is a regular expression.
   */
  export const isRegExp: TPredicateAsserting<RegExp>;
  /**
   * A predicate that checks if a value is a string.
   */
  export const isString: TPredicateAsserting<string>;
  /**
   * A predicate that checks if a value is strictly equal to the pattern.
   */
  export const isStrictly: TPredicate;
  /**
   * A predicate that checks if a value is iterable.
   */
  export const isIterable: TPredicateAsserting<Iterable<unknown>>;

  /**
   * Spreads the properties of an object into the pattern.
   *
   * @param {TPredicate} fn - The predicate to apply to the spread object.
   * @returns {object} An object with the spread properties.
   */
  export function spread(fn: TPredicate): object;
}
