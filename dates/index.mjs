import {
  match,
  against,
  when,
  allOf,
  inRange,
  anyOf,
  isFunction,
  isNumber
} from 'match-iz'

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

const isDate = (...args) =>
  match(args)(
    when([isFunction])(pred =>
      ifDate(date =>
        pred(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    ),
    when([isNumber, isNumber, isNumber])(([year, month, day]) =>
      allOf(isYear(year), isMonth(month), isDay(day))
    ),
    when([isNumber, isNumber])(([year, month]) =>
      allOf(isYear(year), isMonth(month))
    ),
    when([isNumber])(([year]) => isYear(year))
  )

const isTime = (...args) =>
  match(args)(
    when([isFunction])(pred =>
      ifDate(date =>
        pred(date.getHours(), date.getMinutes(), date.getSeconds())
      )
    ),
    when([isNumber, isNumber, isNumber])(([hour, minute, second]) =>
      allOf(isHour(hour), isMinute(minute), isSecond(second))
    ),
    when([isNumber, isNumber])(([hour, minute]) =>
      allOf(isHour(hour), isMinute(minute))
    ),
    when([isNumber])(([hour]) => isHour(hour))
  )

export { isSun, isMon, isTue, isWed, isThu, isFri, isSat }
export { nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat }
export { isJan, isFeb, isMar, isApr, isMay, isJun }
export { isJul, isAug, isSep, isOct, isNov, isDec }
export { isDay, isMonth, isYear, isLeapYear, isDayOfWeek, isWeekNumber }
export { isHour, isMinute, isSecond, isAM, isPM }
export { isMorning, isAfternoon, isEvening }
export { isDate, isTime }
