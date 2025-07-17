// common.d.ts
export type TPredicate<Input> = (value: Input) => boolean;
export type TPredicateAsserting<Kind> = (value: unknown) => value is Kind;

// New: a unique symbol brand and wrapper for “plucked” values
export declare const pluckBrand: unique symbol;
export type Plucked<T> = { [pluckBrand]: T };

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

