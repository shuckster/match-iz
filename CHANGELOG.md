# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
