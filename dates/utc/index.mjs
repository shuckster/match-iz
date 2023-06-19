import * as lib from 'match-iz'

const { match, against, when, otherwise } = lib
const { allOf, anyOf, every, inRange, lt, gt } = lib
const { isArray, isDate, isFunction, isNumber } = lib

import { dateSet, range, ifDate, byLastIndex, byIndex } from '../utils.mjs'

const endOfMonth = date =>
  dateSet(date)('UTCMonth')(date.getUTCMonth() + 1, 0).getUTCDate()

// https://stackoverflow.com/a/6117889/127928
const getUTCWeekNumber = date => {
  const d = dateSet(date)('UTCDate')(
    date.getUTCDate() + 4 - (date.getUTCDay() || 7)
  )
  const yearStart = dateSet(date)('UTCMonth')(0, 1)
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7)
}

const [isSun, isMon, isTue, isWed, isThu, isFri, isSat] = [...range(0, 6)].map(
  dow => ifDate(date => date.getUTCDay() === dow)
)

const [nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat] = [
  ...range(0, 6)
].map(
  dow => nth =>
    ifDate(date =>
      [...range(1, endOfMonth(date))]
        .map(dateSet(date)('UTCDate'))
        .filter(date => date.getUTCDay() === dow)
        .filter(nth < 0 ? byLastIndex(nth) : byIndex(nth - 1))
        .filter(
          allOf(
            isDay(date.getUTCDate()),
            isMonth(date.getUTCMonth() + 1),
            isYear(date.getUTCFullYear())
          )
        )
        .map(d => d.getUTCDate())
        .includes(date.getUTCDate())
    )
)

const nMonth = nth => ifDate(date => date.getUTCMonth() === nth)
const [isJan, isFeb, isMar, isApr, isMay, isJun] = [...range(0, 5)].map(nMonth)
const [isJul, isAug, isSep, isOct, isNov, isDec] = [...range(6, 11)].map(nMonth)

const isDay = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCDate()))),
  when(isNumber)(nth =>
    nth < 0
      ? ifDate(date => date.getUTCDate() === endOfMonth(date) + nth + 1)
      : ifDate(date => date.getUTCDate() === nth)
  )
)

const isMonth = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCMonth() + 1))),
  when(isNumber)(nth => ifDate(date => date.getUTCMonth() === nth - 1))
)

const isYear = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCFullYear()))),
  when(isNumber)(nth => ifDate(date => date.getUTCFullYear() === nth))
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
  when(isFunction)(pred => ifDate(date => pred(date.getUTCDay()))),
  when(isNumber)(nth => ifDate(date => date.getUTCDay() === nth))
)

const isWeekNumber = against(
  when(isFunction)(pred => ifDate(date => pred(getUTCWeekNumber(date)))),
  when(isNumber)(nth => ifDate(date => getUTCWeekNumber(date) === nth))
)

const isHour = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCHours()))),
  when(isNumber)(nth => ifDate(date => date.getUTCHours() === nth))
)

const isMinute = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCMinutes()))),
  when(isNumber)(nth => ifDate(date => date.getUTCMinutes() === nth))
)

const isSecond = against(
  when(isFunction)(pred => ifDate(date => pred(date.getUTCSeconds()))),
  when(isNumber)(nth => ifDate(date => date.getUTCSeconds() === nth))
)

const isAM = isHour(inRange(0, 11))
const isPM = isHour(inRange(12, 23))
const isMorning = isAM
const isAfternoon = isHour(inRange(12, 17))
const isEvening = isHour(inRange(18, 23))

const isTime = against(
  when(isFunction)(pred => ifDate(date => pred(date.getTime()))),
  when(isNumber)(utcMs => ifDate(date => date.getTime() === utcMs))
)

// prettier-ignore
const inTimeRange = (mul) => ([nth]) => {
  const now = Date.now()
  return isTime(inRange(now, now + (nth * mul)))
}

const msInMs = 1
const secsInMs = 1000
const minsInMs = 60 * secsInMs
const hoursInMs = 60 * minsInMs
const daysInMs = 24 * hoursInMs
const weeksInMs = 7 * daysInMs
const monthsInMs = 30 * daysInMs
const yearsInMs = 365 * daysInMs

const rxMs = /^ms|milliseconds?/i
const rxSecs = /^s|secs?|seconds?/i
const rxMins = /^(m|mins?|minutes?)$/i
const rxHours = /^h|hours?/i
const rxDays = /^d|days?/i
const rxWeeks = /^w|weeks?/i
const rxMonths = /^mo|months?/i
const rxYears = /^y|years?/i

