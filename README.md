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

Functional, declarative [pattern-matching](https://github.com/tc39/proposal-pattern-matching) in ~150 SLOC.

- [Overview](#overview)
- [Install](#install)
- [Examples](#examples)
- [Documentation](#documentation)
- [Credits](#credits)

## Overview:

```js
import { match, when, otherwise } from 'match-iz'

match(haystack)(
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  otherwise(result / handler)
)
```

Data-last version:

```js
import { against, isString, isNumber } from 'match-iz'

const stringOrNumber = against(
  when(isString)("it's a string!"),
  when(isNumber)("it's a number!"),
  otherwise("sorry, it's neither of those!")
)

const result = stringOrNumber(42)
// "it's a number!"
```

Use `cata` to integrate `match-iz` with your ADTs/monads:

```js
import { cata } from 'match-iz'

// Specify how match-iz should detect Just/Nothing
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

## Install:

```
$ pnpm i match-iz
```

```js
// ESM
import { match, when, otherwise, pluck, ...etc } from 'match-iz'

// CJS
const { match, when, otherwise, pluck, ...etc } = require('match-iz')
```

Browser/UMD:

```html
<script src="https://unpkg.com/match-iz/dist/browser/match-iz.browser.js"></script>
<script>
  const { match, when, otherwise, pluck, ...etc } = matchiz
</script>
```

# Examples:

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
  when({ type: 'add-todo', payload: pluck(isString) })(text => ({
    ...state,
    todos: [...state.todos, { text, completed: false }]
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

  when(allOf(nthSun(-1), isOct))(dateObj => {
    return 'Last Sunday of October: Clocks go back'
  }),

  otherwise('The clock is ticking')
)
// "The clock is ticking"
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
&nbsp;

### Regular Expressions:

```js
match('1 + 2')(
  // Groups extracted automatically if specified
  // (second argument will be the full-match)
  //       ____            _____
  when(/(?<left>\d+) \+ (?<right>\d+)/)(
    ({ left, right }, fullRegExpMatchArray) => {
      return add(left, right)
    }
  ),

  otherwise("I couldn't parse that!")
)
// 3
```

<details>
<summary>Full example</summary>

```js
import { match, when, otherwise } from 'match-iz'

match('1 + 2')(
  when(/(?<firstName>\w+) (?<lastName>\w+)/)(
    ({ lastName }, fullRegExpMatchArray) => {
      return `Ahoy, Captain ${lastName}`
    }
  ),

  when(/(?<left>\d+) \+ (?<right>\d+)/)(
    ({ left, right }, fullRegExpMatchArray) => {
      return add(left, right)
    }
  ),

  otherwise("I couldn't parse that!")
)

function add(left, right) {
  return parseInt(left, 10) + parseInt(right, 10)
}
```

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

### Matching array contents:

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

### Also provides `against(...)(value)`:

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
<summary>See a couple more:</summary>

```js
import { against, when, otherwise, lte } from 'match-iz'

// Fibonnacci

const fib = memoize(
  against(
    when(lte(0))(0),
    when(1)(1),
    otherwise(x => fib(x - 1) + fib(x - 2))
  )
)

fib(35)

function memoize(fn, cache = new Map()) {
  return x => (cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x))
}
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
  return fn => (...args) => fn(args)
}
```

</details>

&nbsp;

# Documentation

- [Helpers](#helpers)
- [Dates](#dates)
- [Core library](#core-library)

## Helpers

`match-iz` provides a number of composable helpers you can use to build patterns:

| Numbers | Strings    | Strings/Arrays | Truthiness | Types                                                 | Negate | Combinators |
| ------- | ---------- | -------------- | ---------- | ----------------------------------------------------- | ------ | ----------- |
| gt      | startsWith | includes       | empty      | isArray                                               | not    | allOf       |
| lt      | endsWith   | -              | falsy      | isDate                                                | -      | anyOf       |
| gte     | -          | -              | defined    | isFunction                                            | -      | includedIn  |
| lte     | -          | -              | truthy     | isNumber                                              | -      | hasOwn      |
| inRange | -          | -              | -          | [isPojo](https://google.com/search?q=javascript+pojo) | -      | -           |
| -       | -          | -              | -          | isRegExp                                              | -      | -           |
| -       | -          | -              | -          | isString                                              | -      | -           |
| -       | -          | -              | -          | instanceOf                                            | -      | -           |

Just import them from `match-iz` as you do the core library:

```js
import { gt, lt, ...etc } from 'match-iz'
```

Some detail:

| Helper                             | Meaning                                        |
| ---------------------------------- | ---------------------------------------------- |
| `isArray/Date/Function/...etc`     | test for that type                             |
| `gt(0)`                            | greater than                                   |
| `lt(0)`                            | less than                                      |
| `gte(0)`                           | greater than or equal                          |
| `lte(0)`                           | less than or equal                             |
| `inRange(0, 10)`                   | within min ... max                             |
| `startsWith('hello ...')`          | string starts with "content"                   |
| `endsWith('... world!')`           | string ends with "content"                     |
| `includes(item)`                   | array/string contains item/"content"           |
| `includedIn([these, things, ...])` | alias for `anyOf`                              |
| `instanceOf(constructor)`          | for class instances                            |
| `hasOwn('prop1', 'prop2'...)`      | check for existence of object keys/props       |
| `empty`                            | null, undefined, NaN, '', [], or {}            |
| `defined`                          | negates empty, but `false` counts as "defined" |
| `truthy`                           | a !! check                                     |
| `falsy`                            | a ! check                                      |
| `not`                              | negate the result of the given pattern         |
| `allOf`                            | AND                                            |
| `anyOf`                            | OR                                             |

Basic examples:

```js
match(literal)(
  when(inRange(100, 200))( ... ),
  when(startsWith('hello'))( ... ),
  when(includes('batman'))( ... ),
  when(includedIn('one', 'two'))( ... ),
  when(lte(80))( ... ),
  when(empty)( ... ),
  when(defined)( ... ),
)

match(object)(
  when({ status: inRange(100, 200) })( ... ),
  when({ text: startsWith('hello') })( ... ),
  when({ array: includes('batman') })( ... ),
  when({ string: includedIn('one', 'two') })( ... ),
  when({ length: lte(80) })( ... ),
  when({ cup: empty })( ... ),
  when({ pencil: defined })( ... ),
)
```

A little more composition:

```js
match(literal)(
  when(not(inRange(100, 200)))( ... ),
  when({ number: not(42) })( ... )
)

match(literal)(
  when(allOf(isNumber, x => x > 10))( ... ),
  when({ number: not(anyOf(20, 30)) })( ... )
  when(includedIn([40, 50]))( ... )
)
```

You can use your own predicates:

```js
const isInteger = Number.isInteger

match(status)(
  when({ status: isInteger })('status is an integer'),
  otherwise('nope')
)
```

## Dates

Since 2.3.0, the following date helpers are available from `match-iz/dates` (or directly from the `matchiz` global variable if you're using the browser-build.)

```js
import { isSun, isMar, isYear, ...etc } from 'match-iz/dates'
```

| Helpers                                                             | Meaning                            |
| ------------------------------------------------------------------- | ---------------------------------- |
| `isSun` / `isMon` / `isTue` / `isWed` / `isThu` / `isFri` / `isSat` | is that particular day of the week |

```js
match(new Date())(
  when(isMon)("I don't like them"),
  when(allOf(isSat, isSun))('Weekend!'),
  otherwise('Back to the grind')
)
```

| Helpers                                                                    | Meaning                                                              |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `nthSun` / `nthMon` / `nthTue` / `nthWed` / `nthThu` / `nthFri` / `nthSat` | the nth \*day of the month. Negatives allowed to search from the end |

```js
match(new Date())(
  when(nthSun(2))('Second Sunday of the month'),
  when(nthFri(-1))('Last Friday of the month'),
  when(anyOf(nthMon(1), nthFri(1)))('First Monday or Friday of the month')
)
```

| Helpers                                                                                                               | Meaning                  |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `isJan` / `isFeb` / `isMar` / `isApr` / `isMay` / `isJun` / `isJul` / `isAug` / `isSep` / `isOct` / `isNov` / `isDec` | is that particular month |

```js
match(new Date())(
  when(isJan)("It's January"),
  when(anyOf(isFeb, isMar))('Is it February or March?'),
  when(allOf(isDec, isDay(24)))('Christmas already?')
)
```

| Helpers                                                         | Meaning                                                                                                                            |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `isDay` / `isMonth` / `isYear` / `isDayOfWeek` / `isWeekNumber` | is the specified day, month, year, DoW, or week-number. isDay accepts negative numbers to work backwards from the end of the month |

```js
match(new Date())(
  when(isDay(1))('First day of the month'),
  when(isDay(-1))('Last day of the month'),
  when(isMonth(1))("It's January, of course"),
  when(allOf(isYear(2019), isMar))('Better forgotten'),
  when(isDayOfWeek(0))('Sunday'),
  when(isDayOfWeek(6))('Saturday'),
  when(isWeekNumber(1))('First week of the year'),
  when(isWeekNumber(52))('Last week of the year'),
  when(not(isWeekNumber(13)))('Not the 13th week of the year')
)
```

## Core-library

match / when / otherwise

### `match()`

```js
match(value)(...predicates)
// returns: winning value
```

Each predicate receives the `value` passed to `match()`.

The first one to return a truthy value wins, and `match` returns it.

### `when()`

```js
when(pattern)(handler)
// returns: value => object
```

`when` builds special predicates that return objects like this:

```js
{
  matched: () => with pattern return true|false,
  value: () => with handler return result
}
```

If `match` sees such an object return from a predicate:

- `matched()` is run to determine the win-state
- `value()` retrieves the winning value

#### AND / OR

If the match `value` is NOT an array, using an array within a `when` will perform a logical `OR` against the contained values:

```js
match({ message: 'hello wrrld!', number: 42 })(
  when({
    // if message ends with "world!" AND number === 42
    message: endsWith('world!'),
    number: 42
  })('ok!')
)
// undefined

match({ message: 'hello wrrld!', number: 42 })(
  when([
    // if message ends with "world!" OR number === 42
    { message: endsWith('world!') },
    { number: 42 }
  ])('ok!')
)
// "ok!"
```

Alternatively, you can use `allOf` and `anyOf`:

```js
when(allOf({ message: endsWith('world!') }, { number: 42 }))('ok!')
when(anyOf({ message: endsWith('world!') }, { number: 42 }))('ok!')
when(anyOf(1, 2, 'chili dogs'))('ok!')
```

If both `match` and `when` values are arrays, the contents will be compared (applying any predicates in the `when`):

```js
import { empty as _ } from 'match-iz'

match(['', '2', undefined])(
  when(['1', _, _])('one'),
  when([_, '2', _, _])('two, with four items'),
  when([_, '2', _])('two'),
  otherwise('nope')
)
// "two"
```

#### Regular Expressions

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

### `otherwise()`

```js
otherwise(handler)
// returns: winning value
```

Always wins, so put it at the end to deal with fallbacks.

`handler` can be a function or a literal.

## What is `spread(defined)`?

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

## What about `against()`?

It's the same as `match()`, but the order of currying is reversed.

For example, the previous `getLength` example could be:

```js
const { against, spread, defined } = matchiz
const { x, y, z } = spread(defined)

const getLength = against(
  when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
  when({ x, y })(({ x, y }) => Math.hypot(x, y)),
  otherwise(vector => vector.length)
)
```

That makes it easier to pass into a memoizer:

```js
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

...and `map`/`reduce`/`filter`:

```js
const html = lines
  .filter(
    against(
      when(/remove-this-one/)(false),
      when(/and-this-one-too/)(false),
      when(endsWith('-and-another'))(false),
      otherwise(true)
    )
  )
  .join('\n')
```

Anyway, that's all I got!

# Credits

`match-iz` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
