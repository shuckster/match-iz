type TPredicate = (value: unknown) => boolean
type TPredicateOrNumber = TPredicate | number

type TTimeFrame = 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'

type TYear = [number]
type TYearMonth = [number, number]
type TYearMonthDay = [number, number, number]
type TYearMonthDayHour = [number, number, number, number]
type TYearMonthDayHourMinute = [number, number, number, number, number]
type TYearMonthDayHourMinuteSecond = [number, number, number, number, number, number]
type TYearMonthDayHourMinuteSecondMillisecond = [number, number, number, number, number, number, number]
type TDateTimeArray =
  | TYear
  | TYearMonth
  | TYearMonthDay
  | TYearMonthDayHour
  | TYearMonthDayHourMinute
  | TYearMonthDayHourMinuteSecond
  | TYearMonthDayHourMinuteSecondMillisecond

type TDateTime = TDateTimeArray | Date | number

declare module 'match-iz/dates/utc' {
  /**
   * Creates a predicate that checks the UTC hour of a Date object.
   * The hour is in 24-hour format (0-23).
   *
   * @param {number | TPredicate<number>} hourOrFn - The hour (0-23) or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, gte, otherwise } from 'match-iz';
   * import { isHour, isAfternoon } from 'match-iz/dates/utc';
   *
   * const checkHour = (date) => match(date)(
   *   when(isHour(14), () => 'It is 2 PM UTC.'),
   *   when(isAfternoon, () => 'It is the afternoon in UTC.'),
   *   when(isHour(gte(18)), () => 'It is the evening in UTC.'),
   *   otherwise(() => 'It is some other time in UTC.')
   * );
   *
   * checkHour(new Date('2025-07-05T14:30:00Z')); // 'It is 2 PM UTC.'
   * checkHour(new Date('2025-07-05T16:00:00Z')); // 'It is the afternoon in UTC.'
   */
  export function isHour(hourOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC minute of a Date object.
   *
   * @param {number | TPredicate<number>} minOrFn - The minute (0-59) or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMinute } from 'match-iz/dates/utc';
   *
   * const checkMinute = match(new Date('2025-07-05T14:30:00Z'))(
   *   when(isMinute(30), () => 'Half past the hour in UTC.'),
   *   otherwise(() => 'Not half past.')
   * ); // 'Half past the hour in UTC.'
   */
  export function isMinute(minOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC second of a Date object.
   *
   * @param {number | TPredicate<number>} secOrFn - The second (0-59) or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isSecond } from 'match-iz/dates/utc';
   *
   * const checkSecond = match(new Date('2025-07-05T14:30:15Z'))(
   *   when(isSecond(15), () => '15 seconds past.'),
   *   otherwise(() => '...')
   * ); // '15 seconds past.'
   */
  export function isSecond(secOrFn: TPredicateOrNumber): TPredicate

  /**
   * A predicate that checks if a Date object is in the AM (00:00-11:59) in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAM } from 'match-iz/dates/utc';
   *
   * const checkAM = match(new Date('2025-07-05T10:00:00Z'))(
   *   when(isAM, () => 'It is AM in UTC.'),
   *   otherwise(() => 'It is PM in UTC.')
   * ); // 'It is AM in UTC.'
   */
  export const isAM: TPredicate

  /**
   * A predicate that checks if a Date object is in the PM (12:00-23:59) in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isPM } from 'match-iz/dates/utc';
   *
   * const checkPM = match(new Date('2025-07-05T13:00:00Z'))(
   *   when(isPM, () => 'It is PM in UTC.'),
   *   otherwise(() => 'It is AM in UTC.')
   * ); // 'It is PM in UTC.'
   */
  export const isPM: TPredicate

