import * as lib from './types.mjs'

const { isArray, isDate, isFunction, isNumber } = lib
const { isPojo, isRegExp, isString, instanceOf } = lib

//
// match-iz
//

function match(haystack) {
  return (...needles) => against(...needles)(haystack)
}

const against = (...needles) => {
  let result
  return haystack =>
    needles.find(needle => {
      const received = needle(haystack)
      const { matched, value } = received || {}
      return [matched, value].every(isFunction)
        ? matched(haystack) && ((result = value(haystack)), true)
        : received && (result = received)
    }) && result
}

const otherwise = handler => haystack => ({
  matched: () => true,
  value: () => (!isFunction(handler) ? handler : handler(haystack))
})

const when = needle => handler => haystack => ({
  matched: () => found(needle, haystack, value => (haystack = value)),
  value: () =>
    !isFunction(handler)
      ? handler
      : isString(haystack) && isRegExp(needle)
      ? handler(...argsFrom(haystack.match(needle)))
      : handler(haystack)
})

const argsFrom = regExpMatchResult => {
  const { groups } = regExpMatchResult
  return groups ? [groups, regExpMatchResult] : [regExpMatchResult]
}

const found = (needle, haystack, pick) =>
  isPojo(needle)
    ? Object.keys(needle).every(key =>
        found(needle[key], haystack?.[key], pick)
      )
    : isArray(needle)
    ? isArray(haystack)
      ? needle.length === haystack.length &&
        needle.every((one, index) => found(one, haystack?.[index], pick))
      : needle.some(thread => found(thread, haystack, pick))
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

const not = needle => (haystack, pick) => !found(needle, haystack, pick)

const anyOf =
  (...these) =>
  (haystack, pick) =>
    these.flat().some(needle => found(needle, haystack, pick))

const allOf =
  (...these) =>
  (haystack, pick) =>
    these.flat().every(needle => found(needle, haystack, pick))

const empty = value =>
  value !== value ||
  (!value && value !== 0 && value !== false) ||
  (isArray(value) && !value.length) ||
  (isPojo(value) && !Object.keys(value).length)

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

const hasOwn =
  (...props) =>
  haystack =>
    isPojo(haystack) &&
    (([props, keysInHaystack]) =>
      props.length && props.every(prop => keysInHaystack.includes(prop)))([
      props.flat(),
      Object.keys(haystack)
    ])

const cata = ({ getValue, ...catas }) =>
  Object.entries(catas).reduce(
    (acc, [type, cataFn]) =>
      Object.assign(acc, {
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

const spread = fn => new Proxy({}, { get: () => fn })

const ifString = fn => value => isString(value) && fn(value)
const ifNumber = fn => value => isNumber(value) && fn(value)
const ifArrayOrString = fn => value =>
  (isArray(value) || isString(value)) && fn(value)

//
// Expose
//

export { against, match, when, otherwise, pluck }
export { not, anyOf, allOf, spread }
export { cata, instanceOf, hasOwn }
export { defined, empty, truthy, falsy }
export { startsWith, endsWith, includes, includedIn }
export { gt, lt, gte, lte, inRange }
export { isArray, isDate, isFunction, isNumber, isPojo, isRegExp, isString }
