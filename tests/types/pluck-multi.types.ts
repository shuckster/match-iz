/**
 * Compile-time tests: multi-guard when() + pluck (and public type exports).
 * Run: pnpm run test:types
 */
import {
  match,
  when,
  pluck,
  isString,
  isNumber,
  gt,
  otherwise
} from 'match-iz';
import type {
  ExtractPlucked,
  PatternHandlerInput,
  PatternHandlerInputFromAll,
  PatternAsType,
  Plucked
} from 'match-iz';
import type { ExpectTrue, Equal, HasBrandLeak } from './expect';

// ---------------------------------------------------------------------------
// Public exports usable by downstream packages
// ---------------------------------------------------------------------------

type _ExportPlucked = ExpectTrue<
  Equal<Plucked<number>, Plucked<number>>
>;
type _ExportExtract = ExpectTrue<
  Equal<ExtractPlucked<{ age: Plucked<number> }>, number>
>;
type _ExportHandlerInput = ExpectTrue<
  Equal<
    PatternHandlerInput<{ age: Plucked<number> }>,
    number
  >
>;
type _ExportFromAllPluck = ExpectTrue<
  Equal<
    PatternHandlerInputFromAll<
      readonly [{ one: Plucked<string> }, { two: number }]
    >,
    string
  >
>;
type _ExportFromAllNoPluck = ExpectTrue<
  Equal<
    PatternHandlerInputFromAll<
      readonly [{ one: string }, { two: number }]
    >,
    { one: string } & { two: number }
  >
>;

// ---------------------------------------------------------------------------
// Multi-guard with pluck in primary → first arg is plucked payload
// ---------------------------------------------------------------------------

match({ one: 'hi', two: 1 })(
  when({ one: pluck(isString) }, { two: isNumber }, s => {
    type _First = ExpectTrue<Equal<typeof s, string>>;
    type _NoBrand = ExpectTrue<Equal<HasBrandLeak<typeof s>, false>>;
    return s.toUpperCase();
  }),
  otherwise(() => ''),
);

// ---------------------------------------------------------------------------
// Multi-guard with pluck + type-guard style second pattern
// ---------------------------------------------------------------------------

match({ age: 36, active: true })(
  when({ age: pluck(isNumber) }, { active: true }, n => {
    type _First = ExpectTrue<Equal<typeof n, number>>;
    return n + 1;
  }),
  otherwise(() => 0),
);

// ---------------------------------------------------------------------------
// Multi-guard without pluck → intersected PatternAsType (assignable to shape)
// ---------------------------------------------------------------------------

match({ one: 'hi', two: 1 })(
  when({ one: isString }, { two: isNumber }, obj => {
    // Intersection of pattern shapes (not necessarily a single object type)
    const one: string = obj.one;
    const two: number = obj.two;
    type _NoBrand = ExpectTrue<Equal<HasBrandLeak<typeof obj>, false>>;
    return `${one}:${two}`;
  }),
  otherwise(() => ''),
);

// ---------------------------------------------------------------------------
// Classic multi-guard (isNumber + gt) still types the value as number
// ---------------------------------------------------------------------------

match(25 as number)(
  when(isNumber, gt(18), a => {
    type _First = ExpectTrue<Equal<typeof a, number>>;
    return `Adult: ${a}`;
  }),
  otherwise(() => 'Minor'),
);

// ---------------------------------------------------------------------------
// Nested pluck under multi-guard
// ---------------------------------------------------------------------------

match({ outer: { inner: 42 }, tag: 'x' })(
  when({ outer: { inner: pluck(isNumber) } }, { tag: isString }, n => {
    type _First = ExpectTrue<Equal<typeof n, number>>;
    return n;
  }),
  otherwise(() => 0),
);

// ---------------------------------------------------------------------------
// Three-pattern when with pluck
// ---------------------------------------------------------------------------

match({ a: 'x', b: 1, c: true })(
  when(
    { a: pluck(isString) },
    { b: isNumber },
    { c: true as const },
    s => {
      type _First = ExpectTrue<Equal<typeof s, string>>;
      return s;
    }
  ),
  otherwise(() => ''),
);

// Silence unused-type warnings under noUnusedLocals if enabled
type _Keep = [
  _ExportPlucked,
  _ExportExtract,
  _ExportHandlerInput,
  _ExportFromAllPluck,
  _ExportFromAllNoPluck
];
