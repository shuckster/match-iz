const {
  isFunction,
  isRegExp,
  isPojo,
  isArray,
  isString,
  isNumber
} = require('./types')

//
// match-iz
//

function against(...fns) {
  let result
  return match =>
    fns.find(run => {
      const received = run(match)
      const { matched, value } = received || {}
      return [matched, value].every(isFunction)
        ? matched(match) && ((result = value(match)), true)
        : received && (result = received)
    }) && result
}

function match(value) {
  return (...fns) => against(...fns)(value)
}

const when = pattern => handler => value => ({
  matched: () => valueMatches(pattern, value),
  value: () =>
    !isFunction(handler)
      ? handler
      : isString(value) && isRegExp(pattern)
      ? handler(value.match(pattern))
      : handler(value)
})

const otherwise = handler => value => ({
  matched: () => true,
  value: () => (!isFunction(handler) ? handler : handler(value))
})

const valueMatches = (pattern, value) =>
  isPojo(pattern)
    ? Object.keys(pattern).every(key => isEqual(pattern[key], value?.[key]))
    : isArray(pattern)
    ? pattern.some(subPattern => valueMatches(subPattern, value))
    : isEqual(pattern, value)

const isEqual = (left, right) =>
  isPojo(left)
    ? valueMatches(left, right)
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

const gt = m => ifNumber(value => value > m)
const lt = m => ifNumber(value => value < m)
const gte = m => ifNumber(value => value >= m)
const lte = m => ifNumber(value => value <= m)
const inRange = (min, max) => ifNumber(value => value >= min && value <= max)
const startsWith = m => ifString(value => value.startsWith(m))
const endsWith = m => ifString(value => value.endsWith(m))
const includes = m => ifArrayOrString(value => value.includes(m))
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
  against,
  match,
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
  when,
  otherwise
}
