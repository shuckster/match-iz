<h1 align="center">match-iz</h1>

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

```js
import { match, when, otherwise } from 'match-iz'

match(haystack)(
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  when(needle / predicate)(result / handler),
  otherwise(result / handler)
)
```

`when` is curried, so you can write:

```js
const whenString = when(x => typeof x === 'string')
const whenNumber = when(x => typeof x === 'number')

const result = match(42)(
  whenString("it's a string!"),
  whenNumber("it's a number!"),
  otherwise("sorry, it's neither of those!")
)
// "it's a number!"
```

`match` is curried too, but the data-last version `against` is probably what you want for a curried use-case:

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

## Install / Use:

UMD:

```html
<script src="https://unpkg.com/match-iz/dist/match-iz.browser.js"></script>
<script>
  const { match, when, against, otherwise, pluck, ...etc } = matchiz
</script>
```

ESM:

```js
import * as matchiz from 'match-iz'

const { match, when, otherwise, pluck } = matchiz
const { gte, inRange } = matchiz

// Example using gte/inRange helpers (documented below)
const getJsonLength = async (url = '/json') =>
  match(await fetch(url))(
    when({ status: 200, headers: { 'Content-Length': pluck() } })(
      contentLength => `size is ${contentLength}`
    ),

    when(function ({ status }) {
      return status >= 500
    })('Server error!'),

    when({ status: 404 })('JSON not found'),

    when({ status: pluck(gte(400)) })(
      status => `Error! We plucked the >=400 code and it is: ${status}`
    ),

    when({ status: inRange(300, 399) })(() => {
      return 'This is fine...'
    }),

    otherwise("I didn't understand that...")
  )
```

## A Few Examples:

### Front-end component:

```jsx
match(props)(
  when({ loading })(<Loading />),
  when({ error })(<Error {...props} />),
  when({ data })(<Page {...props} />),
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
import { match, when, otherwise, pluck: $ } from 'match-iz'

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

### Regular Expressions:

```js
match('1 + 2')(
  // Groups extracted automatically if specified
  // (second argument will be the full-match)
  //       /__\            /___\
  when(/(?<left>\d+) \+ (?<right>\d+)/)
    (({ left, right }, fullMatch) => {
      return add(left, right)
    }),

  otherwise("I couldn't parse that!")
)
// 3
```

<details>
<summary>Full example</summary>

```js
import { match, when, otherwise } from 'match-iz'

match('1 + 2')(
  when(/(?<firstName>\w+) (?<lastName>\w+)/)
    (({ lastName }, fullMatch) => {
      return `Ahoy, Captain ${lastName}`
    }),

  when(/(?<left>\d+) \+ (?<right>\d+)/)
    (({ left, right }, fullMatch) => {
      return add(left, right)
    }),

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
import { against, when, otherwise } from 'match-iz'

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
  return fn =>
    (...args) =>
      fn(args)
}
```

</details>

&nbsp;

# Documentation

## Helpers

You can use these in your `when()`'s:

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

Here's the full list:

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

```js
const { gt, lt, etc... } = matchiz
```

| Helper                             | Meaning                                        |
| ---------------------------------- | ---------------------------------------------- |
| `gt(0)`                            | greater than                                   |
| `lt(0)`                            | less than                                      |
| `gte(0)`                           | greater than or equal                          |
| `lte(0)`                           | less than or equal                             |
| `inRange(0, 10)`                   | within min ... max                             |
| `startsWith('hello ...')`          | -                                              |
| `endsWith('... world!')`           | -                                              |
| `includes(item)`                   | for arrays and strings                         |
| `includedIn([these, things, ...])` | -                                              |
| `instanceOf(constructor)`          | for class instances                            |
| `hasOwn('prop1', 'prop2'...)`      | check for existence of object keys/props       |
| `empty`                            | null, undefined, NaN, [], or {}                |
| `defined`                          | negates empty, but `false` counts as "defined" |
| `truthy`                           | a !! check                                     |
| `falsy`                            | a ! check                                      |

You can make your own:

```js
const isInteger = Number.isInteger

match(status)(
  when({ status: isInteger })('status is an integer'),
  otherwise('nope')
)
```

Examples:

```js
const { not } = matchiz

match(literal)(
  when(not(inRange(100, 200)))( ... ),
  when({ number: not(42) })( ... )
)

const { allOf, anyOf, includedIn } = matchiz

match(literal)(
  when(allOf(isNumber, x => x > 10))( ... ),
  when({ number: not(anyOf(20, 30)) })( ... )
  when(includedIn([40, 50]))( ... )
)
```

Equality is achieved with literals:

```js
when({ number: 42 })( ... )
when('hello, world!')( ... )
when(3)( ... )
when(false)( ... )
when(null)( ... )
```

## match / when / otherwise

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

// Alternatively, you can use `allOf` and `anyOf`:
when(allOf({ message: endsWith('world!') }, { number: 42 }))('ok!')
when(anyOf({ message: endsWith('world!') }, { number: 42 }))('ok!')
when(anyOf(1, 2, 'chili dogs'))('ok!')
```

If both `match` and `when` values are arrays, the contents will be compared (applying any predicates in the `when`):

```js
const { empty: _ } = matchiz

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
// ^ 1 :: [ 'world', index: 7, input: 'hello, world!', groups: undefined ]

match({ text: 'hello, world!' })(
  when({ text: /world/ })(obj => {
    return obj
  })
)
// ^ 2 :: { text: 'hello, world!' }
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
const { defined } = matchiz

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
