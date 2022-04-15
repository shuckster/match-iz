# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [3.3.1] - 2022-04-15

### Removed / Fixed

- Remove `browser` setting from `package.json`; seems to cause issues with CodeSandbox build process, and isn't really necessary since the browser-build is something that's interacted with manually.

## [3.3.0] - 2022-04-14

### Added

- `inTheFuture` alias for `inTheNext`

- `inTheFuture` + `inThePast` can be used without arguments now

## [3.2.2] - 2022-04-14

### Updated

- README tweaks, typos

## [3.2.0] - 2022-04-14

### Added

- `firstOf()` and `lastOf()` matchers:

```js
match([1, 'a', 3, 4, 5, 6])(
  when(lastOf(isNumber, isString), () => {
    return 'last two items are a number and a string'
  }),
  when(firstOf(isNumber, isString), () => {
    return 'first two items are a number and a string'
  })
)
```

- Support `when` guards, which are essentially just consecutive patterns:

```js
match(haystack)(
  when(isNumber, gt(5), lte(10), num => {
    return 'a number between 6 and 10'
  }),
  when(isString, startsWith('a'), str => {
    return 'a string starting with "a"'
  }),
  when(isArray, lastOf(isNumber, isNumber), arr => {
    return 'the last two elements of the array are numbers'
  })
)
```

## [3.1.0] - 2022-04-12

### Added

- `isTime` for testing milliseconds since Unix epoch

- New `match-iz/dates` methods for testing time-frames relative to now:

```js
match(date)(
  // Test if a date is in the past
  when(inThePast(1, 'day'))(...),
  when(inThePast(2, 'days'))(...),

  // Test if a date is in the future
  when(inTheNext(30, 'minutes'))(...),
)

```

### Removed

- Old `isDate`/`isTime` typedefs were left behind

## [3.0.0] - 2022-04-09

### Removed

- Remove `isDate`/`isTime`. `isDate` conflicted with the same function in `types`, and could not have matchers passed into it in the same way as the individual helpers. ie; `isDate(inRange(), anyOf(), ...)` was not possible.

- Removed deprecated `when` OR syntax that abuses arrays. Use `anyOf` matcher instead.

```js
// Deprecated syntax:
when([allOf(isFri, isHour(gte(17)), isSat, isSun)])
//   ^__ _  _                             _  _ __^

// Refactored using `anyOf`:
when(anyOf(allOf(isFri, isHour(gte(17))), isSat, isSun))
//   ^^^^^^__ _  _                             _  _ __^
```

### Updated

- `when` now accepts a result/handler as its second argument:

```js
// New syntax:
when(literalOrPattern, resultOrHandler)

match(new Date())(
  when(allOf(nthSun(-1), isMar), dateObj => {
    return 'Last Sunday of March: Clocks go forward'
  }),

  when(anyOf(allOf(isFri, isHour(gte(17))), isSat, isSun), () => {
    return 'Ladies and Gentlemen; The Weekend'
  }),

  otherwise('The clock is ticking')
)

// Existing syntax (still works):
when(literalOrPattern)(resultOrHandler)

match(new Date())(
  when(allOf(nthSun(-1), isMar))(dateObj => {
    return 'Last Sunday of March: Clocks go forward'
  }),

  when(anyOf(allOf(isFri, isHour(gte(17))), isSat, isSun))(() => {
    return 'Ladies and Gentlemen; The Weekend'
  }),

  otherwise('The clock is ticking')
)
```

## [2.3.2] - 2022-04-07

### Fixed

- README typos, fixes

## [2.3.0] - 2022-04-07

### Added

- Simple date matchers now available in `match-iz/dates` and `match-iz/dates/utc`

## [2.2.0] - 2022-03-21

### Updated

- Permit use of anyOf() as standalone function instead of just match-iz pattern, eg:

```js
// Before 2.2.0
const isStringOrRegExp = anyOf(isString, isRegExp)
// [isString, isRegExp]

// After 2.2.0
const isStringOrRegExp = anyOf(isString, isRegExp)
// <Function>

isStringOrRegExp('foo') // true
isStringOrRegExp(/foo/) // true
```

## [2.1.0] - 2022-03-06

### Updated

- inRange() will work with min/max swapped

## [2.0.7] - 2022-02-10

### Fixed

- README typo

## [2.0.6] - 2022-02-10

### Updated

- README cleanup

## [2.0.5] - 2022-02-08

### Updated

- README tweaks, update deps

## [2.0.4] - 2022-02-06

### Fixed

- Include package.json for sub-modules.

## [2.0.3] - 2022-02-06

### Fixed

- Another run at fixing import vs. require.

## [2.0.2] - 2022-02-03

### Fixed

- Fix .d.ts for allOf, anyOf, includedIn, hasOwn

## [2.0.1] - 2022-02-03

### Fixed

- Added isDate() to .d.ts

## [2.0.0] - 2022-02-01

### Breaking Changes

