/**
 * Compile-time tests for match-iz/asserts invariant-style narrowing.
 * Run: pnpm run test:types
 */
import { asserts, makeAsserter } from 'match-iz/asserts';
import type { TAssertMatch, TAsserts } from 'match-iz/asserts';
import { isNumber, isString } from 'match-iz';
import type { ExpectTrue, Equal } from './expect';

const userPattern = { id: isNumber, name: isString };

// makeAsserter() has the same dual signature as asserts
type _SameShape = ExpectTrue<Equal<typeof asserts, TAsserts>>;
const customAsserts: TAsserts = makeAsserter();

// ---------------------------------------------------------------------------
// Direct form — call target is the identifier `asserts` (TS-friendly)
// ---------------------------------------------------------------------------

function greet(user: unknown): string {
  asserts(userPattern, user, 'expected a user');
  type _Name = ExpectTrue<Equal<typeof user.name, string>>;
  type _Id = ExpectTrue<Equal<typeof user.id, number>>;
  return user.name;
}

function greetCustom(user: unknown): string {
  customAsserts(userPattern, user);
  type _Name = ExpectTrue<Equal<typeof user.name, string>>;
  return user.name;
}

// ---------------------------------------------------------------------------
// Curried form — binding must be explicitly typed (TS2775)
// ---------------------------------------------------------------------------

const isUser: TAssertMatch<typeof userPattern> = asserts(userPattern);

function greetCurried(user: unknown): string {
  isUser(user);
  type _Name = ExpectTrue<Equal<typeof user.name, string>>;
  return user.name;
}

// ---------------------------------------------------------------------------
// Predicate pattern (direct)
// ---------------------------------------------------------------------------

function upper(value: unknown): string {
  asserts(isString, value);
  type _V = ExpectTrue<Equal<typeof value, string>>;
  return value.toUpperCase();
}

void greet;
void greetCustom;
void greetCurried;
void upper;
