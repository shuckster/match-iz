import { against, when, allOf, inRange, anyOf } from '../../match-iz.mjs'
import { isFunction, isNumber } from '../../match-iz.mjs'
import { dateSet, range, ifDate, byLastIndex, byIndex } from '../utils.mjs'

const endOfMonth = date =>
  dateSet(date)('UTCMonth')(date.getUTCMonth() + 1, 0).getUTCDate()

// https://stackoverflow.com/a/6117889/127928
const getUTCWeekNumber = date => {
  const d = dateSet(date)('UTCDate')(
    date.getUTCDate() + 4 - (date.getUTCDay() || 7)
  )
  const yearStart = dateSet(date)('UTCMonth')(0, 1)
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
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

const isDay = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCDate())),
    when(isNumber)(nth =>
      nth < 0
        ? ifDate(date => date.getUTCDate() === endOfMonth(date) + nth + 1)
        : ifDate(date => date.getUTCDate() === nth)
    )
  )
)

const isMonth = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCMonth() + 1)),
    when(isNumber)(nth => date => date.getUTCMonth() === nth - 1)
  )
)

const isYear = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCFullYear())),
    when(isNumber)(nth => date => date.getUTCFullYear() === nth)
  )
)

const isLeapYear = ifDate(
  anyOf(
    allOf(
      isYear(x => x % 4 === 0),
      isYear(x => x % 100 !== 0)
    ),
    isYear(x => x % 400 === 0)
  )
)

const isDayOfWeek = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCDay())),
    when(isNumber)(nth => date => date.getUTCDay() === nth)
  )
)

const isWeekNumber = ifDate(
  against(
    when(isFunction)(pred => date => pred(getUTCWeekNumber(date))),
    when(isNumber)(nth => date => getUTCWeekNumber(date) === nth)
  )
)

const isHour = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCHours())),
    when(isNumber)(nth => date => date.getUTCHours() === nth)
  )
)

const isMinute = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCMinutes())),
    when(isNumber)(nth => date => date.getUTCMinutes() === nth)
  )
)

const isSecond = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getUTCSeconds())),
    when(isNumber)(nth => date => date.getUTCSeconds() === nth)
  )
)

const isAM = isHour(inRange(0, 11))
const isPM = isHour(inRange(12, 23))
const isMorning = isAM
const isAfternoon = isHour(inRange(12, 17))
const isEvening = isHour(inRange(18, 23))
const isNight = isHour(inRange(0, 7))

export { isSun, isMon, isTue, isWed, isThu, isFri, isSat }
export { nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat }
export { isJan, isFeb, isMar, isApr, isMay, isJun }
export { isJul, isAug, isSep, isOct, isNov, isDec }
export { isDay, isMonth, isYear, isLeapYear, isDayOfWeek, isWeekNumber }
export { isHour, isMinute, isSecond, isAM, isPM }
export { isMorning, isAfternoon, isEvening, isNight }
