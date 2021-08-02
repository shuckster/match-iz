# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