  /**
   * A predicate that checks if a Date object is in the morning (00:00-11:59) in UTC. Alias for `isAM`.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMorning } from 'match-iz/dates/utc';
   *
   * const checkMorning = match(new Date('2025-07-05T09:00:00Z'))(
   *   when(isMorning, () => 'Good morning!'),
   *   otherwise(() => 'It is not morning.')
   * ); // 'Good morning!'
   */
  export const isMorning: TPredicate

  /**
   * A predicate that checks if a Date object is in the afternoon (12:00-17:59) in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAfternoon } from 'match-iz/dates/utc';
   *
   * const checkAfternoon = match(new Date('2025-07-05T15:00:00Z'))(
   *   when(isAfternoon, () => 'Good afternoon!'),
   *   otherwise(() => 'It is not the afternoon.')
   * ); // 'Good afternoon!'
   */
  export const isAfternoon: TPredicate

  /**
   * A predicate that checks if a Date object is in the evening (18:00-23:59) in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isEvening } from 'match-iz/dates/utc';
   *
   * const checkEvening = match(new Date('2025-07-05T20:00:00Z'))(
   *   when(isEvening, () => 'Good evening!'),
   *   otherwise(() => 'It is not the evening.')
   * ); // 'Good evening!'
   */
  export const isEvening: TPredicate

  /**
   * A predicate that checks if a Date object is a Sunday in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isSun } from 'match-iz/dates/utc';
   *
   * const checkWeekend = (date) => match(date)(
   *   when(isSun, () => 'It is Sunday in UTC.'),
   *   otherwise(() => 'Not Sunday.')
   * );
   *
   * checkWeekend(new Date('2025-07-06T00:00:00Z')); // 'It is Sunday in UTC.'
   */
  export const isSun: TPredicate

  /**
   * A predicate that checks if a Date object is a Monday in UTC.
   */
  export const isMon: TPredicate

  /**
   * A predicate that checks if a Date object is a Tuesday in UTC.
   */
  export const isTue: TPredicate

  /**
   * A predicate that checks if a Date object is a Wednesday in UTC.
   */
  export const isWed: TPredicate

  /**
   * A predicate that checks if a Date object is a Thursday in UTC.
   */
  export const isThu: TPredicate

  /**
   * A predicate that checks if a Date object is a Friday in UTC.
   */
  export const isFri: TPredicate

