const objectPrototype = Object.prototype
const toString = objectPrototype.toString
const typeOf = type => obj => typeof obj === type
const isArguments = obj => toString.call(obj) === '[object Arguments]'
const isArray = Array.isArray
const isFunction = typeOf('function')
const isNumber = typeOf('number')
const isString = typeOf('string')
const isObject = obj => obj !== null && typeOf('object')(obj)
const isRegExp = obj => obj instanceof RegExp
const isPojo = obj =>
  obj === null || !isObject(obj) || isArguments(obj)
    ? false
    : Object.getPrototypeOf(obj) === objectPrototype

export {
  isArguments,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isPojo
}
