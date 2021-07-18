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

const otherwise = handler => value =>
  isFunction(handler) ? handler(value) : handler

const valueMatches = (pattern, value) =>
  isPojo(pattern)
    ? Object.keys(pattern).every(key => isEqual(pattern[key], value[key]))
    : isArray(pattern)
    ? pattern.some(subPattern => valueMatches(subPattern, value))
    : isEqual(pattern, value)

const isEqual = (left, right) =>
  isFunction(left)
    ? left(right)
    : isString(right) && isRegExp(left)
    ? left.test(right)
    : left === right

//
// Matchers
//

const defined = value => !!value
const empty = value =>
  (!value && value !== 0) ||
  (isArray(value) && !value.length) ||
  (isPojo(value) && !Object.keys(value).length)

const gt = m => ifNumber(value => value > m)
const lt = m => ifNumber(value => value < m)
const gte = m => ifNumber(value => value >= m)
const lte = m => ifNumber(value => value <= m)
const inRange = ifNumber((min, max) => value => value >= min && value <= max)
const startsWith = m => ifString(value => value.startsWith(m))
const endsWith = m => ifString(value => value.endsWith(m))
const includes = m => ifArrayOrString(value => value.includes(m))

//
// Helpers
//

const spread = fn => new Proxy({}, { get: () => fn })

function ifString(fn) {
  return (...n) => n.every(isString) && fn(...n)
}

function ifArrayOrString(fn) {
  return (...n) => n.every(x => isArray(x) || isString(x)) && fn(...n)
}

function ifNumber(fn) {
  return (...n) => n.every(isNumber) && fn(...n)
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
  spread,
  when,
  otherwise
}
