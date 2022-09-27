import * as lib from './types.mjs'

const { isArguments, isArray, isDate, isFunction, isNumber } = lib
const { isPojo, isRegExp, isString, instanceOf, isIterable } = lib

const { keys, entries, assign } = Object

//
// match-iz
//

let iterationLimit = 20000

export const getIterationLimit = () => iterationLimit
export const setIterationLimit = newMaxiumum => {
  const previousValue = iterationLimit
  iterationLimit = newMaxiumum
  return () => (iterationLimit = previousValue)
}

function match(haystack) {
  return (...needles) => against(...needles)(haystack)
}

const against =
  (...needles) =>
  haystack => {
    const [kind, maybeIterator] = isArguments(haystack)
      ? [{}, Array.from(haystack)]
      : instanceOf(Map)(haystack)
      ? [{ isMap: true }, haystack.entries()]
      : typeof FormData !== 'undefined' && instanceOf(FormData)(haystack)
      ? [{ isMap: true }, haystack.entries()]
      : instanceOf(Set)(haystack)
      ? [{ isSet: true }, haystack.values()]
      : [{}, haystack]

    if (!isIterable(maybeIterator)) {
      return find(...needles)(maybeIterator).result
    }

    const [otherwise, whens] = needles.reduce(
      ([o, r], x) => (isOtherwise(x) ? [x, r] : [o, [...r, x]]),
      [() => ({ value: () => {} }), []]
    )

    const consumed = []
    do {
      const { value, done } = maybeIterator.next()
      if (done) return otherwise().value()

      consumed.push(value)
      const { found, result } = find(...whens)(
        kind.isSet
          ? value
          : kind.isMap
          ? { key: value[0], value: value[1] }
          : [...consumed]
      )
      if (found) return result
    } while (consumed.length < iterationLimit || kind.isSet || kind.isMap)

    throw new Error(
      `Hit iterationLimit: ${iterationLimit}. Use setIterationLimit(Infinity) to disable.`
    )
  }

const find = (...needles) => {
  let result
  return haystack => {
    const found = !!needles.find(needle => {
      const received = needle(haystack)
      const { matched, value } = received || {}
      return [matched, value].every(isFunction)
        ? matched(haystack) && ((result = value(haystack)), true)
        : received && (result = received)
    })
    return { found, result }
  }
}

const symOtherwise = Symbol('@@match-iz/otherwise')
const isOtherwise = x => x?.[symOtherwise] === true

const otherwise = handler => {
  const matcher = haystack => ({
    matched: () => true,
    value: () => (!isFunction(handler) ? handler : handler(haystack))
  })
  matcher[symOtherwise] = true
  return matcher
}

const curriedWhen = needle => handler => haystack => ({
  matched: () => found(needle, haystack, value => (haystack = value)),
  value: () =>
    !isFunction(handler)
      ? handler
      : isString(haystack) && isRegExp(needle)
      ? handler(...argsFrom(haystack.match(needle)))
      : handler(haystack)
})

const when = (...args) => {
  if (args.length === 1) {
    const [needle] = args
    return curriedWhen(needle)
  }
  if (args.length === 2) {
    const [needle, handler] = args
    return curriedWhen(needle)(handler)
  }
  if (args.length > 2) {
    const handler = args.slice(-1)[0]
    const needles = args.slice(0, -1)
    return curriedWhen(allOf(needles))(handler)
  }
  throw new Error('expected 1 or 2 arguments')
}

const argsFrom = regExpMatchResult => {
  const { groups } = regExpMatchResult
  return groups ? [groups, regExpMatchResult] : [regExpMatchResult]
}

const found = (needle, haystack, pick) =>
  isPojo(needle)
    ? keys(needle).every(key => found(needle[key], haystack?.[key], pick))
    : isArray(needle)
    ? isArray(haystack) &&
      needle.length === haystack.length &&
      needle.every((one, index) => found(one, haystack?.[index], pick))
    : isFunction(needle)
    ? needle(haystack, pick)
    : isString(haystack) && isRegExp(needle)
    ? needle.test(haystack)
    : needle === haystack || [needle, haystack].every(Number.isNaN)

