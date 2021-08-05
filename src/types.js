const objectPrototype = Object.prototype
const toString = objectPrototype.toString
const typeOf = obj => typeof obj
const isArguments = obj => toString.call(obj) === '[object Arguments]'
const isArray = obj => Array.isArray(obj)
const isFunction = obj => typeOf(obj) === 'function'
const isNumber = obj => typeOf(obj) === 'number'
const isObject = obj => typeOf(obj) === 'object' && obj !== null
const isRegExp = obj => obj instanceof RegExp
const isString = obj => typeOf(obj) === 'string'
const isPojo = obj =>
  obj === null || !isObject(obj) || isArguments(obj)
    ? false
    : Object.getPrototypeOf(obj) === objectPrototype

module.exports = {
  isArguments,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isPojo
}
