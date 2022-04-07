import { against, when, allOf } from '../match-iz.mjs'
import { isFunction, isNumber } from '../match-iz.mjs'
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

const isDay = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getDate())),
    when(isNumber)(nth =>
      nth < 0
        ? ifDate(date => date.getDate() === endOfMonth(date) + nth + 1)
        : ifDate(date => date.getDate() === nth)
    )
  )
)

const isMonth = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getMonth() + 1)),
    when(isNumber)(nth => date => date.getMonth() === nth - 1)
  )
)

const isYear = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getFullYear())),
    when(isNumber)(nth => date => date.getFullYear() === nth)
  )
)

const isDayOfWeek = ifDate(
  against(
    when(isFunction)(pred => date => pred(date.getDay())),
    when(isNumber)(nth => date => date.getDay() === nth)
  )
)

const isWeekNumber = ifDate(
  against(
    when(isFunction)(pred => date => pred(getWeekNumber(date))),
    when(isNumber)(nth => date => getWeekNumber(date) === nth)
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

export { isSun, isMon, isTue, isWed, isThu, isFri, isSat }
export { nthSun, nthMon, nthTue, nthWed, nthThu, nthFri, nthSat }
export { isJan, isFeb, isMar, isApr, isMay, isJun }
export { isJul, isAug, isSep, isOct, isNov, isDec }
export { isDay, isMonth, isYear, isDayOfWeek, isWeekNumber }
