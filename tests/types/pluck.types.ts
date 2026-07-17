/**
 * Compile-time tests for pluck() rewriting the first when-handler argument.
 * Run: pnpm run test:types
 */
import { match, when, pluck, isString, isNumber, otherwise } from 'match-iz';
import type { ExpectTrue, Equal, HasBrandLeak } from './expect';

// ---------------------------------------------------------------------------
// Object property pluck → first arg is the plucked type
// ---------------------------------------------------------------------------

match({ one: 'hi' })(
  when({ one: pluck(isString) }, (s, restArgs) => {
    type _First = ExpectTrue<Equal<typeof s, string>>;
    type _NoBrand = ExpectTrue<Equal<HasBrandLeak<typeof s>, false>>;
    // No rest() in pattern → wide fallback on 2nd arg
    type _Rest = ExpectTrue<
      Equal<
        typeof restArgs,
        unknown[] | Record<string, unknown> | undefined
      >
    >;
    return s;
  }),
  otherwise(() => ''),
);

// ---------------------------------------------------------------------------
// Nested pluck
// ---------------------------------------------------------------------------

match({ outer: { inner: 42 } })(
  when({ outer: { inner: pluck(isNumber) } }, n => {
    type _First = ExpectTrue<Equal<typeof n, number>>;
    type _NoBrand = ExpectTrue<Equal<HasBrandLeak<typeof n>, false>>;
    return n;
  }),
  otherwise(() => 0),
);

// ---------------------------------------------------------------------------
// Curried when + pluck
// ---------------------------------------------------------------------------

match({ foo: 'bar' })(
  when({ foo: pluck(isString) })(s => {
    type _First = ExpectTrue<Equal<typeof s, string>>;
    return s.toUpperCase();
  }),
  otherwise(() => ''),
);

// ---------------------------------------------------------------------------
// Example from docs / user report
// ---------------------------------------------------------------------------

match({ one: 'hello' })(
  when({ one: pluck(isString) }, s => {
    type _First = ExpectTrue<Equal<typeof s, string>>;
    return s;
  }),
  otherwise(() => ''),
);
