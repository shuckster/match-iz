<h1 align="center"><code>match-iz</code> 🔥</h1>

<p align="center">
  <a href="https://github.com/shuckster/match-iz/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/match-iz?style=plastic"
    /></a>
  <a href="https://bundlephobia.com/result?p=match-iz">
    <img
      alt="npm bundle size"
      src="https://img.shields.io/bundlephobia/minzip/match-iz?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/match-iz">
    <img
      alt="Version"
      src="https://img.shields.io/npm/v/match-iz?style=plastic"
    /></a>
</p>

A tiny functional, declarative [pattern-matching](https://github.com/tc39/proposal-pattern-matching) library.

- [Overview](#overview)
- [Install](#install)
- [Examples](#examples)
  - [Front-end Component](#front-end-component)
  - [Reducer](#reducer)
  - [Dates](#dates)
  - [Overloading](#overloading)
  - [Matching array shape](#matching-array-shape)
- [Documentation](#documentation)
  - [Core library](#core-library)
    - [pluck() for extracting values](#pluck)
    - [Regular Expressions](#regular-expressions)
    - [cata() for ADTs/monads](#cata-for-adtsmonads)
  - [Core matchers](#core-matchers)
  - [Date matchers](#date-matchers)
  - [What is spread()?](#what-is-spread)
- [Credits](#credits)

## Overview:

```js
import { match, when, otherwise } from 'match-iz'

let result = match(haystack)(
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  otherwise(result / handler)
)
```

Data-last version:

```js
import { against } from 'match-iz'

let result = against(
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  otherwise(result / handler)
)(haystack)
```

Basic examples (see [documentation](#documentation) for more):

```js
match(literal)(
  when(inRange(100, 200))( ... ),
  when(startsWith('hello'))( ... ),
  when(includes('batman'))( ... ),
  when(anyOf('one', /two/))( ... ),
  when(lte(80))( ... ),
  when(empty)( ... ),
  when(defined)( ... ),
)

match(object)(
  when({ status: inRange(100, 200) })( ... ),
  when({ text: startsWith('hello') })( ... ),
  when({ array: includes('batman') })( ... ),
)

// Name your matchers
const isInRange = inRange(100, 200)
const isLessThan81 = lte(80)
const isStatusInRange = { status: inRange(100, 200) }
const isTextStartsWithHello = { text: startsWith('hello') }
const isArrayIncludesBatman = { array: includes('batman') }
const isMidday = allOf(isHour(12), isMinute(0))

match(object)(
  when(isInRange)( ... ),
  when(isLessThan80)( ... ),
  when(isStatusInRange)( ... ),
  when(isTextStartsWithHello)( ... ),
  when(isArrayIncludesBatman)( ... ),
  when(isMidday)( ... ),
)
```

A little more composition:

```js
match(haystack)(
  when(not(inRange(100, 200)))( ... ),
  when({ number: not(42) })( ... )
)

match(haystack)(
  when(allOf(isNumber, x => x > 10))( ... ),
  when({ number: not(anyOf(20, 30)) })( ... )
  when(includedIn([40, 50]))( ... )
)
```

You can use your own predicates:

```js
const isInteger = Number.isInteger

match(response)(
  when({ status: isInteger })('status is an integer'),
  otherwise('nope')
)
```

Basic local + UTC [date matchers](#date-matchers):

```js
import * as local from 'match-iz/dates'
const { nthSun, isMar, isSat, isSun } = local

// For UTC:
// import * as utc from 'match-iz/dates/utc'

match(new Date())(
  when(allOf(nthSun(-1), isMar))(dateObj => {
    return 'Last Sunday of March: Clocks go forward'
  })
)
```

## Install:

```
$ pnpm i match-iz
```

```js
// ESM
import { match, ...etc } from 'match-iz'
import { isSat, ...etc } from 'match-iz/dates'
import { isSat, ...etc } from 'match-iz/dates/utc'

// CJS
const { match, ...etc } = require('match-iz')
```

Browser/UMD:

```html
<script src="https://unpkg.com/match-iz/dist/match-iz.browser.js"></script>
<script>
  const { match, ...etc } = matchiz
  const { isSat, ...etc } = matchiz
  const { isSat, ...etc } = matchiz.utc
</script>
```

# Examples:

In addition to the examples below, I've used `match-iz` myself in the following libraries: [sift-r](https://github.com/shuckster/sift-r) and [viddy](https://github.com/shuckster/viddy).

### Front-end component:

```jsx
match(props)(
  when({ loading: defined })(<Loading />),
  when({ error: defined })(<Error {...props} />),
  when({ data: defined })(<Page {...props} />),
  otherwise(<Logout />)
)
// <Loading />
```

<details>
<summary>Full example</summary>

```jsx
import * as matchiz from 'match-iz'

const { match, when, otherwise } = matchiz
const { spread, defined } = matchiz

function AccountPage(props) {
  const { loading, error, data } = spread(defined)

  return match(props)(
    when({ loading })(<Loading />),
    when({ error })(<Error {...props} />),
    when({ data })(<Page {...props} />),
    otherwise(<Logout />)
  )
}
```

</details>

&nbsp;

### Reducer:

```js
match(action)(
  when({ type: 'add-todo', payload: pluck(isString) })(payload => ({
    ...state,
    todos: [...state.todos, { text: payload, completed: false }]
  })),

  otherwise(state)
)
```

<details>
<summary>Full example</summary>

```js
import { match, when, otherwise, pluck as $ } from 'match-iz'

const todosReducer = (state, action) =>
  match(action)(
    when({ type: 'set-visibility-filter', payload: $() })(visFilter => ({
      ...state,
      visFilter
    })),

    when({ type: 'add-todo', payload: $() })(text => ({
      ...state,
      todos: [...state.todos, { text, completed: false }]
    })),

    when({ type: 'toggle-todo', payload: $() })(index => ({
      ...state,
      todos: state.todos.map((todo, i) =>
        match(i)(
          when(index)({ ...todo, completed: !todo.completed }),
          otherwise(todo)
        )
      )
    })),

    otherwise(state)
  )
```

</details>

&nbsp;

### Dates:

```js
match(new Date())(
  when(allOf(nthSun(-1), isMar))(dateObj => {
    return 'Last Sunday of March: Clocks go forward'
  }),

  when(anyOf(isSat, isSun))(() => {
    return 'Ladies and Gentlemen; The Weekend'
  }),

  otherwise('The clock is ticking')
)
```

<details>
<summary>Full example</summary>

```js
import { match, when, otherwise, allOf, inRange } from 'match-iz'
import { nthSun, isMar, isOct, isDay } from 'match-iz/dates'

match(new Date())(
  when(allOf(nthSun(-1), isMar))(dateObj => {
    return 'Last Sunday of March: Clocks go forward'
  }),

  when(allOf(nthSun(-1), isOct))(dateObj => {
    return 'Last Sunday of October: Clocks go back'
  }),

  when(isDay(1))(dateObj => {
    return 'Pinch punch, first day of the month!'
  }),

  when(isDay(inRange(30, 31)))(dateObj => {
    return "It's probably not February..."
  }),

  otherwise('The clock is ticking')
)
```

</details>

</details>

&nbsp;

### Overloading:

```js
match(vector)(
  when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
  when({ x, y })(({ x, y }) => Math.hypot(x, y)),
  otherwise(vector => vector.length)
)
// 3.14
```

<details>
<summary>Full example</summary>

```js
import * as matchiz from 'match-iz'

const { match, when, otherwise } = matchiz
const { spread, defined } = matchiz

function getLength(vector) {
  const { x, y, z } = spread(defined)

  return match(vector)(
    when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
    when({ x, y })(({ x, y }) => Math.hypot(x, y)),
    otherwise(vector => vector.length)
  )
}
```

</details>

&nbsp;

### Matching array shape:

```js
match(['', '2', undefined])(
  when(['1', _, _])('one'),
  when([_, '2', _, _])('two, with four items'),
  when([_, '2', _])('two'),
  otherwise('nope')
)
// "two"
```

<details>
<summary>Full example</summary>

```js
import * as matchiz from 'match-iz'

const { match, when, otherwise } = matchiz
const { empty: _ } = matchiz

match(['', '2', undefined])(
  when(['1', _, _])('one'),
  when([_, '2', _, _])('two, with four items'),
  when([_, '2', _])('two'),
  otherwise('nope')
)
```

</details>

&nbsp;

### Data-last `against` can be useful for `map`/`filter`:

```js
lines.filter(
  against(
    when(/remove-this-one/)(false),
    when(/and-this-one-too/)(false),
    when(endsWith('-and-another'))(false),
    otherwise(true)
  )
)
```

<details>
<summary>See a few more:</summary>

```js
import { against, when, otherwise, lte } from 'match-iz'

function memoize(fn, cache = new Map()) {
  return x => (cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x))
}

// Fibonnacci

const fib = memoize(
  against(
    when(lte(0))(0),
    when(1)(1),
    otherwise(x => fib(x - 1) + fib(x - 2))
  )
)

fib(35)

// Font sizes

const fontSize = memoize(
  against(
    when([100, 200])('Super Thin'),
    when([300])('Thin'),
    when([400, 500])('Normal'),
    when([600, 700, 800])('Bold'),
    when([900])('Heavy'),
    otherwise('Not valid')
  )
)

;[100, 200, 300, 400, 500, 600, 700, 800, 900, 901].forEach(size => {
  console.log(`${size} = `, fontSize(size))
})
```

```js
import { against, when, otherwise } from 'match-iz'

// Sorting

numbers.sort(
  nargs(
    against(
      when(([a, b]) => a < b)(-1),
      when(([a, b]) => a === b)(0),
      when(([a, b]) => a > b)(1)
    )
  )
)

function nargs() {
  return fn =>
    (...args) =>
      fn(args)
}
```

</details>

&nbsp;

# Documentation

- [Core library](#core-library)
  - [pluck() for extracting values](#pluck)
  - [Regular Expressions](#regular-expressions)
  - [cata() for ADTs/monads](#cata-for-adtsmonads)
- [Core matchers](#core-matchers)
- [Date matchers](#date-matchers)
- [What is spread()?](#what-is-spread)

## Core-library

match / against / when / otherwise

### `match()` / `against()`

```js
match(value)(...predicates)
// returns: winning value

against(...predicates)(value)
// returns: winning value
```

Each predicate receives the `value` passed to `match` (or `against`, but we'll just talk about `match`). The first one to return a truthy value wins, and `match` returns it.

So you could just use `match` like this:

```js
match(haystack)(
  haystack => undefined,
  haystack => null,
  haystack => 'hi'
)
// "hi"
```

However, using `when` makes `match` more powerful:

### `when()`

```js
when(pattern)(handler)
// returns: value => { matched, value }

// Uncurried version:
when(pattern, handler)
```

`handler` can be a function or a literal. `pattern` is described by example throughout this page.

`when` builds predicates that return objects like this:

```js
{
  matched: () => with pattern return true|false,
  value: () => with handler return result
}
```

If `match` sees such an object return from a predicate:

- `matched()` is run to determine the win-state
- `value()` retrieves the winning value

So without `when`, you could do this to emulate it:

```js
match(haystack)(
  haystack => ({
    matched: () => haystack.length > 0,
    value: () => 'haystack has length'
  }),
  haystack => ({
    matched: () => !haystack,
    value: () => 'haystack is falsy'
  })
)

// The `when` equivalent of the above:
match(haystack)(
  when(hs => hs.length > 0)(hs => 'haystack has length'),
  when(hs => !hs)(hs => 'haystack is falsy')
)
```

### `otherwise()`

```js
otherwise(handler)
// returns: winning value
```

Always wins, so put it at the end to deal with fallbacks.

`handler` can be a function or a literal.

#### AND / OR / NOT conditions in your `when`'s

You can use `allOf` (AND) `anyOf` (OR) and `not` (NOT) to build more complex conditions:

```js
match(haystack)(
  when(allOf({ msg: endsWith('world!') }, { num: not(42) }))(() => {
    return 'A'
  }),
  when(anyOf({ msg: not(startsWith('hello')) }, { num: 42 }))(() => {
    return 'B'
  }),
  when(anyOf(1, 2, not('chili dogs')))(() => {
    return 'C'
  })
)
```

**Deprecated behaviour**: Until version 3.0.0, OR could be achieved by using an array in your `when`, so long as the haystack is not an array itself:

```js
// OR example:
match({ message: 'hello wrrld!', number: 42 })(
  when([
    // if message ends with "world!" OR number === 42
    { message: endsWith('world!') },
    { number: 42 }
  ])('ok!')
)
// "ok!"
```

This behaviour was deprecated in version 2.3.0 and removed in version 3.0.0 to prevent unusual behaviour when working with haystacks that may or may not be an array.

### pluck()

Use `pluck` to extract values of interest when matching against array/object haystacks:

```js
import { pluck } from 'match-iz'

match(action)(
  when({ type: 'add-todo', payload: pluck() })(payload => {
    return `Adding todo: ${payload}`
  })
)

// `pluck` accepts patterns, so you
// can guard before extracting values:
match([1, 2, 3])(
  when([1, 2, pluck(3)])(three => {
    return '[2] is the number 3!'
  }),

  when([1, 2, pluck(isNumber)])(num => {
    return `[2] is a number: ${num}`
  })
)
```

### Regular Expressions

```js
match('hello, world!')(
  when(/world/)(matches => {
    return matches
  })
)
// [ 'world', index: 7, input: 'hello, world!', groups: undefined ]

match({ text: 'hello, world!' })(
  when({ text: /world/ })(obj => {
    return obj
  })
)
// { text: 'hello, world!' }
```

1. Passing a `RegExp` literal to `when` will pass the match-array as the first argument to `handler` (if it's a function).

2. Using a `RegExp` on an object-prop passes the `value` from `match()`, as usual.

#### Capture-groups

If specified, capture groups are extracted automatically from regular-expressions (with the second argument of the `when`-handler being the full-match if you need it):

```js
match('1 + 2')(
  when(/(?<left>\d+) \+ (?<right>\d+)/)(
    ({ left, right }, fullRegExpMatchArray) => {
      return add(left, right)
    }
  ),

  when(/no capture groups/)(fullRegExpMatchArray => {
    return 'so we get the full match array only'
  }),

  otherwise("I couldn't parse that!")
)
// 3
```

### cata() for ADTs/monads

Use `cata` to integrate `match-iz` with your ADTs/monads:

```js
import { cata } from 'match-iz'

// Specify how match-iz can detect
// monads and extract their values
const { just, nothing } = cata({
  just: m => m?.isJust,
  nothing: m => m?.isNothing,
  getValue: m => m?.valueOf()
})

match(maybeDate('2022-01-01'))(
  just(dateObj => {
    console.log('Parsed date: ', dateObj)
  }),
  nothing(() => {
    console.log('Invalid date')
  })
)
```

## Core matchers

`match-iz` provides a number of composable matchers you can use to build patterns:

| Numbers        | Strings           | Strings/Arrays | Truthiness | Primitives                                              | Negate     | Combinators       |
| -------------- | ----------------- | -------------- | ---------- | ------------------------------------------------------- | ---------- | ----------------- |
| `gt(n)`        | `startsWith('s')` | `includes(o)`  | `empty`    | `isArray`                                               | `not(...)` | `allOf(...)`      |
| `lt(n)`        | `endsWith('s')`   | -              | `falsy`    | `isDate`                                                | -          | `anyOf(...)`      |
| `gte(n)`       | -                 | -              | `defined`  | `isFunction`                                            | -          | `includedIn(...)` |
| `lte(n)`       | -                 | -              | `truthy`   | `isNumber`                                              | -          | `hasOwn(...)`     |
| `inRange(x,y)` | -                 | -              | -          | [`isPojo`](https://google.com/search?q=javascript+pojo) | -          | -                 |
| -              | -                 | -              | -          | `isRegExp`                                              | -          | -                 |
| -              | -                 | -              | -          | `isString`                                              | -          | -                 |
| -              | -                 | -              | -          | `instanceOf`                                            | -          | -                 |

Just import them from `match-iz` as you do the core library:

```js
import { gt, lt, ...etc } from 'match-iz'
```

Some detail:

| Matchers                                | Meaning            |
| --------------------------------------- | ------------------ |
| `gt` / `lt` / `gte` / `lte` / `inRange` | number comparisons |

```js
match(5)(
  when(3)('Exactly 3'),
  when(gt(0))('Greater than 0'),
  when(gte(4))('Greater than or equal to 4'),
  when(lt(10))('Less than 10'),
  when(lte(9))('Less than or equal to 9'),
  when(inRange(5, 10))('Between 5 and 10 inclusive')
)
```

| Matchers                  | Meaning            |
| ------------------------- | ------------------ |
| `startsWith` / `endsWith` | string comparisons |

```js
match('lorem ipsum')(
  when('lipsum')('Exactly "lipsum"'),
  when(startsWith('ip'))('Starts with "ip"'),
  when(endsWith('um'))('Ends with "um"')
)
```

| Helper     | Meaning                  |
| ---------- | ------------------------ |
| `includes` | string/array comparisons |

```js
match('lorem ipsum')(
  when(includes('em'))('Got "em"'),
  when(includes('zap'))('Found "zap"')
)

match([1, 2, 3, 4])(
  when(includes(5))('Array has a 5'),
  when([1, 2, 3, gt(3)])('Array is [1, 2, 3, >3]')
)
```

| Matchers                                 | Meaning                  |
| ---------------------------------------- | ------------------------ |
| `empty` / `defined` / `falsy` / `truthy` | bottom-value comparisons |

```js
match('')(
  when(empty)(() => {
    return "It's '', {}, [], null, undefined, or NaN"
  }),
  when(defined)('Opposite of empty'),
  when(falsy)("It's falsy"),
  when(truthy)("It's truthy")
)
```

| Matchers                                                                                             | Meaning               |
| ---------------------------------------------------------------------------------------------------- | --------------------- |
| `isArray` / `isDate` / `isFunction` / `isNumber` / `isPojo` / `isRegExp` / `isString` / `instanceOf` | primitive comparisons |

```js
match([1, 2, 3])(
  when(isArray)('Looks like an array, eh?'),
  when(instanceOf(Component))('A nice component')
)
```

| Helper | Meaning  |
| ------ | -------- |
| `not`  | negation |

```js
match(5)(
  when(not(5))('Not a 5'),
  when(not(gte(4)))('Less than 4'),
  when(not(inRange(100, 0)))(() => {
    return 'Less than 0 or greater than 100'
  })
)
```

| Matchers                                    | Meaning            |
| ------------------------------------------- | ------------------ |
| `allOf` / `anyOf` / `includedIn` / `hasOwn` | number comparisons |

```js
match({ one: 1, two: 2 })(
  when(allOf(isPojo, hasOwn('one')))(() => {
    return 'Has "one"'
  }),
  when({ one: anyOf(1, 2, 3) })(() => {
    return 'Has "one" of 1, 2, or 3'
  }),
  when({ two: includedIn(1, gt(3)) })(() => {
    return 'Has "two" with a value of 1 or >3'
  })
)
```

## Date matchers

The following date matchers are available from `match-iz/dates` (or directly from the `matchiz` global variable if you're using the browser-build.)

| Time                     | Days of the week    | Weeks of the month | Months           | Years                 |
| ------------------------ | ------------------- | ------------------ | ---------------- | --------------------- |
| `isHour(0..23)`          | `isDay(-31..31)`    | `nthSun(-5..5)`    | `isMonth(1..12)` | `isYear(n)`           |
| `isMinute(0..59)`        | `isDayOfWeek(0..6)` | `nthMon(-5..5)`    | -                | `isWeekNumber(1..52)` |
| `isSecond(0..59)`        | -                   | `nthTue(-5..5)`    | `isJan`          | `isLeapYear`          |
| -                        | `isSun`             | `nthWed(-5..5)`    | `isFeb`          | -                     |
| `isAM`                   | `isMon`             | `nthThu(-5..5)`    | `isMar`          | -                     |
| `isPM`                   | `isTue`             | `nthFri(-5..5)`    | `isApr`          | -                     |
| `isMorning`              | `isWed`             | `nthSat(-5..5)`    | `isMay`          | -                     |
| `isAfternoon`            | `isThu`             | -                  | `isJun`          | -                     |
| `isEvening`              | `isFri`             | -                  | `isJul`          | -                     |
| -                        | `isSat`             | -                  | `isAug`          | -                     |
| `isTime`                 | -                   | -                  | `isSep`          | -                     |
| `inThePast(n,timeFrame)` | -                   | -                  | `isOct`          | -                     |
| `inTheNext(n,timeFrame)` | -                   | -                  | `isNov`          | -                     |
| -                        | -                   | -                  | `isDec`          | -                     |

```js
import { isSun, ...etc } from 'match-iz/dates'

// UTC versions:
import { isSun, ...etc } from 'match-iz/dates/utc'
```

Some detail:

| Matchers | Meaning             |
| -------- | ------------------- |
| `isTime` | ms since Unix epoch |

```js
match(new Date())(
  when(isTime(0))('1st of January 1970'),
  when(isTime(ms => ms < 0))('Before the 1st of January 1970')
)
```

| Matchers                  | Meaning                        |
| ------------------------- | ------------------------------ |
| `inThePast` / `inTheNext` | in a past or future time-frame |

```js
match(new Date())(
  when(inThePast(1, 'day'))('Pretty recent'),
  when(inThePast(2, 'weeks'))('Last fortnight'),
  when(not(inTheNext(24, 'hours')))('Too soon')
)

// Available time-frames:
// 'ms', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'
```

| Matchers                                                                                         | Meaning         |
| ------------------------------------------------------------------------------------------------ | --------------- |
| `isHour` / `isMinute` / `isSecond` / `isAM` / `isPM` / `isMorning` / `isAfternoon` / `isEvening` | the time of day |

```js
const isMidday = allOf(isHour(12), isPM)

match(new Date())(
  when(isHour(0))('around midnight'),
  when(isHour(inRange(12, 14)))('lunchtime'),
  when(allOf(isHour(17), isMinute(0), isSecond(0)))('clock-off'),
  when(isAM)('morning'),
  when(isPM)('afternoon'),
  when(isAfternoon)('afternoon'),
  when(isEvening)('evening, 6pm-midnight'),
  when(isMidday)("It's midday")
)
```

| Matchers                                                            | Meaning                            |
| ------------------------------------------------------------------- | ---------------------------------- |
| `isSun` / `isMon` / `isTue` / `isWed` / `isThu` / `isFri` / `isSat` | is that particular day of the week |

```js
match(new Date())(
  when(isMon)("I don't like them"),
  when(anyOf(isSat, isSun))('Weekend!'),
  otherwise('Back to the grind')
)
```

| Matchers                                                                   | Meaning                                                              |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `nthSun` / `nthMon` / `nthTue` / `nthWed` / `nthThu` / `nthFri` / `nthSat` | the nth \*day of the month. Negatives allowed to search from the end |

```js
match(new Date())(
  when(nthSun(2))('Second Sunday of the month'),
  when(nthFri(-1))('Last Friday of the month'),
  when(anyOf(nthMon(1), nthFri(1)))('1st Monday/Friday of the month')
)
```

| Matchers                                                                                                              | Meaning                  |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `isJan` / `isFeb` / `isMar` / `isApr` / `isMay` / `isJun` / `isJul` / `isAug` / `isSep` / `isOct` / `isNov` / `isDec` | is that particular month |

```js
match(new Date())(
  when(isJan)("It's January"),
  when(anyOf(isFeb, isMar))('Is it February or March?'),
  when(allOf(isDec, isDay(24)))('Christmas already?')
)
```

| Matchers                                                        | Meaning                                                                                                                                                                                                          |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isDay` / `isMonth` / `isYear` / `isDayOfWeek` / `isWeekNumber` | is the specified day, month, year, DoW, or week-number. All accept a predicate function instead of a number for finer control. `isDay` also accepts negative numbers to work backwards from the end of the month |

```js
match(new Date())(
  when(isDay(1))('First day of the month'),
  when(isDay(-1))('Last day of the month'),
  when(isMonth(1))("It's January, of course"),
  when(isMonth(x => [4, 5].includes(x)))(() => {
    return 'April or May'
  }),
  when(isYear(2015))('Flying cars and skateboards'),
  when(isYear(x => x % 2 === 0))(
    date => `An even numbered year: ${date.toString()}`
  ),
  when(allOf(isYear(2019), isMar))('Better forgotten'),
  when(isDayOfWeek(0))('Sunday'),
  when(isDayOfWeek(6))('Saturday'),
  when(isWeekNumber(1))('First week of the year'),
  when(isWeekNumber(52))('Last week of the year'),
  when(not(isWeekNumber(13)))(() => {
    return 'Not the 13th week of the year'
  })
)
```

## What is `spread()`?

The [TC39 spec](https://github.com/tc39/proposal-pattern-matching) proposes both conditional _and_ destructuring behaviour within the same syntax:

```js
// checks that `error` is truthy, and destructures
// it for use in the winning block:
when ({ error }) { <Error error={error} />; }
```

Very concise! Unfortunately, we can't do that with current syntax.

But we can lean on [Object initializer notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) to get close:

```js
import { defined } from 'match-iz'

// without:
when({ error: defined })(<Error {...props} />)
```

```js
const error = defined

// with:
when({ error })(<Error {...props} />)
```

`spread()` just makes it easy to do this with more than one prop:

```js
const { loading, error, data } = spread(defined)

loading === defined // true
error === defined // true
data === defined // true

when({ loading })(<Loading />)
when({ error })(<Error {...props} />)
when({ data })(<Page {...props} />)
```

It uses [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to achieve this.

That's all I got!

# Credits

`match-iz` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
