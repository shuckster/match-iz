const objectPrototype = Object.prototype
const toString = objectPrototype.toString
const typeOf = type => obj => typeof obj === type
const instanceOf = constructor => obj => obj instanceof constructor

const { isArray } = Array
const isArguments = obj => toString.call(obj) === '[object Arguments]'
const isDate = x => instanceOf(Date)(x) && !isNaN(x)
const isFunction = typeOf('function')
const isString = typeOf('string')
const isNumber = obj => obj === obj && typeOf('number')(obj)
const isObject = obj => obj !== null && typeOf('object')(obj)
const isRegExp = instanceOf(RegExp)
const isSet = instanceOf(Set)
const isMap = instanceOf(Map)
const isPojo = obj =>
  obj === null || !isObject(obj) || isArguments(obj)
    ? false
    : Object.getPrototypeOf(obj) === objectPrototype

const isIterable = x =>
  x != null && [x[Symbol.iterator], x.next].every(isFunction)

const isFormData = x =>
  typeof FormData !== 'undefined' && instanceOf(FormData)(x)

export { instanceOf, isArguments, isObject }
export { isArray, isNumber, isRegExp, isString }
export { isDate, isFunction, isPojo }
export { isMap, isSet, isIterable, isFormData }
