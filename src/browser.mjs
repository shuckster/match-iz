// Core
//
export { against, match, when, otherwise, pluck } from './match-iz.mjs'
export { not, anyOf, allOf, spread } from './match-iz.mjs'
export { cata, instanceOf, hasOwn } from './match-iz.mjs'
export { defined, empty, truthy, falsy } from './match-iz.mjs'
export { startsWith, endsWith, includes, includedIn } from './match-iz.mjs'
export { gt, lt, gte, lte, inRange } from './match-iz.mjs'
export { isArray, isDate, isFunction, isNumber } from './match-iz.mjs'
export { isPojo, isRegExp, isString } from './match-iz.mjs'

// Dates
//
export { isSun, isMon, isTue, isWed } from './dates/index.mjs'
export { isThu, isFri, isSat } from './dates/index.mjs'
export { nthSun, nthMon, nthTue, nthWed } from './dates/index.mjs'
export { nthThu, nthFri, nthSat } from './dates/index.mjs'
export { isJan, isFeb, isMar, isApr, isMay, isJun } from './dates/index.mjs'
export { isJul, isAug, isSep, isOct, isNov, isDec } from './dates/index.mjs'
export { isDay, isMonth, isYear } from './dates/index.mjs'
export { isDayOfWeek, isWeekNumber } from './dates/index.mjs'

// UTC dates
//
import { isSun, isMon, isTue, isWed } from './dates/index.mjs'
import { isThu, isFri, isSat } from './dates/index.mjs'
import { nthSun, nthMon, nthTue, nthWed } from './dates/index.mjs'
import { nthThu, nthFri, nthSat } from './dates/index.mjs'
import { isJan, isFeb, isMar, isApr, isMay, isJun } from './dates/index.mjs'
import { isJul, isAug, isSep, isOct, isNov, isDec } from './dates/index.mjs'
import { isDay, isMonth, isYear } from './dates/index.mjs'
import { isDayOfWeek, isWeekNumber } from './dates/index.mjs'

export const utc = {
  ...{ isSun, isMon, isTue, isWed },
  ...{ isThu, isFri, isSat },
  ...{ nthSun, nthMon, nthTue, nthWed },
  ...{ nthThu, nthFri, nthSat },
  ...{ isJan, isFeb, isMar, isApr, isMay, isJun },
  ...{ isJul, isAug, isSep, isOct, isNov, isDec },
  ...{ isDay, isMonth, isYear },
  ...{ isDayOfWeek, isWeekNumber }
}
