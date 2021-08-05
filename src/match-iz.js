const {
  isArray,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isPojo
} = require('./types')

//
// match-iz
//

function match(haystack) {
  return (...needles) => against(...needles)(haystack)
}

function against(...needles) {
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
    ? Object.keys(needle).every(key => isEqual(needle[key], haystack?.[key]))
    : isArray(needle)
    ? needle.some(thread => found(thread, haystack))
    : isEqual(needle, haystack)

const isEqual = (left, right) =>
  isPojo(left)
    ? found(left, right)
    : isFunction(left)
    ? left(right)
    : isString(right) && isRegExp(left)
    ? left.test(right)
    : left === right

//
// Matchers
//

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
const truthy = value => !!value
const falsy = value => !value

//
// Helpers
//

const spread = fn => new Proxy({}, { get: () => fn })

function ifString(fn) {
  return value => isString(value) && fn(value)
}

function ifArrayOrString(fn) {
  return value => (isArray(value) || isString(value)) && fn(value)
}

function ifNumber(fn) {
  return value => isNumber(value) && fn(value)
}

module.exports = {
  // match-iz
  against,
  match,
  when,
  otherwise,

  // matching helpers
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
  truthy,
  falsy,
  spread,

  // types
  isArray,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isPojo
}
