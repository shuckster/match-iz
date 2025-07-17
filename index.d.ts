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

import type { TPredicate, TPredicateAsserting } from './dates/types'
export type TPattern<Input> = Input | TPredicate<Input>;
/**
 * The type of the value captured by the `rest()` pattern matcher.
 * It can be an array of values, an object with string keys and values, or undefined.
 */
export type TRestResult = unknown[] | Record<string, unknown> | undefined;

export type THandler<Input, Output> = (
  value: Input,
  rest: TRestResult
) => Output;

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
   * The default limit is 20,000.
   *
   * @returns {TIterationLimit} The current iteration limit.
   */
  export function getIterationLimit(): TIterationLimit;

  /**
   * Sets a new iteration limit for recursive patterns.
   *
   * The default limit is 20,000.
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
   * import { against, when, otherwise } from 'match-iz';
   *
   * const isSuccess = against(
   *   when({ statusCode: 200 }, ({ body }) => body),
   *   otherwise(() => null)
   * );
   *
   * const result = isSuccess({
   *   statusCode: 200,
   *   body: 'Success!' 
   * }); // 'Success!'
   *
   * @example
   * import { against, when, isNumber, gt, otherwise } from 'match-iz';
   *
   * const categorizeNumber = against(
   *   when(isNumber, (num) => {
   *     if (num > 0) return 'Positive';
   *     if (num < 0) return 'Negative';
   *     return 'Zero';
   *   }),
   *   otherwise(() => 'Not a number')
   * );
   *
   * categorizeNumber(5);    // 'Positive'
   * categorizeNumber(-3);   // 'Negative'
   * categorizeNumber(0);    // 'Zero'
   * categorizeNumber('abc'); // 'Not a number'
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
   * import { match, when, otherwise } from 'match-iz';
   *
   * const response = { statusCode: 200, body: 'Success!' };
   *
   * const result = match(response)(
   *   when({ statusCode: 200 }, ({ body }) => body),
   *   when({ statusCode: 404 }, () => 'Not Found'),
   *   otherwise(() => 'Error')
   * ); // 'Success!'
   *
   * @example
   * import { match, when, isString, isNumber, otherwise } from 'match-iz';
   *
   * const processInput = (input) => match(input)(
   *   when(isString, (str) => `String: ${str.toUpperCase()}`),
   *   when(isNumber, (num) => `Number: ${num * 2}`),
   *   otherwise(() => 'Unknown type')
   * );
   *
   * processInput('hello'); // 'String: HELLO'
   * processInput(10);      // 'Number: 20'
   * processInput(true);    // 'Unknown type'
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
   * @example
   * import { match, when, otherwise } from 'match-iz';
   *
   * const result = match(10)(
   *   when(10, 'Ten'),
   *   otherwise('Not Ten')
   * ); // 'Ten'
   *
   * @example
   * import { match, when, isString, otherwise } from 'match-iz';
   *
   * const greet = (name) => match(name)(
   *   // Handler can be a function
   *   when(isString, (n) => `Hello, ${n}!`), 
   *   otherwise('Hello, stranger!')
   * );
   * greet('Alice'); // 'Hello, Alice!'
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
   * @example
   * import { match, when, isNumber, otherwise } from 'match-iz';
   *
   * const checkValue = match(5)(
   *   // Curried usage
   *   when(isNumber)((num) => `The number is ${num}`), 
   *   otherwise(() => 'Not a number')
   * );
   *
   * checkValue; // 'The number is 5'
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
   * @example
   * import { match, when, isNumber, gt, otherwise } from 'match-iz';
   *
   * const checkAge = (age) => match(age)(
   *   when(isNumber, gt(18), (a) => `Adult: ${a}`),
   *   otherwise(() => 'Minor')
   * );
   *
   * checkAge(25); // 'Adult: 25'
   * checkAge(16); // 'Minor'
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
   * @example
   * import { match, when, isString, startsWith, endsWith, otherwise } from 'match-iz';
   *
   * const checkWord = (word) => match(word)(
   *   when(isString, startsWith('pre'), endsWith('fix'), (w) => `Prefix-Suffix: ${w}`),
   *   otherwise(() => 'No match')
   * );
   *
   * checkWord('prefix'); // 'Prefix-Suffix: prefix'
   * checkWord('suffix'); // 'No match'
   */
  export function when<P, G1, G2, O>(
    pattern: P,
    guard1: G1,
    guard2: G2,
    handler: THandler<
      PatternAsType<P> &
        PatternAsType<G1> &
        PatternAsType<G2>,
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
   * @example
   * import { match, when, otherwise } from 'match-iz';
   *
   * const getValue = (input) => match(input)(
   *   when(1, 'One'),
   *   when(2, 'Two'),
   *   otherwise('Other') // Default case
   * );
   *
   * getValue(3); // 'Other'
   */
  export function otherwise<Input, Output>(
    handler: THandler<Input, Output> | Output
  ): TMatchTester<Input, Output>;

  /**
   * A catamorphism for matching, allowing for recursive data structures.
   *
   * @param {unknown} catas - The catamorphism definition.
   * @returns {unknown} The result of the catamorphism.
   * @example
   * // This is a more advanced feature and typically used for recursive data structures.
   * // For a full example, refer to the match-iz documentation or tests.
   * import { cata, when, otherwise } from 'match-iz';
   *
   * const List = cata({
   *   getValue: (list) => list.value,
   *   Empty: (list) => !list.value && !list.next,
   *   Node: (list) => list.value && list.next,
   * });
   *
   * const sumList = (list) => match(list)(
   *   List.Empty(() => 0),
   *   List.Node((value, next) => value + sumList(next)),
   *   otherwise(() => {
   *     throw new Error('Invalid list structure');
   *   })
   * );
   *
   * const mylist = { value: 1, next: { value: 2, next: { value: 3, next: {} } } };
   * sumList(mylist); // 6
   */
  export function cata(catas: unknown): unknown;

  /**
   * A predicate that checks if a value is not `null` or `undefined`.
   * @example
   * import { match, when, defined, otherwise } from 'match-iz';
   *
   * const checkDefined = (value) => match(value)(
   *   when(defined, () => 'Value is defined'),
   *   otherwise(() => 'Value is undefined or null')
   * );
   *
   * checkDefined(10);    // 'Value is defined'
   * checkDefined(null);  // 'Value is undefined or null'
   * checkDefined(undefined); // 'Value is undefined or null'
   */
  export const defined: TPredicate;

  /**
   * A predicate that checks if a value is empty (e.g., empty string, empty array, or empty object).
   * @example
   * import { match, when, empty, otherwise } from 'match-iz';
   *
   * const checkEmpty = (value) => match(value)(
   *   when(empty, () => 'Value is empty'),
   *   otherwise(() => 'Value is not empty')
   * );
   *
   * checkEmpty('');       // 'Value is empty'
   * checkEmpty([]);      // 'Value is empty'
   * checkEmpty({});      // 'Value is empty'
   * checkEmpty('hello'); // 'Value is not empty'
   */
  export const empty: TPredicate;

  /**
   * A predicate that checks if a value is truthy.
   * @example
   * import { match, when, truthy, otherwise } from 'match-iz';
   *
   * const checkTruthy = (value) => match(value)(
   *   when(truthy, () => 'Value is truthy'),
   *   otherwise(() => 'Value is falsy')
   * );
   *
   * checkTruthy(true);   // 'Value is truthy'
   * checkTruthy(1);      // 'Value is truthy'
   * checkTruthy('abc');  // 'Value is truthy'
   * checkTruthy(false);  // 'Value is falsy'
   * checkTruthy(0);      // 'Value is falsy'
   * checkTruthy('');      // 'Value is falsy'
   */
  export const truthy: TPredicate;

  /**
   * A predicate that checks if a value is falsy.
   * @example
   * import { match, when, falsy, otherwise } from 'match-iz';
   *
   * const checkFalsy = (value) => match(value)(
   *   when(falsy, () => 'Value is falsy'),
   *   otherwise(() => 'Value is truthy')
   * );
   *
   * checkFalsy(false); // 'Value is falsy'
   * checkFalsy(null);  // 'Value is falsy'
   * checkFalsy(1);     // 'Value is truthy'
   */
  export const falsy: TPredicate;

  /**
   * A predicate that checks if a number is greater than the specified value.
   *
   * @param {number} greaterThan - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   * @example
   * import { match, when, gt, otherwise } from 'match-iz';
   *
   * const checkScore = (score) => match(score)(
   *   when(gt(90), () => 'Excellent!'),
   *   otherwise(() => 'Good.')
   * );
   *
   * checkScore(95); // 'Excellent!'
   * checkScore(80); // 'Good.'
   */
  export function gt(greaterThan: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is less than the specified value.
   *
   * @param {number} lessThan - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   * @example
   * import { match, when, lt, otherwise } from 'match-iz';
   *
   * const checkTemperature = (temp) => match(temp)(
   *   when(lt(0), () => 'Freezing!'),
   *   otherwise(() => 'Above freezing.')
   * );
   *
   * checkTemperature(-5); // 'Freezing!'
   * checkTemperature(5);  // 'Above freezing.'
   */
  export function lt(lessThan: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is greater than or equal to the specified value.
   *
   * @param {number} greaterThanOrEqualTo - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   * @example
   * import { match, when, gte, otherwise } from 'match-iz';
   *
   * const checkMinAge = (age) => match(age)(
   *   when(gte(18), () => 'Eligible'),
   *   otherwise(() => 'Not eligible')
   * );
   *
   * checkMinAge(18); // 'Eligible'
   * checkMinAge(17); // 'Not eligible'
   */
  export function gte(greaterThanOrEqualTo: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is less than or equal to the specified value.
   *
   * @param {number} lessThanOrEqualTo - The value to compare against.
   * @returns {TPredicateAsserting<number>} A predicate function.
   * @example
   * import { match, when, lte, otherwise } from 'match-iz';
   *
   * const checkMaxItems = (count) => match(count)(
   *   when(lte(5), () => 'Within limit'),
   *   otherwise(() => 'Exceeds limit')
   * );
   *
   * checkMaxItems(5); // 'Within limit'
   * checkMaxItems(6); // 'Exceeds limit'
   */
  export function lte(lessThanOrEqualTo: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a number is within a specified range (inclusive).
   *
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @returns {TPredicateAsserting<number>} A predicate function.
   * @example
   * import { match, when, inRange, otherwise } from 'match-iz';
   *
   * const checkGrade = (grade) => match(grade)(
   *   when(inRange(90, 100), () => 'A'),
   *   when(inRange(80, 89), () => 'B'),
   *   otherwise(() => 'C or lower')
   * );
   *
   * checkGrade(92); // 'A'
   * checkGrade(85); // 'B'
   * checkGrade(70); // 'C or lower'
   */
  export function inRange(min: number, max: number): TPredicateAsserting<number>;

  /**
   * A predicate that checks if a string starts with the specified text.
   *
   * @param {string} text - The text to check for.
   * @returns {TPredicateAsserting<string>} A predicate function.
   * @example
   * import { match, when, startsWith, otherwise } from 'match-iz';
   *
   * const checkPrefix = (str) => match(str)(
   *   when(startsWith('http'), () => 'Web URL'),
   *   otherwise(() => 'Other string')
   * );
   *
   * checkPrefix('https://example.com'); // 'Web URL'
   * checkPrefix('ftp://example.com');   // 'Other string'
   */
  export function startsWith(text: string): TPredicateAsserting<string>;

  /**
   * A predicate that checks if a string ends with the specified text.
   *
   * @param {string} text - The text to check for.
   * @returns {TPredicateAsserting<string>} A predicate function.
   * @example
   * import { match, when, endsWith, otherwise } from 'match-iz';
   *
   * const checkSuffix = (str) => match(str)(
   *   when(endsWith('.jpg'), () => 'JPEG image'),
   *   otherwise(() => 'Other file type')
   * );
   *
   * checkSuffix('photo.jpg'); // 'JPEG image'
   * checkSuffix('document.pdf'); // 'Other file type'
   */
  export function endsWith(text: string): TPredicateAsserting<string>;

  /**
   * A predicate that checks if a string or array includes the specified content.
   *
   * @param {unknown} content - The content to check for.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, includes, otherwise } from 'match-iz';
   *
   * const checkContent = (data) => match(data)(
   *   when(includes('apple'), () => 'Contains apple'),
   *   otherwise(() => 'Does not contain apple')
   * );
   *
   * checkContent('red apple');    // 'Contains apple'
   * checkContent(['banana', 'apple']); // 'Contains apple'
   * checkContent('orange');      // 'Does not contain apple'
   */
  export function includes(content: unknown): TPredicate;

  /**
   * A predicate that checks if a value is equal to the pattern. It differs
   * from the default pattern matching by requiring the value to have the
   * same number of properties (for objects) or elements (for arrays) as
   * the pattern.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to check for equality against.
   * @returns {TPredicateAsserting<PatternAsType<P>>} A predicate function.
   * @example
   * import { match, when, eq, otherwise } from 'match-iz';
   *
   * const matchValue = (value) => match(value)(
   *   when(eq({ a: 1 }), () => 'Matches { a: 1 }'),
   *   otherwise(() => 'No match')
   * );
   *
   * matchValue({ a: 1 }); // 'Matches { a: 1 }'
   * matchValue({ a: 1, b: 2 }); // 'No match'
   */
  export function eq<P>(pattern: P): TPredicateAsserting<PatternAsType<P>>;

  /**
   * A predicate that checks for deep value equality, recursively applying
   * `eq` to nested objects.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to check for deep equality against.
   * @returns {TPredicateAsserting<PatternAsType<P>>} A predicate function.
   * @example
   * import { match, when, deepEq, otherwise } from 'match-iz';
   *
   * const matchValue = (value) => match(value)(
   *   when(deepEq({ a: { b: 2 } }), () => 'Matches { a: { b: 2 } }'),
   *   otherwise(() => 'No match')
   * );
   *
   * matchValue({ a: { b: 2 } }); // 'Matches { a: { b: 2 } }'
   * matchValue({ a: { b: 2, c: 3 } }); // 'No match'
   */
  export function deepEq<P>(pattern: P): TPredicateAsserting<PatternAsType<P>>;

  /**
   * A predicate that negates the result of another pattern.
   *
   * @param {TPattern} pattern - The pattern to negate.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, not, isString, otherwise } from 'match-iz';
   *
   * const checkNotString = (value) => match(value)(
   *   when(not(isString), () => 'Not a string'),
   *   otherwise(() => 'Is a string')
   * );
   *
   * checkNotString(123);    // 'Not a string'
   * checkNotString('test'); // 'Is a string'
   */
  export function not(pattern: TPattern): TPredicate;

  /**
   * A combinator that checks if a value matches all of the specified patterns.
   *
   * @template {readonly TPattern[]} P - A tuple of patterns.
   * @param {...P} these - The patterns to check against.
   * @returns {TPredicateAsserting<IntersectPatternTypes<P>>} A predicate
   *   function.
   * @example
   * import { match, when, allOf, isNumber, gt, lt, otherwise } from 'match-iz';
   *
   * const checkRange = (num) => match(num)(
   *   when(allOf(isNumber, gt(5), lt(10)), () => 'Number between 5 and 10'),
   *   otherwise(() => 'Out of range')
   * );
   *
   * checkRange(7);  // 'Number between 5 and 10'
   * checkRange(3);  // 'Out of range'
   * checkRange(12); // 'Out of range'
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
   * @example
   * import { match, when, anyOf, isString, isNumber, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(anyOf(isString, isNumber), () => 'String or Number'),
   *   otherwise(() => 'Other type')
   * );
   *
   * checkType('hello'); // 'String or Number'
   * checkType(123);    // 'String or Number'
   * checkType(true);   // 'Other type'
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
   * @example
   * import { match, when, firstOf, otherwise } from 'match-iz';
   *
   * const processArray = (arr) => match(arr)(
   *   when(firstOf(1, 2), () => 'Starts with 1 or 2'),
   *   otherwise(() => 'Does not start with 1 or 2')
   * );
   *
   * processArray([1, 2, 3]); // 'Starts with 1 or 2'
   * processArray([2, 3, 4]); // 'Starts with 1 or 2'
   * processArray([3, 4, 5]); // 'Does not start with 1 or 2'
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
   * @example
   * import { match, when, lastOf, otherwise } from 'match-iz';
   *
   * const processArray = (arr) => match(arr)(
   *   when(lastOf(3, 4), () => 'Ends with 3 or 4'),
   *   otherwise(() => 'Does not end with 3 or 4')
   * );
   *
   * processArray([1, 2, 3]); // 'Ends with 3 or 4'
   * processArray([2, 3, 4]); // 'Ends with 3 or 4'
   * processArray([4, 5, 6]); // 'Does not end with 3 or 4'
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
   * @example
   * import { match, when, some, gt, otherwise } from 'match-iz';
   *
   * const checkPositive = (arr) => match(arr)(
   *   when(some(gt(0)), () => 'Contains at least one positive number'),
   *   otherwise(() => 'No positive numbers')
   * );
   *
   * checkPositive([-1, 0, 5]); // 'Contains at least one positive number'
   * checkPositive([-2, -1, 0]); // 'No positive numbers'
   */
  export function some<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;

  /**
   * A predicate that checks if every element in an array matches the specified pattern.
   *
   * @template P - The pattern to match against.
   * @param {P} pattern - The pattern to check.
   * @returns {TPredicateAsserting<Array<PatternAsType<P>>>} A predicate function.
   * @example
   * import { match, when, every, isNumber, otherwise } from 'match-iz';
   *
   * const checkAllNumbers = (arr) => match(arr)(
   *   when(every(isNumber), () => 'All elements are numbers'),
   *   otherwise(() => 'Not all elements are numbers')
   * );
   *
   * checkAllNumbers([1, 2, 3]);    // 'All elements are numbers'
   * checkAllNumbers([1, 'a', 3]); // 'Not all elements are numbers'
   */
  export function every<P>(pattern: P): TPredicateAsserting<Array<PatternAsType<P>>>;

  /**
   * A predicate that checks if a value is included in the specified list of values.
   *
   * @template {readonly unknown[]} P - A tuple of values.
   * @param {...P} these - The values to check against.
   * @returns {TPredicateAsserting<P[number]>} A predicate function.
   * @example
   * import { match, when, includedIn, otherwise } from 'match-iz';
   *
   * const checkColor = (color) => match(color)(
   *   when(includedIn('red', 'green', 'blue'), () => 'Primary color'),
   *   otherwise(() => 'Other color')
   * );
   *
   * checkColor('red');    // 'Primary color'
   * checkColor('yellow'); // 'Other color'
   */
  export function includedIn<const P extends readonly unknown[]>(...these: P): TPredicateAsserting<P[number]>;

  /**
   * A predicate that checks if an object has the specified own properties.
   *
   * @param {...string[]} props - The properties to check for.
   * @returns {TPredicateAsserting<Record<string, unknown>>} A predicate function.
   * @example
   * import { match, when, hasOwn, otherwise } from 'match-iz';
   *
   * const checkUser = (user) => match(user)(
   *   when(hasOwn('name', 'email'), () => 'Valid user object'),
   *   otherwise(() => 'Invalid user object')
   * );
   *
   * checkUser({ name: 'Alice', email: 'a@example.com' }); // 'Valid user object'
   * checkUser({ name: 'Bob' }); // 'Invalid user object'
   */
  export function hasOwn(...props: string[]): TPredicateAsserting<Record<string, unknown>>;

  /**
   * A predicate that checks if an object is an instance of the specified constructor.
   *
   * @template T - The type of the instance.
   * @param {new (...args: unknown[]) => T} constructor - The constructor to check against.
   * @returns {TPredicateAsserting<T>} A predicate function.
   * @example
   * import { match, when, instanceOf, otherwise } from 'match-iz';
   *
   * class MyClass {}
   * const checkInstance = (obj) => match(obj)(
   *   when(instanceOf(MyClass), () => 'Is MyClass instance'),
   *   otherwise(() => 'Not MyClass instance')
   * );
   *
   * checkInstance(new MyClass()); // 'Is MyClass instance'
   * checkInstance({});          // 'Not MyClass instance'
   */
  export function instanceOf<T>(constructor: new (...args: unknown[]) => T): TPredicateAsserting<T>;

  /**
   * A predicate that plucks a value from a pattern, optionally taking a pattern itself.
   *
   * @param {TPredicate} [predicate] - An optional predicate to apply to the plucked value.
   * @returns {TPredicate} A predicate function.
   * @remarks The dynamic nature of `pluck()` makes its return value difficult to type statically. The type of the plucked value in the `when()` handler cannot be inferred and will be typed as `unknown`.
   * @example
   * import { match, when, pluck, gt, otherwise } from 'match-iz';
   *
   * const checkUserAge = (user) => match(user)(
   *   when({ age: pluck(gt(18)) }, (age) => `User is an adult: ${age}`),
   *   otherwise(() => 'User is a minor')
   * );
   * checkUserAge({ name: 'Alice', age: 25 }); // 'User is an adult: 25'
   * checkUserAge({ name: 'Bob', age: 16 });   // 'User is a minor'
   *
   * @example
   * import { match, when, pluck, otherwise } from 'match-iz';
   *
   * const getStatus = (data) => match(data)(
   *   when({ status: pluck() }, (status) => `Status: ${status}`),
   *   otherwise(() => 'No status')
   * );
   *
   * getStatus({ status: 'active' }); // 'Status: active'
   * getStatus({});                  // 'No status'
   */
  export function pluck(predicate?: TPredicate): TPredicate;

  /**
   * Captures the remaining elements of an array or properties of an object.
   *
   * @param {TPattern} [pattern] - An optional pattern that the remaining items must match.
   * @returns {object} A special object to be used inside array or object patterns.
   * @remarks When used in an array pattern, `rest()` should typically be the last element to capture the remaining elements. When used in an object pattern, it should be spread (`...rest()`) to capture remaining properties. The captured values are passed as the second argument to the handler, and their type will be `TRestResult`. You can use a type assertion in the handler if you have more specific knowledge about the shape of the rest value.
   * @example
   * // Array rest
   * import { match, when, rest, otherwise } from 'match-iz';
   *
   * const processArray = (arr) => match(arr)(
   *   when([1, 2, rest()], (value, rest) => `Rest: ${(rest as number[]).join(',')}`),
   *   otherwise(() => 'No match')
   * );
   *
   * processArray([1, 2, 3, 4]); // 'Rest: 3,4'
   *
   * @example
   * // Object rest
   * import { match, when, rest, otherwise } from 'match-iz';
   *
   * const processObject = (obj) => match(obj)(
   *   when({ a: 1, ...rest() }, (value, rest) => `Rest: ${JSON.stringify(rest)}`),
   *   otherwise(() => 'No match')
   * );
   *
   * processObject({ a: 1, b: 2, c: 3 }); // 'Rest: {"b":2,"c":3}'
   */
  export function rest(pattern?: TPattern): object;

  /**
   * A predicate that checks if a value is an array.
   * @example
   * import { match, when, isArray, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isArray, () => 'Is an array'),
   *   otherwise(() => 'Not an array')
   * );
   *
   * checkType([1, 2, 3]); // 'Is an array'
   * checkType('abc');     // 'Not an array'
   */
  export const isArray: TPredicateAsserting<unknown[]>;

  /**
   * A predicate that checks if a value is a Date object.
   * @example
   * import { match, when, isDate, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isDate, () => 'Is a Date object'),
   *   otherwise(() => 'Not a Date object')
   * );
   *
   * checkType(new Date()); // 'Is a Date object'
   * checkType('2025-01-01'); // 'Not a Date object'
   */
  export const isDate: TPredicateAsserting<Date>;

  /**
   * A predicate that checks if a value is a function.
   * @example
   * import { match, when, isFunction, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isFunction, () => 'Is a function'),
   *   otherwise(() => 'Not a function')
   * );
   *
   * checkType(() => {}); // 'Is a function'
   * checkType(123);     // 'Not a function'
   */
  export const isFunction: TPredicateAsserting<(...args: unknown[]) => unknown>;

  /**
   * A predicate that checks if a value is a number.
   * @example
   * import { match, when, isNumber, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isNumber, () => 'Is a number'),
   *   otherwise(() => 'Not a number')
   * );
   *
   * checkType(123);    // 'Is a number'
   * checkType('123');  // 'Not a number'
   */
  export const isNumber: TPredicateAsserting<number>;

  /**
   * A predicate that checks if a value is a plain old JavaScript object.
   * @example
   * import { match, when, isPojo, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isPojo, () => 'Is a POJO'),
   *   otherwise(() => 'Not a POJO')
   * );
   *
   * checkType({});            // 'Is a POJO'
   * checkType(new Date());    // 'Not a POJO'
   * checkType([]);            // 'Not a POJO'
   */
  export const isPojo: TPredicateAsserting<object>;

  /**
   * A predicate that checks if a value is a regular expression.
   * @example
   * import { match, when, isRegExp, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isRegExp, () => 'Is a RegExp'),
   *   otherwise(() => 'Not a RegExp')
   * );
   *
   * checkType(/abc/); // 'Is a RegExp'
   * checkType('abc'); // 'Not a RegExp'
   */
  export const isRegExp: TPredicateAsserting<RegExp>;

  /**
   * A predicate that checks if a value is a string.
   * @example
   * import { match, when, isString, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isString, () => 'Is a string'),
   *   otherwise(() => 'Not a string')
   * );
   *
   * checkType('hello'); // 'Is a string'
   * checkType(123);    // 'Not a string'
   */
  export const isString: TPredicateAsserting<string>;

  /**
   * A predicate that checks if a value is strictly equal to the pattern.
   * @example
   * import { match, when, isStrictly, otherwise } from 'match-iz';
   *
   * const checkValue = (value) => match(value)(
   *   when(isStrictly(5), () => 'Is strictly 5'),
   *   otherwise(() => 'Not strictly 5')
   * );
   *
   * checkValue(5);  // 'Is strictly 5'
   * checkValue('5'); // 'Not strictly 5'
   */
  export const isStrictly: TPredicate;

  /**
   * A predicate that checks if a value is iterable.
   * @example
   * import { match, when, isIterable, otherwise } from 'match-iz';
   *
   * const checkType = (value) => match(value)(
   *   when(isIterable, () => 'Is iterable'),
   *   otherwise(() => 'Not iterable')
   * );
   *
   * checkType([1, 2, 3]); // 'Is iterable'
   * checkType('hello');   // 'Is iterable'
   * checkType({});      // 'Not iterable'
   */
  export const isIterable: TPredicateAsserting<Iterable<unknown>>;

  /**
   * Spreads the properties of an object into the pattern.
   *
   * @param {TPredicate} fn - The predicate to apply to the spread object.
   * @returns {object} An object with the spread properties.
   * @example
   * import { match, when, spread, isNumber, otherwise } from 'match-iz';
   *
   * const processObject = (obj) => match(obj)(
   *   when({ a: spread(isNumber), b: 2 }, ({ a, b }) => `a: ${a}, b: ${b}`),
   *   otherwise(() => 'No match')
   * );
   * processObject({ a: 1, b: 2, c: 3 }); // 'a: 1, b: 2'
   * processObject({ a: 'x', b: 2 });     // 'No match'
   *
   * @example
   * import { match, when, spread, gt, otherwise } from 'match-iz';
   *
   * const checkValues = (obj) => match(obj)(
   *   when({ x: spread(gt(10)), y: spread(gt(20)) }, ({ x, y }) => `x: ${x}, y: ${y}`),
   *   otherwise(() => 'Values not large enough')
   * );
   * checkValues({ x: 15, y: 25 }); // 'x: 15, y: 25'
   * checkValues({ x: 5, y: 25 });  // 'Values not large enough'
   */
  export function spread(fn: TPredicate): object;
}
