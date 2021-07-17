const objectPrototype = Object.prototype
const typeOf = obj => typeof obj
const toString = objectPrototype.toString
const isArguments = obj => toString.call(obj) === '[object Arguments]'
const isFunction = obj => typeOf(obj) === 'function'
const isObject = obj => typeOf(obj) === 'object' && obj !== null
const isArray = obj => Array.isArray(obj)
const isRegExp = obj => obj instanceof RegExp
const isString = obj => typeOf(obj) === 'string'
const isNumber = obj => typeOf(obj) === 'number'
const isPojo = obj =>
  obj === null || !isObject(obj) || isArguments(obj)
    ? false
    : Object.getPrototypeOf(obj) === objectPrototype

module.exports = {
  isArguments,
  isFunction,
  isObject,
  isArray,
  isRegExp,
  isString,
  isNumber,
  isPojo
}