  /**
   * A predicate that checks if a Date object is a Saturday in UTC.
   */
  export const isSat: TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Sunday of the month in UTC.
   * A negative `nth` value counts from the end of the month.
   *
   * @param {number} nth - The nth occurrence (e.g., 1 for the first, -1 for the last).
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, allOf, otherwise } from 'match-iz';
   * import { isMay, nthSun } from 'match-iz/dates/utc';
   *
   * // Mother's Day in the US is the second Sunday in May.
   * const isMothersDay = allOf(isMay, nthSun(2));
   *
   * const checkDate = match(new Date('2025-05-11T00:00:00Z'))(
   *   when(isMothersDay, () => "Happy Mother's Day!"),
   *   otherwise(() => 'Just a regular day.')
   * ); // "Happy Mother's Day!"
   */
  export function nthSun(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Monday of the month in UTC.
   */
  export function nthMon(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Tuesday of the month in UTC.
   */
  export function nthTue(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Wednesday of the month in UTC.
   */
  export function nthWed(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Thursday of the month in UTC.
   */
  export function nthThu(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Friday of the month in UTC.
   */
  export function nthFri(nth: number): TPredicate

  /**
   * Creates a predicate that checks if a Date object is the nth Saturday of the month in UTC.
   */
  export function nthSat(nth: number): TPredicate

  /**
   * A predicate that checks if a Date object is in January in UTC.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isJan } from 'match-iz/dates/utc';
   *
   * const checkMonth = match(new Date('2025-01-15T00:00:00Z'))(
   *   when(isJan, () => 'It is January in UTC.'),
   *   otherwise(() => 'Not January.')
   * ); // 'It is January in UTC.'
   */
  export const isJan: TPredicate

  /**
   * A predicate that checks if a Date object is in February in UTC.
   */
  export const isFeb: TPredicate

  /**
   * A predicate that checks if a Date object is in March in UTC.
   */
  export const isMar: TPredicate

  /**
   * A predicate that checks if a Date object is in April in UTC.
   */
  export const isApr: TPredicate

  /**
   * A predicate that checks if a Date object is in May in UTC.
   */
  export const isMay: TPredicate

  /**
   * A predicate that checks if a Date object is in June in UTC.
   */
  export const isJun: TPredicate
  
  /**
   * A predicate that checks if a Date object is in July in UTC.
   */
  export const isJul: TPredicate

  /**
   * A predicate that checks if a Date object is in August in UTC.
   */
  export const isAug: TPredicate

  /**
   * A predicate that checks if a Date object is in September in UTC.
   */
  export const isSep: TPredicate

  /**
   * A predicate that checks if a Date object is in October in UTC.
   */
  export const isOct: TPredicate

  /**
   * A predicate that checks if a Date object is in November in UTC.
   */
  export const isNov: TPredicate

  /**
   * A predicate that checks if a Date object is in December in UTC.
   */
  export const isDec: TPredicate

  /**
   * A predicate that checks if the year of a Date object is a leap year.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isLeapYear } from 'match-iz/dates/utc';
   *
   * const checkLeapYear = (year) => match(new Date(Date.UTC(year, 0, 1)))(
   *   when(isLeapYear, () => `${year} is a leap year.`),
   *   otherwise(() => `${year} is not a leap year.`)
   * );
   *
   * checkLeapYear(2024); // '2024 is a leap year.'
   * checkLeapYear(2025); // '2025 is not a leap year.'
   */
  export const isLeapYear: TPredicate

  /**
   * Creates a predicate that checks the UTC day of the month of a Date object.
   * A negative number counts from the end of the month.
   *
   * @param {number | TPredicate<number>} dayOrFn - The day of the month (1-31) or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise, lt } from 'match-iz';
   * import { isDay } from 'match-iz/dates/utc';
   *
   * const checkDay = (date) => match(date)(
   *   when(isDay(1), () => 'First day of the month in UTC.'),
   *   when(isDay(-1), () => 'Last day of the month in UTC.'),
   *   when(isDay(lt(15)), () => 'First half of the month in UTC.'),
   *   otherwise(() => 'Second half of the month in UTC.')
   * );
   *
   * checkDay(new Date('2025-07-01T00:00:00Z')); // 'First day of the month in UTC.'
   * checkDay(new Date('2025-07-31T00:00:00Z')); // 'Last day of the month in UTC.'
   * checkDay(new Date('2025-07-10T00:00:00Z')); // 'First half of the month in UTC.'
   */
  export function isDay(dayOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC month of a Date object.
   *
   * @param {number | TPredicate<number>} monOrFn - The month (1-12) or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMonth } from 'match-iz/dates/utc';
   *
   * const checkMonth = match(new Date('2025-07-05T00:00:00Z'))(
   *   when(isMonth(7), () => 'It is July in UTC.'),
   *   otherwise(() => 'Not July.')
   * ); // 'It is July in UTC.'
   */
  export function isMonth(monOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC year of a Date object.
   *
   * @param {number | TPredicate<number>} yrOrFn - The year or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isYear } from 'match-iz/dates/utc';
   *
   * const checkYear = match(new Date('2025-07-05T00:00:00Z'))(
   *   when(isYear(2025), () => 'The year is 2025.'),
   *   otherwise(() => 'Not 2025.')
   * ); // 'The year is 2025.'
   */
  export function isYear(yrOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC day of the week of a Date object.
   * (Sunday=0, Monday=1, ..., Saturday=6).
   *
   * @param {number | TPredicate<number>} dowOrFn - The day of the week or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isDayOfWeek } from 'match-iz/dates/utc';
   *
   * const checkWeekend = match(new Date('2025-07-05T00:00:00Z'))(
   *   when(isDayOfWeek(6), () => 'It is Saturday in UTC.'),
   *   otherwise(() => 'Not Saturday.')
   * ); // 'It is Saturday in UTC.'
   */
  export function isDayOfWeek(dowOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the UTC week number of a Date object.
   *
   * @param {number | TPredicate<number>} wkNumOrFn - The week number or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isWeekNumber } from 'match-iz/dates/utc';
   *
   * const checkWeek = match(new Date('2025-01-01T00:00:00Z'))(
   *   when(isWeekNumber(1), () => 'First week of the year in UTC.'),
   *   otherwise(() => 'Not the first week.')
   * ); // 'First week of the year in UTC.'
   */
  export function isWeekNumber(wkNumOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks the time (in milliseconds since epoch) of a Date object.
   *
   * @param {number | TPredicate<number>} msOrFn - The time in milliseconds or a predicate function.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise, lt } from 'match-iz';
   * import { isTime } from 'match-iz/dates/utc';
   *
   * const checkTime = match(new Date())(
   *   when(isTime(lt(Date.now())), () => 'A time in the past.'),
   *   otherwise(() => 'Now or in the future.')
   * );
   */
  export function isTime(msOrFn: TPredicateOrNumber): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in the past.
   * If called with no arguments, it checks for any time in the past.
   *
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inThePast } from 'match-iz/dates/utc';
   *
   * const wasCreated = (date) => match(date)(
   *   when(inThePast(), () => 'Created some time in the past.'),
   *   otherwise(() => 'Created in the future?')
   * );
   *
   * wasCreated(new Date(Date.now() - 1000)); // 'Created some time in the past.'
   */
  export function inThePast(): TPredicate

  /**
   * Creates a predicate that checks if a Date object is within a specified time frame in the past.
   *
   * @param {number} n - The number of units for the time frame.
   * @param {TTimeFrame} timeFrame - The time frame ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inThePast } from 'match-iz/dates/utc';
   *
   * const wasCreated = (date) => match(date)(
   *   when(inThePast(7, 'days'), () => 'Created in the last 7 days.'),
   *   otherwise(() => 'Created more than 7 days ago.')
   * );
   *
   * wasCreated(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)); // 'Created in the last 7 days.'
   */
  export function inThePast(n: number, timeFrame: TTimeFrame): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in the future.
   * If called with no arguments, it checks for any time in the future.
   *
   * @returns {TPredicate} A predicate function.
   */
  export function inTheNext(): TPredicate

  /**
   * Creates a predicate that checks if a Date object is within a specified time frame in the future.
   *
   * @param {number} n - The number of units for the time frame.
   * @param {TTimeFrame} timeFrame - The time frame ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inTheNext } from 'match-iz/dates/utc';
   *
   * const expires = (date) => match(date)(
   *   when(inTheNext(30, 'days'), () => 'Expires in the next 30 days.'),
   *   otherwise(() => 'Does not expire in the next 30 days.')
   * );
   *
   * expires(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)); // 'Expires in the next 30 days.'
   */
  export function inTheNext(n: number, timeFrame: TTimeFrame): TPredicate

  /**
   * Alias for `inTheNext`.
   */
  export function inTheFuture(): TPredicate

  /**
   * Alias for `inTheNext`.
   */
  export function inTheFuture(n: number, timeFrame: TTimeFrame): TPredicate

  /**
   * Creates a predicate that checks if a Date object is before a specified date in UTC.
   *
   * @param {TDateTime} dateTime - The date to compare against. Can be a Date object, a timestamp, or an array `[YYYY, MM, DD, ...]`.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isBefore } from 'match-iz/dates/utc';
   *
   * const checkDeadline = match(new Date('2025-07-10T00:00:00Z'))(
   *   when(isBefore([2025, 7, 15]), () => 'Before the deadline.'),
   *   otherwise(() => 'After the deadline.')
   * ); // 'Before the deadline.'
   */
  export function isBefore(dateTime: TDateTime): TPredicate

  /**
   * Creates a predicate that checks if a Date object is after a specified date in UTC.
   *
   * @param {TDateTime} dateTime - The date to compare against. Can be a Date object, a timestamp, or an array `[YYYY, MM, DD, ...]`.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAfter } from 'match-iz/dates/utc';
   *
   * const checkStartDate = match(new Date('2025-08-01T00:00:00Z'))(
   *   when(isAfter([2025, 7, 31]), () => 'Project has started.'),
   *   otherwise(() => 'Project has not started yet.')
   * ); // 'Project has started.'
   */
  export function isAfter(dateTime: TDateTime): TPredicate

  /**
   * Creates a predicate that checks if a Date object is on the same day as the specified date in UTC.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inDay } from 'match-iz/dates/utc';
   *
   * const checkDay = match(new Date('2025-07-05T10:00:00Z'))(
   *   when(inDay([2025, 7, 5]), () => 'Today!'),
   *   otherwise(() => 'Not today.')
   * ); // 'Today!'
   */
  export function inDay(dateTime: TDateTime): TPredicate

  /**
   * Creates a predicate that checks if a Date object is on any of the specified days in UTC.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inDays } from 'match-iz/dates/utc';
   *
   * const holidays = [[2025, 1, 1], [2025, 12, 25]];
   *
   * const checkHoliday = (date) => match(date)(
   *   when(inDays(holidays), () => 'It is a holiday!'),
   *   otherwise(() => 'Not a holiday.')
   * );
   *
   * checkHoliday(new Date('2025-12-25T00:00:00Z')); // 'It is a holiday!'
   * checkHoliday(new Date('2025-07-05T00:00:00Z')); // 'Not a holiday.'
   */
  export function inDays(dateTime?: TDateTime[]): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in the same month as the specified date in UTC.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inMonth } from 'match-iz/dates/utc';
   *
   * const checkMonth = match(new Date('2025-07-15T00:00:00Z'))(
   *   when(inMonth([2025, 7, 1]), () => 'In the same month.'),
   *   otherwise(() => 'Not in the same month.')
   * ); // 'In the same month.'
   */
  export function inMonth(dateTime: TDateTime): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in any of the specified months in UTC.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inMonths } from 'match-iz/dates/utc';
   *
   * const summerMonths = [[2025, 6, 1], [2025, 7, 1], [2025, 8, 1]];
   *
   * const checkSummer = (date) => match(date)(
   *   when(inMonths(summerMonths), () => 'Summertime!'),
   *   otherwise(() => 'Not summer.')
   * );
   *
   * checkSummer(new Date('2025-07-20T00:00:00Z')); // 'Summertime!'
   */
  export function inMonths(dateTime?: TDateTime[]): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in the same year as the specified date in UTC.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inYear } from 'match-iz/dates/utc';
   *
   * const checkYear = match(new Date('2025-07-05T00:00:00Z'))(
   *   when(inYear([2025]), () => 'In 2025.'),
   *   otherwise(() => 'Not in 2025.')
   * ); // 'In 2025.'
   */
  export function inYear(dateTime: TDateTime): TPredicate

  /**
   * Creates a predicate that checks if a Date object is in any of the specified years in UTC.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicate} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inYears } from 'match-iz/dates/utc';
   *
   * const recentYears = [[2023], [2024], [2025]];
   *
   * const checkRecent = (date) => match(date)(
   *   when(inYears(recentYears), () => 'A recent year.'),
   *   otherwise(() => 'An older year.')
   * );
   *
   * checkRecent(new Date('2024-01-01T00:00:00Z')); // 'A recent year.'
   */
  export function inYears(dateTime?: TDateTime[]): TPredicate
}