- If specified, named RegExp-groups will be passed-in to `when` handlers as the first argument, and the full-match the second.

Before v2:

```js
when(/(?<foo>.*)/)(fullMatch => {
  const foo = fullMatch.groups.foo
  console.log(foo)
})
```

After v2:

```js
when(/(?<foo>.*)/)(({ foo }, fullMatch) => {
  console.log(foo)
})
```

- RegExps without named-groups work as before, with the full-match being the first and only argument to the handler.

## [1.12.0] - 2022-01-12

### Added

- cata() helper for integration with ADTs/monads

## [1.11.2] - 2022-01-11

### Fixed

- Fix esbuild errors by re-ordering package.json exports

## [1.11.1] - 2022-01-10

### Updated

- esbuild output was different after deps-update for the browser-build

## [1.11.0] - 2021-12-28

### Added

- isDate

## [1.10.4] - 2021-12-21

### Fixed

- Fix WebPack error: "Default condition should be last one"

## [1.10.3] - 2021-11-26

### Updated

- Above-the-fold README tweaks

## [1.10.2] - 2021-10-29

### Fixed

- Whoops, README example condition for >=500 will not run

## [1.10.1] - 2021-10-29

### Updated

- README example tweaks

## [1.10.0] - 2021-10-24

### Added

- pluck(predicate?) helper to extract a part of the haystack
- instanceOf(constructor) helper

## [1.9.0] - 2021-10-23

### Added

- hasOwn(prop1, prop2...) helper

## [1.8.2] - 2021-10-18

### Fixed

- isNumber(NaN) should return false

## [1.8.1] - 2021-10-02

### Updated

- Tweak README
- Mild code shrinking

## [1.8.0] - 2021-09-20

### Added

- allOf(), anyOf(), includedIn()

## [1.7.3] - 2021-09-14

### Updated

- Minor cleanup

## [1.7.2] - 2021-09-11

### Updated

- `not()` type definition

## [1.7.1] - 2021-09-10

### Updated

- `not()` can be used with literals as well as functions

## [1.7.0] - 2021-09-10

### Added

- `not()` will negate the output of a function

## [1.6.4] - 2021-08-18

### Updated

- README: Compact full examples into details/summary tags

## [1.6.3] - 2021-08-10

### Fixed

- We're exposing CJS as well as ESM, so use .mjs instead of "type": "module" for build/source files. Fixes CJS imports

## [1.6.2] - 2021-08-10

### Fixed

- Use ESM for source/build files
- Fix ESM build (import { ... } from 'match-iz' was not working right)

## [1.6.1] - 2021-08-09

### Updated

- Will do the right thing with `NaN`
- Can handle sub-arrays as well as sub-pojos

## [1.6.0] - 2021-08-09

### Updated

- When matching array-to-array, ensure exact lengths before comparing contents to make matches more predictable. Comparing variable length arrays is done better via a custom when-predicate

## [1.5.0] - 2021-08-09

### Added

- Can now match against contents of an array

## [1.4.1] - 2021-08-08

### Added

- Add runtime type checkers to index.d.ts

## [1.4.0] - 2021-08-07

### Updated

- Export runtime type checkers, why not

## [1.3.6] - 2021-07-24

### Updated

- NPM tags, README tweaks, no functional changes

## [1.3.5] - 2021-07-24

### Fixed

- Remove @params / @returns from JSDoc comments - fixes duplicate Intellisense suggestions

## [1.3.4] - 2021-07-24

### Added

- `index.d.ts` against() example

## [1.3.3] - 2021-07-23

### Added

- Basic `index.d.ts` for type hints and examples

## [1.3.2] - 2021-07-22

### Fixed

- otherwise() was returning all falsy values as `undefined`

## [1.3.1] - 2021-07-21

### Updated

- Updated test for nested patterns
- Remove superfluous coercion

## [1.3.0] - 2021-07-21

### Added

- Support nested objects for patterns

## [1.2.1] - 2021-07-20

### Updated

- unpkg example in README

## [1.2.0] - 2021-07-19

### Removed

- Literals already cover use-case for isTrue/isFalse

## [1.1.2] - 2021-07-19

### Updated

- README: Above the fold examples

## [1.1.1] - 2021-07-18

### Fixed

- inRange() should check that value isNumber, not min/max

## [1.1.0] - 2021-07-18

### Fixed

- empty() should not include 'false'

### Added

- Provide truthy/falsy/isTrue/isFalse

## [1.0.4] - 2021-07-18

### Fixed

- Update README to include correct empty/defined usage

## [1.0.3] - 2021-07-18

### Fixed

- defined, empty, spead()
- More complete empty()
- Number.isNumber() is not a thing

## [1.0.2] - 2021-07-18

### Fixed

- RegExps guard for strings
- spread() should not mutate its argument

## [1.0.1] - 2021-07-18

### Fixed

- Browser-build global now `matchiz`, not `matches`

## [1.0.0] - 2021-07-18

### Added

- match-iz :)
