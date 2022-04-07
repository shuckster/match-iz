import { isDate } from '../match-iz.mjs'

export const ifDate = fn => value => isDate(value) && fn(value)
export const byIndex = idx => (_, i) => i === idx
export const byLastIndex = idx => (_, i, arr) => i === arr.length + idx
export function* range(start, end) {
  for (let i = start; i <= end; i++) yield i
}
export const dateSet =
  date =>
  fnName =>
  (...args) =>
    new Date(new Date(date)[`set${fnName}`](...args))
