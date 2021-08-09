# match-iz

<p>
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

Functional, declarative `pattern-matching` inspired by the [spec proposed by TC39](https://github.com/tc39/proposal-pattern-matching).

```jsx
match(props)(
  when({ loading })(<Loading />),
  when({ error })(<Error {...props} />),
  when({ data })(<Page {...props} />),
  otherwise(<Logout />)
)
```

```js
match(vector)(
  when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
  when({ x, y })(({ x, y }) => Math.hypot(x, y)),
  otherwise(vector => vector.length)
)
```

```js
match(['', '2', undefined])(
  when(['1', _, _, _])('one'),
  when([_, '2', _, _])('two'),
  otherwise('nope')
)
```

```js
match('1 + 2')(
  when(/(?<left>\d+) \+ (?<right>\d+)/)
    (({ groups: { left, right } }) => {
      return add(left, right)
    }),

  otherwise("I couldn't parse that!")
)
```

```js
match(res)(
  when({ status: 200, headers: { 'Content-Length': isInteger } })
    (({ headers: { 'Content-Length': size } }) => {
      return `size is ${size}`
    }),

  when({ status: 404 })('JSON not found')
)
```

Also provides `against(...)(value)`:

```js
lines.filter(against(
  when(/remove-this-one/)(false), 
  when(/and-this-one-too/)(false), 
  when(endsWith('-and-another'))(false), 
  otherwise(true)
))
```

```js
const memoize = (fn, cache = new Map()) =>
  x => cache.has(x) 
     ? cache.get(x) 
     : cache.set(x, fn(x)).get(x)

const fib = memoize(
  against(
    when(lte(0))(0),
    when(1)(1),
    otherwise(x => fib(x - 1) + fib(x - 2))
  )
)

fib(35)
```

```js
const nargs = fn => (...args) => fn(args)

numbers.sort(nargs(
  against(
    when(([a, b]) => a < b)(-1),
    when(([a, b]) => a === b)(0),
    when(([a, b]) => a > b)(1)
  )
))
```

Full examples + documentation below.

## Installation, usage

```cli
$ pnpm i match-iz
```

```js
import { match, when, against, otherwise } from 'match-iz'
```

```html
<script src="https://unpkg.com/match-iz/dist/match-iz.browser.js"></script>
<script>
  const { match, when, against, otherwise } = matchiz
</script>
```

The library is about 100 SLOC, just over 1.7K minified.

## Full examples

All examples assume the following header:

```js
import * as matchiz from 'match-iz'
const { match, when, otherwise } = matchiz
```

### Fetching:

```js
const { gte, inRange } = matchiz

async function getJsonLength() {
  const res = await fetch('/json')
  return match(res)(
    // when res.status === 200, get res.headers."Content-Length"
    when({ status: 200 })
      (({ headers: { 'Content-Length': s } = {} }) => {
        return `size is ${s}`
      }),

    // Custom "pattern" predicate
    when(({ status }) => status >= 500)(() => {
      return 'Server error!'
    }),

    // Literal return instead of "handler" predicate
    when({ status: 404 })('JSON not found'),

    // when res.status >= 400...
    when({ status: gte(400) })(() => {
      return 'Flagrant error!'
    }),

    // when res.status >= 300 && res.status <= 399
    when({ status: inRange(300, 399) })(() => {
      return 'This is fine...'
    }),

    otherwise("I didn't understand that...")
  )
}
```

### Front-end component:

```jsx
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

### Regular Expressions:

```js
match('1 + 2')(
  when(/(?<firstName>\w+) (?<lastName>\w+)/)
    (({ groups: { lastName } }) => {
      return `Ahoy, Captain ${lastName}`
    }),

  when(/(?<left>\d+) \+ (?<right>\d+)/)
    (({ groups: { left, right } }) => {
      return add(left, right)
    }),

  otherwise("I couldn't parse that!")
)

function add(left, right) {
  return parseInt(left, 10) + parseInt(right, 10)
}
```

### Reducer:

```js
function todosReducer(state, action) {
  return match(action)(
    when({ type: 'set-visibility-filter' })
      (({ payload: visFilter }) => ({
        ...state,
        visFilter
      })),

    when({ type: 'add-todo' })
      (({ payload: text }) => ({
        ...state,
        todos: [...state.todos, { text, completed: false }]
      })),

    when({ type: 'toggle-todo' })
      (({ payload: index }) => ({
        ...state,
        todos: state.todos.map((todo, i) =>
          i !== index ? todo : { 
            ...todo, completed: !todo.completed 
          }
        )
      })),

    otherwise(state)
  )
}
```

### Overloading:

```js
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

### Matching array contents (since v1.5.0):

```js
const { empty: _ } = matchiz

match(['', '2', undefined])(
  when(['1', _, _])('one'),
  when([_, '2', _])('two'),
  otherwise('nope')
)
```

# Documentation

## Core: match / when / otherwise

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
// if message ends with "world!" AND number === 42
match({ message: 'hello wrrld!', number: 42 })(
  when({ message: endsWith('world!'), number: 42 })('ok!')
)
// undefined

// if message ends with "world!" OR number === 42
match({ message: 'hello wrrld!', number: 42 })(
  when([{ message: endsWith('world!') }, { number: 42 }])('ok!')
)
// "ok!"

// 1 OR 2 OR 'chili dogs'
match(2)(
  when([1, 2, 'chili dogs'])('ok!')
)
// "ok!"
```

Since v1.5.0: If both `match` and `when` values are arrays, the contents will be compared up to the length of the `when` array, applying any contained predicates:

```js
const { empty: _ } = matchiz

match(['', '2', undefined])(
  when(['1', _, _])('one'),
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

## Helpers

You can use these in your `when()` `pattern`'s:

```js
match(literal)(
  when(inRange(100, 200))( ... ),
  when(startsWith('hello'))( ... ),
  when(includes('batman'))( ... ),
  when(includes('robin'))( ... ),
  when(lte(80))( ... ),
  when(empty)( ... ),
  when(defined)( ... ),
)

match(object)(
  when({ status: inRange(100, 200) })( ... ),
  when({ text: startsWith('hello') })( ... ),
  when({ array: includes('batman') })( ... ),
  when({ string: includes('robin') })( ... ),
  when({ length: lte(80) })( ... ),
  when({ cup: empty })( ... ),
  when({ pencil: defined })( ... ),
)
```

Here's the full list:

```js
const {
  // numbers
  gt, lt, gte, lte, inRange,

  // strings
  startsWith, endsWith,

  // strings + arrays
  includes,

  // truthiness
  empty, falsy, defined, truthy
} = matchiz
```

- `gt` = greater than
- `lt` = less than
- `gte` = greater than or equal
- `lte` = less than or equal
- `inRange` = within min ... max
- `startsWith` = 'hello ...'
- `endsWith` = '... world!'
- `includes` = for arrays and strings
- `empty` = true for null, undefined, NaN, [], and {}
- `defined` = negates empty, but `false` counts as "defined"
- `truthy` = a !! check
- `falsy` = a ! check

You can make your own:

```js
const isInteger = Number.isInteger

when({ status: isInteger })('Status is an integer')
```

Since `1.4.0`, you can also use these:

```js
const {
  isArray,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isPojo,    // https://google.com/search?q=javascript+pojo
} = matchiz
```

Equality is achieved with literals:

```js
when({ number: 42 })( ... )
when('hello, world!')( ... )
when(3)( ... )
when(false)( ... )
when(null)( ... )
```

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
    when(300)('Thin'),
    when([400, 500])('Normal'),
    when([600, 700, 800])('Bold'),
    when(900)('Heavy'),
    otherwise('Not valid')
  )
)

;[100, 200, 300, 400, 500, 
  600, 700, 800, 900, 901
].forEach(size => {
  console.log(`${size} = `, fontSize(size))
})
```

...and `map`/`reduce`/`filter`:

```js
const html = lines
  .filter(against(
    when(/remove-this-one/)(false), 
    when(/and-this-one-too/)(false), 
    when(endsWith('-and-another'))(false), 
    otherwise(true)
  ))
  .join('\n')
```

Anyway, that's all I got!

# Credits

`match-iz` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
