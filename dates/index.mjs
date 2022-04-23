import * as lib from 'match-iz'
import { isTime } from 'match-iz/dates/utc'

const { match, against, when } = lib
const { allOf, anyOf, every, inRange, gt, lt } = lib
const { isArray, isDate, isFunction, isNumber } = lib

import { dateSet, range, ifDate, byLastIndex, byIndex } from './utils.mjs'

const endOfMonth = date =>
  dateSet(date)('Month')(date.getMonth() + 1, 0).getDate()

// https://stackoverflow.com/a/6117889/127928
const getWeekNumber = date => {
  const d = dateSet(date)('Date')(date.getDate() + 4 - (date.getDay() || 7))
  const yearStart = dateSet(date)('Month')(0, 1)
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

const [isSun, isMon, isTue, isWed, isThu, isFri, isSat] = [...range(0, 6)].map(
  dow => ifDate(date => date.getDay() === dow)
)

const [nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat] = [
  ...range(0, 6)
].map(
  dow => nth =>
    ifDate(date =>
      [...range(1, endOfMonth(date))]
        .map(dateSet(date)('Date'))
        .filter(date => date.getDay() === dow)
        .filter(nth < 0 ? byLastIndex(nth) : byIndex(nth - 1))
        .filter(
          allOf(
            isDay(date.getDate()),
            isMonth(date.getMonth() + 1),
            isYear(date.getFullYear())
          )
        )
        .map(d => d.getDate())
        .includes(date.getDate())
    )
)

const nMonth = nth => ifDate(date => date.getMonth() === nth)
const [isJan, isFeb, isMar, isApr, isMay, isJun] = [...range(0, 5)].map(nMonth)
const [isJul, isAug, isSep, isOct, isNov, isDec] = [...range(6, 11)].map(nMonth)

const isDay = against(
  when(isFunction)(pred => ifDate(date => pred(date.getDate()))),
  when(isNumber)(nth =>
    nth < 0
      ? ifDate(date => date.getDate() === endOfMonth(date) + nth + 1)
      : ifDate(date => date.getDate() === nth)
  )
)

const isMonth = against(
  when(isFunction)(pred => ifDate(date => pred(date.getMonth() + 1))),
  when(isNumber)(nth => ifDate(date => date.getMonth() === nth - 1))
)

const isYear = against(
  when(isFunction)(pred => ifDate(date => pred(date.getFullYear()))),
  when(isNumber)(nth => ifDate(date => date.getFullYear() === nth))
)

const isLeapYear = ifDate(
  anyOf(
    isYear(x => x % 400 === 0),
    allOf(
      isYear(x => x % 4 === 0),
      isYear(x => x % 100 !== 0)
    )
  )
)

const isDayOfWeek = against(
  when(isFunction)(pred => ifDate(date => pred(date.getDay()))),
  when(isNumber)(nth => ifDate(date => date.getDay() === nth))
)

const isWeekNumber = against(
  when(isFunction)(pred => ifDate(date => pred(getWeekNumber(date)))),
  when(isNumber)(nth => ifDate(date => getWeekNumber(date) === nth))
)

const isHour = against(
  when(isFunction)(pred => ifDate(date => pred(date.getHours()))),
  when(isNumber)(nth => ifDate(date => date.getHours() === nth))
)

const isMinute = against(
  when(isFunction)(pred => ifDate(date => pred(date.getMinutes()))),
  when(isNumber)(nth => ifDate(date => date.getMinutes() === nth))
)

const isSecond = against(
  when(isFunction)(pred => ifDate(date => pred(date.getSeconds()))),
  when(isNumber)(nth => ifDate(date => date.getSeconds() === nth))
)

const isAM = isHour(inRange(0, 11))
const isPM = isHour(inRange(12, 23))
const isMorning = isAM
const isAfternoon = isHour(inRange(12, 17))
const isEvening = isHour(inRange(18, 23))

const parseDateBefore = args =>
  match(args)(
    when(anyOf(isDate, isNumber))(x => new Date(x)),
    when([isNumber])(([year]) => new Date(year, 0, 1)),
    when([isNumber, isNumber])(([year, month]) => new Date(year, month - 1, 1)),
    when(allOf(isArray, { length: inRange(3, 7) }, every(isNumber)))(
      ([year, month, day, ...rest]) => new Date(year, month - 1, day, ...rest)
    )
  )

const parseDateAfter = args =>
  match(args)(
    when(anyOf(isDate, isNumber))(x => new Date(x)),
    when([isNumber])(([year]) => new Date(year + 1, 0, 0)),
    when([isNumber, isNumber])(([year, month]) => new Date(year, month, 0)),
    when(allOf(isArray, { length: inRange(3, 7) }, every(isNumber)))(
      ([year, month, day, ...rest]) =>
        new Date(year, month - 1, day + 1, ...rest)
    )
  )

const isBefore = n => isTime(lt(parseDateBefore(n)))
const isAfter = n => isTime(gt(parseDateAfter(n)))

export { isSun, isMon, isTue, isWed, isThu, isFri, isSat }
export { nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat }
export { isJan, isFeb, isMar, isApr, isMay, isJun }
export { isJul, isAug, isSep, isOct, isNov, isDec }
export { isDay, isMonth, isYear, isLeapYear, isDayOfWeek, isWeekNumber }
export { isHour, isMinute, isSecond, isAM, isPM }
export { isMorning, isAfternoon, isEvening }
export { isTime, inThePast, inTheNext, inTheFuture } from 'match-iz/dates/utc'
export { isBefore, isAfter }
