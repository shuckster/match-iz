import {
  isArray,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isPojo,
  instanceOf
} from './types.mjs'

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
  matched: () => found(needle, haystack),
  value: () =>
    !isFunction(handler)
      ? handler
      : isString(haystack) && isRegExp(needle)
      ? handler(haystack.match(needle))
      : handler(haystack)
})

const found = (needle, haystack) =>
  isPojo(needle)
    ? Object.keys(needle).every(key => found(needle[key], haystack?.[key]))
    : isArray(needle)
    ? isArray(haystack)
      ? needle.length === haystack.length &&
        needle.every((one, index) => found(one, haystack?.[index]))
      : needle.some(thread => found(thread, haystack))
    : isFunction(needle)
    ? needle(haystack)
    : isString(haystack) && isRegExp(needle)
    ? needle.test(haystack)
    : needle === haystack || [needle, haystack].every(Number.isNaN)

//
// Matchers
//

const not = needle => haystack => !found(needle, haystack)
const anyOf = (...these) => these.flat()
const allOf =
  (...these) =>
  haystack =>
    these.flat().every(needle => found(needle, haystack))

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
const inRange = (min, max) => ifNumber(value => value >= min && value <= max)
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

export {
  //
  // match-iz
  //
  against,
  match,
  when,
  otherwise,
  //
  // matching helpers
  //
  not,
  anyOf,
  allOf,
  defined,
  empty,
  gt,
  lt,
  gte,
  lte,
  inRange,
  startsWith,
  endsWith,
  includes,
  includedIn,
  instanceOf,
  hasOwn,
  truthy,
  falsy,
  spread,
  //
  // types
  //
  isArray,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isPojo
}
