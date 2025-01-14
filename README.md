<h1 align="center"><code>match-iz</code> 🔥</h1>

<p align="center">
  <a href="https://github.com/shuckster/match-iz/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/match-iz?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/match-iz">
    <img
      alt="Downloads per week"
      src="https://img.shields.io/npm/dw/match-iz?style=plastic"
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

- 👋 [Introduction](#introduction)
- 👩‍🏫 [Before / After Examples](#before--after-examples)
- 🏁 [Benchmarks](#benchmarks)
- 📀 [Install / Use](#install--use)
- 📖 [Documentation](https://github.com/shuckster/match-iz/wiki)
- ✍️ [Credits](#credits)
- 📃 [License](#license)

## Introduction

Pattern-matching is a declarative version of `if` and `switch`, where you describe the expected shape of your data using "patterns".

```javascript
import { match, when, otherwise } from 'match-iz'

let result = match(data)(
  when(pattern, result || handler),
  when(pattern, result || handler),
  otherwise(result || handler)
)
```

Patterns are a combination of both functions and data, and because of this certain assumptions can be made by `match-iz` to help reduce the amount of boilerplate normally required to check that your data looks a certain way:

```javascript
// Imperative:
if (typeof res?.statusCode === 'number') {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.body
  }
}

// Declarative:
return match(res)(
  when({ statusCode: inRange(200, 299) }, () => res.body),
  otherwise(() => {})
)
```

1. `match-iz` will check that `statusCode` is a key of `res` by implication of the `when()` being passed an object-literal `{ ... }`.

2. The `inRange()` pattern-helper guards against non-numbers before trying to determine if its input is within a certain range.

Many [pattern-helpers](https://github.com/shuckster/match-iz/wiki) are provided to permit you to express terse, declarative, and reusable (just pop them into variables/constants) patterns.

Here are some of the date ones:

```javascript
const isLastSundayOfMarch = allOf(nthSun(-1), isMar)
const isTheWeekend = anyOf(allOf(isFri, isEvening), isSat, isSun)

match(new Date())(
  when(isLastSundayOfMarch, () => 'Last Sunday of March: Clocks go forward'),
  when(isTheWeekend, () => 'Ladies and Gentlemen; The Weekend'),
  otherwise(dateObj => {
    return `The clock is ticking: ${dateObj.toString()}`
  })
)
```

[rest](https://github.com/shuckster/match-iz/wiki/Core-Library#rest) was introduced in `v5`:

```javascript
// For objects, use ...rest()
match({ one: 1, two: 2, three: 3 })(
  when({ one: 1, ...rest(isNumber) }, (_, rest) => {
    console.log(rest);
    // { two: 2, three: 3 }
  }),
)

// For arrays, use rest()
match([1, 2, 3])(
  when([1, rest(isNumber)], (_, rest) => {
    console.log(rest);
    // [2, 3]
  }),
)
```

You can browse a few more [examples below](#before--after-examples), and full [documentation is over on the Github Wiki](https://github.com/shuckster/match-iz/wiki).

## Before / After Examples:

- [getResponse()](#getresponse--testing-status-codes)
- [performSearch()](#performsearch--overloaded-function-call)
- [AccountPage()](#accountpage--react-component)
- [calculateExpr()](#calculateexpr--regular-expressions)

#### `getResponse` | Testing status-codes:

<details>
<summary>See imperative equivalent</summary>

```text
function getResponse(res) {
  if (res && typeof res.statusCode === 'number') {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return res.body
    } else if (res.statusCode === 404) {
      return 'Not found'
    }
  }
  throw new Error('Invalid response')
}
```

</details>

```javascript
function getResponse(res) {
  return match(res)(
    when({ statusCode: inRange(200, 299) }, () => res.body),
    when({ statusCode: 404 }, () => 'Not found'),
    otherwise(res => {
      throw new Error(`Invalid response: ${res}`)
    })
  )
}
```

#### `performSearch` | "Overloaded" function call:

<details>
<summary>See imperative equivalent</summary>

```text
function performSearch(...args) {
  const [firstArg, secondArg] = args
  if (args.length === 1) {
    if (isString(firstArg)) {
      return find({ pattern: firstArg })
    }
    if (isPojo(firstArg)) {
      return find(firstArg)
    }
  }
  if (args.length === 2 && isString(firstArg) && isPojo(secondArg)) {
    return find({ pattern: firstArg, ...secondArg })
  }
  throw new Error('Invalid arguments')
}
```

</details>

```javascript
function performSearch(...args) {
  return match(args)(
    when(eq([isString]), ([pattern]) => find({ pattern })),
    when(eq([isPojo]), ([options]) => find(options)),
    when(eq([isString, isPojo]), ([pattern, options]) =>
      find({ pattern, ...options })
    ),
    otherwise(() => {
      throw new Error('Invalid arguments')
    })
  )
}
```

#### `AccountPage` | React Component:

<details>
<summary>See imperative equivalent</summary>

```text
function AccountPage(props) {
  const { loading, error, data } = props || {}
  const logout = !loading && !error && !data
  return (
    <>
      {loading && <Loading />}
      {error && <Error {...props} />}
      {data && <Page {...props} />}
      {logout && <Logout />}
    </>
  )
}
```

</details>

```javascript
function AccountPage(props) {
  return match(props)(
    when({ loading: defined }, <Loading />),
    when({ error: defined }, <Error {...props} />),
    when({ data: defined }, <Page {...props} />),
    otherwise(<Logout />)
  )
}
```

#### `calculateExpr` | Regular Expressions:

<details>
<summary>See imperative equivalent</summary>

```text
function calculateExpr(expr) {
  const rxAdd = /(?<left>\d+) \+ (?<right>\d+)/
  const rxSub = /(?<left>\d+) \- (?<right>\d+)/
  if (typeof expr === 'string') {
    const addMatch = expr.match(rxAdd)
    if (addMatch) {
      const { left, right } = addMatch.groups
      return add(left, right)
    }
    const subMatch = expr.match(rxAdd)
    if (subMatch) {
      const { left, right } = subMatch.groups
      return subtract(left, right)
    }
  }
  throw new Error("I couldn't parse that!")
}
```

</details>

```javascript
function calculateExpr(expr) {
  return match(expr)(
    when(/(?<left>\d+) \+ (?<right>\d+)/, groups =>
      add(groups.left, groups.right)
    ),
    when(/(?<left>\d+) \- (?<right>\d+)/, groups =>
      subtract(groups.left, groups.right)
    ),
    otherwise("I couldn't parse that!")
  )
}
```

## Benchmarks 

There is a very small benchmarking suite that you can run yourself with:

```sh
pnpm run bench
```

Here's a run to give you an example without needing to go anywhere else:

```sh 
calculateExpr_vanilla         165.63 ns/iter 163.72 ns  █
                     (160.47 ns … 194.63 ns) 187.64 ns  █
                     (603.13 kb … 608.66 kb) 512.93 kb ▄█▇▂▂▂▁▁▁▁▁▁▁▁▁▂▃▂▂▁▁
calculateExpr_matchiz_match   436.82 ns/iter 441.31 ns        █
                     (418.42 ns … 689.60 ns) 479.57 ns  ▅     █▃
                     (  2.65 mb …   2.86 mb) 879.46 kb ▆█▃▂▁▂▇██▄▂▁▁▁▁▁▁▁▁▁▁
calculateExpr_matchiz_against 380.36 ns/iter 389.14 ns  █▅
                     (368.65 ns … 409.00 ns) 398.41 ns  ██▅         ██
                     (  1.71 mb …   1.73 mb) 987.37 kb ▄███▇▄▃▁▁▂▂▁▅████▃▃▃▁
calculateExpr_tspattern       803.26 ns/iter 878.30 ns  ▄           █
                       (632.93 ns … 1.24 µs) 995.19 ns  █           ██
                     (  2.32 mb …   2.34 mb) 810.93 kb ▇█▁▁▁▁▁▁▁▁▂▁▆██▃▂▁▁▂▂

                              ┌                                            ┐
        calculateExpr_vanilla ┤ 165.63 ns
  calculateExpr_matchiz_match ┤■■■■■■■■■■■■■■ 436.82 ns
calculateExpr_matchiz_against ┤■■■■■■■■■■■ 380.36 ns
      calculateExpr_tspattern ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 803.26 ns
                              └                                            ┘
```

This compares `match-iz` with `ts-pattern`.

Of course, when considering a library performance isn't the only thing that 
might concern you. `ts-pattern` can calculate static-types for the patterns 
described, while `match-iz` was written with JavaScripts dynamism in mind,
and its TypeScript support is very basic and incomplete.

# Install / Use:

```
$ pnpm i match-iz
```

```javascript
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

## Documentation

Check out the [Github Wiki for complete documentation](https://github.com/shuckster/match-iz/wiki) of the library.

## Credits

`match-iz` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
