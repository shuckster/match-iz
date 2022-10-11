// Core
//
export { against, match, when, otherwise, pluck } from './match-iz.mjs'
export { eq, deepEq, not, anyOf, allOf, spread } from './match-iz.mjs'
export { cata, instanceOf, hasOwn } from './match-iz.mjs'
export { defined, empty, truthy, falsy } from './match-iz.mjs'
export { startsWith, endsWith, includes, includedIn } from './match-iz.mjs'
export { gt, lt, gte, lte, inRange } from './match-iz.mjs'
export { isArray, isDate, isFunction, isNumber } from './match-iz.mjs'
export { isPojo, isRegExp, isString } from './match-iz.mjs'
export { firstOf, lastOf, some, every } from './match-iz.mjs'
export { isStrictly } from './match-iz.mjs'

// Dates & times
//
export { isSun, isMon, isTue, isWed } from '../dates/index.mjs'
export { isThu, isFri, isSat } from '../dates/index.mjs'
export { nthSun, nthMon, nthTue, nthWed } from '../dates/index.mjs'
export { nthThu, nthFri, nthSat } from '../dates/index.mjs'
export { isJan, isFeb, isMar, isApr, isMay, isJun } from '../dates/index.mjs'
export { isJul, isAug, isSep, isOct, isNov, isDec } from '../dates/index.mjs'
export { isDay, isMonth, isYear, isLeapYear } from '../dates/index.mjs'
export { isDayOfWeek, isWeekNumber } from '../dates/index.mjs'

export { isHour, isMinute, isSecond, isAM, isPM } from '../dates/index.mjs'
export { isMorning, isAfternoon, isEvening } from '../dates/index.mjs'
export { isTime, inThePast, inTheNext, inTheFuture } from '../dates/index.mjs'
export { isBefore, isAfter } from '../dates/index.mjs'

// UTC dates & times
//
import { isSun, isMon, isTue, isWed } from '../dates/utc/index.mjs'
import { isThu, isFri, isSat } from '../dates/utc/index.mjs'
import { nthSun, nthMon, nthTue, nthWed } from '../dates/utc/index.mjs'
import { nthThu, nthFri, nthSat } from '../dates/utc/index.mjs'
import { isJan, isFeb, isMar, isApr } from '../dates/utc/index.mjs'
import { isMay, isJun, isJul, isAug } from '../dates/utc/index.mjs'
import { isSep, isOct, isNov, isDec } from '../dates/utc/index.mjs'
import { isDay, isMonth, isYear, isLeapYear } from '../dates/utc/index.mjs'
import { isDayOfWeek, isWeekNumber, isTime } from '../dates/utc/index.mjs'

import { isHour, isMinute, isSecond, isAM, isPM } from '../dates/utc/index.mjs'
import { isMorning, isAfternoon, isEvening } from '../dates/utc/index.mjs'
import { inThePast, inTheNext, inTheFuture } from '../dates/utc/index.mjs'
import { isBefore, isAfter } from '../dates/utc/index.mjs'

export const utc = {
  ...{ isSun, isMon, isTue, isWed },
  ...{ isThu, isFri, isSat },
  ...{ nthSun, nthMon, nthTue, nthWed },
  ...{ nthThu, nthFri, nthSat },
  ...{ isJan, isFeb, isMar, isApr, isMay, isJun },
  ...{ isJul, isAug, isSep, isOct, isNov, isDec },
  ...{ isDay, isMonth, isYear, isLeapYear },
  ...{ isDayOfWeek, isWeekNumber },

  ...{ isHour, isMinute, isSecond, isAM, isPM },
  ...{ isMorning, isAfternoon, isEvening },
  ...{ isTime, inThePast, inTheNext, inTheFuture },
  ...{ isBefore, isAfter }
}
