/**
 * Ensures package types expose runtime named exports (ESM shape).
 * Guards against hybrid declare-module + top-level type export breakage.
 */
import {
  match,
  when,
  pluck,
  isString,
  isNumber,
  otherwise
} from 'match-iz'
import type {
  ExtractPlucked,
  PatternHandlerInput,
  Plucked
} from 'match-iz'
import type { ExpectTrue, Equal } from './expect'

match({ one: 'hi' })(
  when({ one: pluck(isString) }, s => {
    type _S = ExpectTrue<Equal<typeof s, string>>
    return s
  }),
  otherwise(() => '')
)

type _PluckExport = ExpectTrue<Equal<ExtractPlucked<{ n: Plucked<number> }>, number>>
type _Handler = ExpectTrue<
  Equal<PatternHandlerInput<{ n: Plucked<number> }>, number>
>

// Value exports must be callable (not type-only)
const _pluckIsFn: typeof pluck = pluck
const _whenIsFn: typeof when = when
const _matchIsFn: typeof match = match
void isNumber
void _pluckIsFn
void _whenIsFn
void _matchIsFn
