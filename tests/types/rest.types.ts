/**
 * Compile-time tests for rest() / ...rest() handler argument inference.
 * Run: pnpm run test:types
 */
import {
  match,
  when,
  rest,
  isString,
  isNumber,
  pluck,
  otherwise,
} from 'match-iz';
import type { ExpectTrue, Equal, HasBrandLeak } from './expect';

// ---------------------------------------------------------------------------
// Array rest — filtered
// ---------------------------------------------------------------------------

match([1, 2, 'a', 'b'] as (number | string)[])(
  when([1, 2, rest(isString)], (value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, string[]>>;
    type _NoLeak = ExpectTrue<Equal<HasBrandLeak<typeof value>, false>>;
    return restArgs.join(',');
  }),
  otherwise(() => 'no'),
);

// ---------------------------------------------------------------------------
// Array rest — bare
// ---------------------------------------------------------------------------

match([1, true, 'x'] as unknown[])(
  when([1, rest()], (value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, unknown[]>>;
    type _NoLeak = ExpectTrue<Equal<HasBrandLeak<typeof value>, false>>;
    return restArgs.length;
  }),
  otherwise(() => 0),
);

// ---------------------------------------------------------------------------
// Array rest — isNumber filter
// ---------------------------------------------------------------------------

match([1, 2, 3] as number[])(
  when([1, rest(isNumber)], (_value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, number[]>>;
    return restArgs;
  }),
  otherwise(() => [] as number[]),
);

// ---------------------------------------------------------------------------
// Object rest — filtered via spread
// ---------------------------------------------------------------------------

match({ a: 1, b: 'x', c: 'y' })(
  when({ a: 1, ...rest(isString) }, (value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, Record<string, string>>>;
    type _NoLeak = ExpectTrue<Equal<HasBrandLeak<typeof value>, false>>;
    return JSON.stringify(restArgs);
  }),
  otherwise(() => 'no'),
);

// ---------------------------------------------------------------------------
// Object rest — bare via spread
// ---------------------------------------------------------------------------

match({ a: 1, b: 2, c: 3 })(
  when({ a: 1, ...rest() }, (value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, Record<string, unknown>>>;
    type _NoLeak = ExpectTrue<Equal<HasBrandLeak<typeof value>, false>>;
    return restArgs;
  }),
  otherwise(() => undefined),
);

// ---------------------------------------------------------------------------
// Curried when
// ---------------------------------------------------------------------------

match([1, 'a', 'b'] as (number | string)[])(
  when([1, rest(isString)])((value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, string[]>>;
    type _NoLeak = ExpectTrue<Equal<HasBrandLeak<typeof value>, false>>;
    return restArgs;
  }),
  otherwise(() => [] as string[]),
);

// ---------------------------------------------------------------------------
// Guard overload still narrows rest from the primary pattern
// ---------------------------------------------------------------------------

match([1, 2, 3, 4] as number[])(
  when([1, rest(isNumber)], isNumber, (_value, restArgs) => {
    type _Rest = ExpectTrue<Equal<typeof restArgs, number[]>>;
    return restArgs;
  }),
  otherwise(() => [] as number[]),
);

// ---------------------------------------------------------------------------
// No rest in pattern → wide TRestResult on second arg
// ---------------------------------------------------------------------------

match(42)(
  when(isNumber, (value, restArgs) => {
    type _Value = ExpectTrue<Equal<typeof value, number>>;
    // Second arg falls back to the wide union when rest() is absent
    type _Rest = ExpectTrue<
      Equal<
        typeof restArgs,
        unknown[] | Record<string, unknown> | undefined
      >
    >;
    return value;
  }),
  otherwise(() => 0),
);

// ---------------------------------------------------------------------------
// pluck still rewrites the first handler argument
// ---------------------------------------------------------------------------

match({ foo: 'hi' })(
  when({ foo: pluck(isString) }, s => {
    type _Plucked = ExpectTrue<Equal<typeof s, string>>;
    return s;
  }),
  otherwise(() => ''),
);
