// common.d.ts
export type TPredicate<Input> = (value: Input) => boolean;
export type TPredicateAsserting<Kind> = (value: unknown) => value is Kind;

// New: a unique symbol brand and wrapper for “plucked” values
export declare const pluckBrand: unique symbol;
export type Plucked<T> = { [pluckBrand]: T };

// A unique symbol brand and wrapper for the value captured by `rest()`.
// `rest(pattern)` carries `pattern` at the type-level so handlers can infer
// the type of their second argument.
export declare const restBrand: unique symbol;
export type Rest<T> = { [restBrand]: T };

// Distinct markers so the extractor can remember whether a `rest()` brand was
// found inside an array pattern or an object pattern. The wrapped `T` is the
// original *pattern* supplied to `rest()`; `PatternAsType` is applied later in
// index.d.ts (which owns that type).
export type RestFromArray<T> = { __restKind: 'array'; pattern: T };
export type RestFromObject<T> = { __restKind: 'object'; pattern: T };

// Walks a pattern looking for a `Rest<…>` brand, remembering the container it
// was found in. Resolves to `never` if no `rest()` is present.
export type ExtractRest<P> =
  P extends Rest<infer U>
    ? RestFromObject<U>
    : P extends readonly (infer E)[]
    ? PromoteToArray<ExtractRest<E>>
    : P extends object
    ? { [K in keyof P]: ExtractRest<P[K]> }[keyof P]
    : never;

// A `rest()` inside an array yields `RestFromObject` from the base case;
// promote it to `RestFromArray` so the array container wins. Nested objects
// inside arrays keep their object tag.
type PromoteToArray<R> = R extends RestFromObject<infer U>
  ? RestFromArray<U>
  : R;

// Helper: is `true` present in the boolean union B?
export type TAnyTrue<B extends boolean> = true extends B ? true : false;

// Main recursive “contains” test (unchanged)
export type TContains<T, U> =
  T extends U
    ? true
  : T extends Array<infer E>
    ? TContains<E, U>
  : T extends object
    ? TAnyTrue<{ [K in keyof T]: TContains<T[K], U> }[keyof T]>
  : false;

// New: internal extractor that walks objects & arrays and pulls out any Plucked<…>
export type _ExtractPlucked<P> =
  P extends Plucked<infer U> ? U :
  P extends Array<infer E>      ? _ExtractPlucked<E> :
  P extends object              ? { [K in keyof P]: _ExtractPlucked<P[K]> }[keyof P] :
  never;

// New: expose “never” if no plucked values were found
export type ExtractPlucked<P> =
  [ _ExtractPlucked<P> ] extends [ never ]
    ? never
    : _ExtractPlucked<P>;

export type EmptyValue =
  | null
  | undefined
  | ''                         // empty string
  | []                         // empty tuple → any array of length 0
  | Record<PropertyKey, never> // plain object with no own keys

export type FalsyValue =
  | false
  | ''
  | 0
  | 0n
  | null
  | undefined;