const inThePast = (...args) =>
  match(args)(
    when([])(() => isTime(lt(Date.now()))),
    when([isNumber, rxMs])(inTimeRange(-msInMs)),
    when([isNumber, rxSecs])(inTimeRange(-secsInMs)),
    when([isNumber, rxMins])(inTimeRange(-minsInMs)),
    when([isNumber, rxHours])(inTimeRange(-hoursInMs)),
    when([isNumber, rxDays])(inTimeRange(-daysInMs)),
    when([isNumber, rxWeeks])(inTimeRange(-weeksInMs)),
    when([isNumber, rxMonths])(inTimeRange(-monthsInMs)),
    when([isNumber, rxYears])(inTimeRange(-yearsInMs)),
    otherwise(() => {
      throw new Error('inThePast: invalid arguments')
    })
  )

const inTheNext = (...args) =>
  match(args)(
    when([])(() => isTime(gt(Date.now()))),
    when([isNumber, rxMs])(inTimeRange(msInMs)),
    when([isNumber, rxSecs])(inTimeRange(secsInMs)),
    when([isNumber, rxMins])(inTimeRange(minsInMs)),
    when([isNumber, rxHours])(inTimeRange(hoursInMs)),
    when([isNumber, rxDays])(inTimeRange(daysInMs)),
    when([isNumber, rxWeeks])(inTimeRange(weeksInMs)),
    when([isNumber, rxMonths])(inTimeRange(monthsInMs)),
    when([isNumber, rxYears])(inTimeRange(yearsInMs)),
    otherwise(() => {
      throw new Error('inTheNext/inTheFuture: invalid arguments')
    })
  )

const parseDateBefore = args =>
  match(args)(
    when(anyOf(isDate, isNumber))(x => new Date(x)),
    when([isNumber])(([year]) => new Date(Date.UTC(year, 0, 1))),
    when([isNumber, isNumber])(
      ([year, month]) => new Date(Date.UTC(year, month - 1, 1))
    ),
    when(allOf(isArray, { length: inRange(3, 7) }, every(isNumber)))(
      ([year, month, day, ...rest]) =>
        new Date(Date.UTC(year, month - 1, day, ...rest))
    )
  )

const parseDateAfter = args =>
  match(args)(
    when(anyOf(isDate, isNumber))(x => new Date(x)),
    when([isNumber])(([year]) => new Date(Date.UTC(year + 1, 0, 0))),
    when([isNumber, isNumber])(
      ([year, month]) => new Date(Date.UTC(year, month, 0))
    ),
    when([isNumber, isNumber, isNumber])(
      ([year, month, day]) => new Date(Date.UTC(year, month - 1, day))
    ),
    when(allOf(isArray, { length: inRange(4, 7) }, every(isNumber)))(
      ([year, month, day, ...rest]) =>
        new Date(Date.UTC(year, month - 1, day, ...rest))
    )
  )

const isBefore = n => isTime(lt(parseDateBefore(n)))
const isAfter = n => isTime(gt(parseDateAfter(n)))

const inDay = arg => {
  const day = parseDateBefore(arg)
  return ifDate(
    x =>
      x.getUTCFullYear() === day.getUTCFullYear() &&
      x.getUTCMonth() === day.getUTCMonth() &&
      x.getUTCDate() === day.getUTCDate()
  )
}

const inMonth = arg => {
  const day = parseDateBefore(arg)
  return ifDate(
    x =>
      x.getUTCFullYear() === day.getUTCFullYear() &&
      x.getUTCMonth() === day.getUTCMonth()
  )
}

const inYear = arg => {
  const day = parseDateBefore(arg)
  return ifDate(x => x.getUTCFullYear() === day.getUTCFullYear())
}

const inDays = against(when(isArray)(xs => x => xs.some(day => inDay(day)(x))))

const inMonths = against(
  when(isArray)(xs => x => xs.some(day => inMonth(day)(x)))
)

const inYears = against(
  when(isArray)(xs => x => xs.some(day => inYear(day)(x)))
)

export { isSun, isMon, isTue, isWed, isThu, isFri, isSat }
export { nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat }
export { isJan, isFeb, isMar, isApr, isMay, isJun }
export { isJul, isAug, isSep, isOct, isNov, isDec }
export { isDay, isMonth, isYear, isLeapYear, isDayOfWeek, isWeekNumber }
export { isHour, isMinute, isSecond, isAM, isPM }
export { isMorning, isAfternoon, isEvening }
export { isTime, inThePast, inTheNext, inTheNext as inTheFuture }
export { isBefore, isAfter }
export { inDay, inMonth, inYear }
export { inDays, inMonths, inYears }
