const objectPrototype = Object.prototype
const toString = objectPrototype.toString
const typeOf = type => obj => typeof obj === type
const instanceOf = constructor => obj => obj instanceof constructor

function named(fn, name) {
  const newFn = {
    [name]: function (...args) {
      return fn.apply(this, args);
    }
  }[name];
  Object.defineProperty(newFn, 'name', { value: name });
  return newFn;
}

const isArray = named(Array.isArray, 'isArray')
const isArguments = named(obj => toString.call(obj) === '[object Arguments]', 'isArguments')
const isDate = named(x => instanceOf(Date)(x) && !isNaN(x), 'isDate')
const isFunction = named(typeOf('function'), 'isFunction')
const isString = named(typeOf('string'), 'isString')
const isNumber = named(obj => obj === obj && typeOf('number')(obj), 'isNumber')
const isObject = named(obj => obj !== null && typeOf('object')(obj), 'isObject')
const isRegExp = named(instanceOf(RegExp), 'isRegExp')
const isSet = named(instanceOf(Set), 'isSet')
const isMap = named(instanceOf(Map), 'isMap')
const isPojo = named(obj =>
  obj === null || !isObject(obj) || isArguments(obj)
    ? false
    : Object.getPrototypeOf(obj) === objectPrototype, 'isPojo'
)

const isIterable = named(x =>
  x != null && [x[Symbol.iterator], x.next].every(isFunction), 'isIterable'
)

const isFormData = named(x =>
  typeof FormData !== 'undefined' && instanceOf(FormData)(x),
  'isFormData'
)

export { instanceOf, isArguments, isObject }
export { isArray, isNumber, isRegExp, isString }
export { isDate, isFunction, isPojo }
export { isMap, isSet, isIterable, isFormData }