const pluck =
  (...A) =>
  (value, pick) =>
    A.length === 0 ||
    (isFunction(A[0]) ? A[0](value) : found(A[0], value, pick))
      ? (pick(value), true)
      : false

//
// Matchers
//

const equalNumberOfValues = (left, right) =>
  [left, right].every(isPojo) ? keys(left).length === keys(right).length : true

const eq = needle => (haystack, pick) =>
  equalNumberOfValues(needle, haystack) && found(needle, haystack, pick)

const deepEq = needle => walk(needle, x => (isPojo(x) ? eq(x) : x))

const not = needle => (haystack, pick) => !found(needle, haystack, pick)

const anyOf =
  (...these) =>
  (haystack, pick) =>
    these.flat().some(needle => found(needle, haystack, pick))

const allOf =
  (...these) =>
  (haystack, pick) =>
    these.flat().every(needle => found(needle, haystack, pick))

const every = needle =>
  ifArray(haystack => haystack.every(hs => found(needle, hs)))

const some = needle =>
  ifArray(haystack => haystack.some(hs => found(needle, hs)))

const firstOf = (...needles) =>
  ifArrayOrString(
    (haystack, pick) =>
      needles.length <= haystack.length &&
      found(needles, haystack.slice(0, needles.length), pick)
  )

const lastOf = (...needles) =>
  ifArrayOrString(
    (haystack, pick) =>
      needles.length <= haystack.length &&
      found(needles, haystack.slice(haystack.length - needles.length), pick)
  )

const empty = value =>
  value !== value ||
  (!value && value !== 0 && value !== false) ||
  (isArray(value) && !value.length) ||
  (isPojo(value) && !keys(value).length)

const defined = value => !empty(value)

const gt = n => ifNumber(value => value > n)
const lt = n => ifNumber(value => value < n)
const gte = n => ifNumber(value => value >= n)
const lte = n => ifNumber(value => value <= n)
const inRange = (x, y) =>
  ifNumber(v => v >= Math.min(x, y) && v <= Math.max(x, y))

const startsWith = s => ifString(value => value.startsWith(s))
const endsWith = s => ifString(value => value.endsWith(s))
const includes = o => ifArrayOrString(value => value.includes(o))
const includedIn = anyOf
const isStrictly = value => x => x === value

const hasOwn =
  (...props) =>
  haystack =>
    isPojo(haystack) &&
    (([props, keysInHaystack]) =>
      props.length && props.every(prop => keysInHaystack.includes(prop)))([
      props.flat(),
      keys(haystack)
    ])

const cata = ({ getValue, ...catas }) =>
  entries(catas).reduce(
    (acc, [type, cataFn]) =>
      assign(acc, {
        [type]: handler => haystack => ({
          matched: () => cataFn(haystack),
          value: () =>
            !isFunction(handler) ? handler : handler(getValue(haystack))
        })
      }),
    {}
  )

const truthy = value => !!value
const falsy = value => !value

//
// Helpers
//

const objWalk = fn => (acc, key) => ((acc[key] = walk(acc[key], fn)), acc)
const arrWalk = fn => item => walk(item, fn)
const walk = (obj, fn) =>
  fn(
    isPojo(obj)
      ? keys(obj).reduce(objWalk(fn), { ...obj })
      : isArray(obj)
      ? obj.map(arrWalk(fn))
      : obj
  )

const spread = fn => new Proxy({}, { get: () => fn })

const ifString = fn => value => isString(value) && fn(value)
const ifNumber = fn => value => isNumber(value) && fn(value)

const ifArray = fn => (haystack, pick) =>
  isArray(haystack) && fn(haystack, pick)

const ifArrayOrString = fn => (haystack, pick) =>
  (isArray(haystack) || isString(haystack)) && fn(haystack, pick)

//
// Expose
//

export { against, match, when, otherwise, pluck }
export { eq, deepEq, not, anyOf, allOf, firstOf, lastOf, every, some, spread }
export { cata, instanceOf, hasOwn }
export { defined, empty, truthy, falsy }
export { startsWith, endsWith, includes, includedIn }
export { gt, lt, gte, lte, inRange, isStrictly, isIterable }
export { isArray, isDate, isFunction, isNumber, isPojo, isRegExp, isString }
