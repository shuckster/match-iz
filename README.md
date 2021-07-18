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

Full examples + documentation below.

## Installation, usage

```cli
$ pnpm i match-iz
```

```js
import { match, when, against, otherwise } from 'match-iz'
```

The library is about 100 SLOC, just over 1.2K minified.

## Examples

All examples assume the following header:

```js
import * as lib from 'match-iz'
const { match, when, otherwise } = lib
```

### Front-end component:

```jsx
const { spread, defined } = lib

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

### Fetching:

```js
const { gte, inRange } = lib

async function getJsonLength() {
  const res = await fetch('/json')
  return match(res)(
    // Object prop match + destructuring return value
    when({ status: 200 })(({ headers: { 'Content-Length': s } = {} }) => {
      return `size is ${s}`
    }),

    // Custom predicate
    when(({ status }) => status >= 500)(() => {
      return 'Server error!'
    }),

    // Object prop match, literal return instead of function
    when({ status: 404 })('JSON not found'),

    // greater-than-or-equal matcher
    when({ status: gte(400) })(() => {
      return 'Flagrant error!'
    }),

    // range matcher
    when({ status: inRange(300, 399) })(() => {
      return 'This is fine...'
    }),

    otherwise("I didn't understand that...")
  )
}
```

### Reducer:

```js
function todosReducer(state, action) {
  return match(action)(
    when({ type: 'set-visibility-filter' })(({ payload }) => ({
      ...state,
      visFilter: payload
    })),

    when({ type: 'add-todo' })(({ payload: text }) => ({
      ...state,
      todos: [...state.todos, { text, completed: false }]
    })),

    when({ type: 'toggle-todo' })(({ payload: index }) => ({
      ...state,
      todos: state.todos.map((todo, i) =>
        i !== index ? todo : { ...todo, completed: !todo.completed }
      )
    })),

    otherwise(state)
  )
}
```

### Overloading, sort-of:

```js
const { spread, defined } = lib

function getLength(vector) {
  const { x, y, z } = spread(defined)

  return match(vector)(
    when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
    when({ x, y })(({ x, y }) => Math.hypot(x, y)),
    otherwise(vector => vector.length)
  )
}
```

### Regular Expressions:

```js
match('1 + 2')(
  when(/(?<firstName>\w+) (?<lastName>\w+)/)(({ groups: { lastName } }) => {
    return `Ahoy, Captain ${lastName}`
  }),

  when(/(?<left>\d+) \+ (?<right>\d+)/)(({ groups: { left, right } }) => {
    return add(left, right)
  }),

  otherwise("I couldn't parse that!")
)

function add(left, right) {
  return parseInt(left, 10) + parseInt(right, 10)
}
```

# Documentation

## Core: `match` / `when` / `otherwise`

### `match()`

```js
match(value)(...predicates)
// returns: winning value
```

Each predicate will receive the `value` passed to `match()`.

The first predicate to return a truthy value wins, and `match` returns it.

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
- `value()` retrieves the result

#### RegExp

```js
match('hello, world!')(
  when(/world/)(matches => {
    return matches
  })
)
// [ 'world', index: 7, input: 'hello, world!', groups: undefined ]
```

When passing a `RegExp` to `when`, notice that the first argument to `handler` is not the `value` from `match()`, but the result of running `value.match(/world/)`.

### `otherwise()`

```js
otherwise(handler)
// winning value
```

Essentially `when` without a `pattern`.

`handler` can be a function or a literal (same as for `when`.)

## Helpers

You can use these in your `when`'s:

```js
const { gt, lt, gte, lte, inRange, startsWith, endsWith, includes } = lib
```

- `gt` = greater than
- `lt` = less than
- `gte` = greater than or equal
- `lte` = less than or equal
- `inRange` = min to max
- `startsWith` = 'hello ...'
- `endsWith` = '... world!'
- `includes` = for arrays and strings
- `empty` = falsy matcher
- `defined` = truthy matcher

Use them like this:

```js
match(literal)(
  when(inRange(100, 200)),
  when(startsWith('hello')),
  when(includes('batman')),
  when(includes('robin')),
  when(lte(80)),
  when(empty()),
  when(defined())
)

match(object)(
  when({ status: inRange(100, 200) }),
  when({ text: startsWith('hello') }),
  when({ array: includes('batman') }),
  when({ string: includes('robin') }),
  when({ length: lte(80) }),
  when({ cup: empty() }),
  when({ pencil: defined() })
)
```

Equality is achieved with literals:

```js
when({ message: 'hello, world!', number: 42 })
when('hello, world!')
when(3)
when(false)
when(null)
```

In addition to the regular-expression matching outlined in the [example above](#regular-expressions), you can match object-props too:

```js
when({ text: /world/ })
```

For object-props, you won't receive the regular-expression match-results array in the handler.

## What is `spread(defined)`?

I added this helper because the [TC39 spec](https://github.com/tc39/proposal-pattern-matching) proposes both conditional _and_ destructuring behaviour within the same syntax:

```js
// checks that `error` is truthy, and destructures
// it for use in the winning block:
when ({ error }) { <Error error={error} />; }
```

Very concise!

We can't do that with current syntax unfortunately, but we can lean on [Object initializer notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) to help get close:

```js
const { defined } = lib

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

It's the same as `match`, but the order of currying is reversed.

For example, the previous `getLength` example could be:

```js
const { against, spread, defined } = lib
const { x, y, z } = spread(defined)

const getLength = against(
  when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
  when({ x, y })(({ x, y }) => Math.hypot(x, y)),
  otherwise(vector => vector.length)
)
```

I guess that makes it easier to pass into a memoizer.

Anyway, that's all I got!

# Credits

`match-iz` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
