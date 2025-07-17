import type { TPredicateAsserting } from '../common'
import type { TPredicateOrNumber, TTimeFrame, TDateTime } from './common'

declare module 'match-iz/dates' {
  /**
   * Creates a predicate that checks the hour of a Date object.
   * The hour is in 24-hour format (0-23).
   *
   * @param {number | TPredicate<number>} hourOrFn - The hour (0-23) or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, gte, otherwise } from 'match-iz';
   * import { isHour, isAfternoon } from 'match-iz/dates';
   *
   * const checkHour = (date) => match(date)(
   *   when(isHour(14), () => 'It is 2 PM.'),
   *   when(isAfternoon, () => 'It is the afternoon.'),
   *   when(isHour(gte(18)), () => 'It is the evening.'),
   *   otherwise(() => 'It is some other time.')
   * );
   *
   * checkHour(new Date('2025-07-05T14:30:00')); // 'It is 2 PM.'
   * checkHour(new Date('2025-07-05T16:00:00')); // 'It is the afternoon.'
   */
  export function isHour(hourOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the minute of a Date object.
   *
   * @param {number | TPredicate<number>} minOrFn - The minute (0-59) or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMinute } from 'match-iz/dates';
   *
   * const checkMinute = match(new Date('2025-07-05T14:30:00'))(
   *   when(isMinute(30), () => 'Half past the hour.'),
   *   otherwise(() => 'Not half past.')
   * ); // 'Half past the hour.'
   */
  export function isMinute(minOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the second of a Date object.
   *
   * @param {number | TPredicate<number>} secOrFn - The second (0-59) or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isSecond } from 'match-iz/dates';
   *
   * const checkSecond = match(new Date('2025-07-05T14:30:15'))(
   *   when(isSecond(15), () => '15 seconds past.'),
   *   otherwise(() => '...')
   * ); // '15 seconds past.'
   */
  export function isSecond(secOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in the AM (00:00-11:59).
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAM } from 'match-iz/dates';
   *
   * const checkAM = match(new Date('2025-07-05T10:00:00'))(
   *   when(isAM, () => 'It is AM.'),
   *   otherwise(() => 'It is PM.')
   * ); // 'It is AM.'
   */
  export const isAM: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in the PM (12:00-23:59).
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isPM } from 'match-iz/dates';
   *
   * const checkPM = match(new Date('2025-07-05T13:00:00'))(
   *   when(isPM, () => 'It is PM.'),
   *   otherwise(() => 'It is AM.')
   * ); // 'It is PM.'
   */
  export const isPM: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in the morning (00:00-11:59). Alias for `isAM`.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMorning } from 'match-iz/dates';
   *
   * const checkMorning = match(new Date('2025-07-05T09:00:00'))(
   *   when(isMorning, () => 'Good morning!'),
   *   otherwise(() => 'It is not morning.')
   * ); // 'Good morning!'
   */
  export const isMorning: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in the afternoon (12:00-17:59).
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAfternoon } from 'match-iz/dates';
   *
   * const checkAfternoon = match(new Date('2025-07-05T15:00:00'))(
   *   when(isAfternoon, () => 'Good afternoon!'),
   *   otherwise(() => 'It is not the afternoon.')
   * ); // 'Good afternoon!'
   */
  export const isAfternoon: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in the evening (18:00-23:59).
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isEvening } from 'match-iz/dates';
   *
   * const checkEvening = match(new Date('2025-07-05T20:00:00'))(
   *   when(isEvening, () => 'Good evening!'),
   *   otherwise(() => 'It is not the evening.')
   * ); // 'Good evening!'
   */
  export const isEvening: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Sunday.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isSun } from 'match-iz/dates';
   *
   * const checkWeekend = (date) => match(date)(
   *   when(isSun, () => 'It is Sunday.'),
   *   otherwise(() => 'Not Sunday.')
   * );
   *
   * checkWeekend(new Date('2025-07-06')); // 'It is Sunday.'
   */
  export const isSun: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Monday.
   */
  export const isMon: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Tuesday.
   */
  export const isTue: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Wednesday.
   */
  export const isWed: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Thursday.
   */
  export const isThu: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Friday.
   */
  export const isFri: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is a Saturday.
   */
  export const isSat: TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Sunday of the month.
   * A negative `nth` value counts from the end of the month.
   *
   * @param {number} nth - The nth occurrence (e.g., 1 for the first, -1 for the last).
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, allOf, otherwise } from 'match-iz';
   * import { isMay, nthSun } from 'match-iz/dates';
   *
   * // Mother's Day in the US is the second Sunday in May.
   * const isMothersDay = allOf(isMay, nthSun(2));
   *
   * const checkDate = match(new Date('2025-05-11'))(
   *   when(isMothersDay, () => "Happy Mother's Day!"),
   *   otherwise(() => 'Just a regular day.')
   * ); // "Happy Mother's Day!"
   */
  export function nthSun(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Monday of the month.
   */
  export function nthMon(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Tuesday of the month.
   */
  export function nthTue(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Wednesday of the month.
   */
  export function nthWed(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Thursday of the month.
   */
  export function nthThu(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Friday of the month.
   */
  export function nthFri(nth: number): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is the nth Saturday of the month.
   */
  export function nthSat(nth: number): TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in January.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isJan } from 'match-iz/dates';
   *
   * const checkMonth = match(new Date('2025-01-15'))(
   *   when(isJan, () => 'It is January.'),
   *   otherwise(() => 'Not January.')
   * ); // 'It is January.'
   */
  export const isJan: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in February.
   */
  export const isFeb: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in March.
   */
  export const isMar: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in April.
   */
  export const isApr: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in May.
   */
  export const isMay: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in June.
   */
  export const isJun: TPredicateAsserting<Date>
  
  /**
   * A predicate that checks if a Date object is in July.
   */
  export const isJul: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in August.
   */
  export const isAug: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in September.
   */
  export const isSep: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in October.
   */
  export const isOct: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in November.
   */
  export const isNov: TPredicateAsserting<Date>

  /**
   * A predicate that checks if a Date object is in December.
   */
  export const isDec: TPredicateAsserting<Date>

  /**
   * A predicate that checks if the year of a Date object is a leap year.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isLeapYear } from 'match-iz/dates';
   *
   * const checkLeapYear = (year) => match(new Date(year, 0, 1))(
   *   when(isLeapYear, () => `${year} is a leap year.`),
   *   otherwise(() => `${year} is not a leap year.`)
   * );
   *
   * checkLeapYear(2024); // '2024 is a leap year.'
   * checkLeapYear(2025); // '2025 is not a leap year.'
   */
  export const isLeapYear: TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the day of the month of a Date object.
   * A negative number counts from the end of the month.
   *
   * @param {number | TPredicate<number>} dayOrFn - The day of the month (1-31) or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise, lt } from 'match-iz';
   * import { isDay } from 'match-iz/dates';
   *
   * const checkDay = (date) => match(date)(
   *   when(isDay(1), () => 'First day of the month.'),
   *   when(isDay(-1), () => 'Last day of the month.'),
   *   when(isDay(lt(15)), () => 'First half of the month.'),
   *   otherwise(() => 'Second half of the month.')
   * );
   *
   * checkDay(new Date('2025-07-01')); // 'First day of the month.'
   * checkDay(new Date('2025-07-31')); // 'Last day of the month.'
   * checkDay(new Date('2025-07-10')); // 'First half of the month.'
   */
  export function isDay(dayOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the month of a Date object.
   *
   * @param {number | TPredicate<number>} monOrFn - The month (1-12) or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isMonth } from 'match-iz/dates';
   *
   * const checkMonth = match(new Date('2025-07-05'))(
   *   when(isMonth(7), () => 'It is July.'),
   *   otherwise(() => 'Not July.')
   * ); // 'It is July.'
   */
  export function isMonth(monOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the year of a Date object.
   *
   * @param {number | TPredicate<number>} yrOrFn - The year or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isYear } from 'match-iz/dates';
   *
   * const checkYear = match(new Date('2025-07-05'))(
   *   when(isYear(2025), () => 'The year is 2025.'),
   *   otherwise(() => 'Not 2025.')
   * ); // 'The year is 2025.'
   */
  export function isYear(yrOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the day of the week of a Date object.
   * (Sunday=0, Monday=1, ..., Saturday=6).
   *
   * @param {number | TPredicate<number>} dowOrFn - The day of the week or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isDayOfWeek } from 'match-iz/dates';
   *
   * const checkWeekend = match(new Date('2025-07-05'))(
   *   when(isDayOfWeek(6), () => 'It is Saturday.'),
   *   otherwise(() => 'Not Saturday.')
   * ); // 'It is Saturday.'
   */
  export function isDayOfWeek(dowOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the week number of a Date object.
   *
   * @param {number | TPredicate<number>} wkNumOrFn - The week number or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isWeekNumber } from 'match-iz/dates';
   *
   * const checkWeek = match(new Date('2025-01-01'))(
   *   when(isWeekNumber(1), () => 'First week of the year.'),
   *   otherwise(() => 'Not the first week.')
   * ); // 'First week of the year.'
   */
  export function isWeekNumber(wkNumOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks the time (in milliseconds since epoch) of a Date object.
   *
   * @param {number | TPredicate<number>} msOrFn - The time in milliseconds or a predicate function.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise, lt } from 'match-iz';
   * import { isTime } from 'match-iz/dates';
   *
   * const checkTime = match(new Date())(
   *   when(isTime(lt(Date.now())), () => 'A time in the past.'),
   *   otherwise(() => 'Now or in the future.')
   * );
   */
  export function isTime(msOrFn: TPredicateOrNumber): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in the past.
   * If called with no arguments, it checks for any time in the past.
   *
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inThePast } from 'match-iz/dates';
   *
   * const wasCreated = (date) => match(date)(
   *   when(inThePast(), () => 'Created some time in the past.'),
   *   otherwise(() => 'Created in the future?')
   * );
   *
   * wasCreated(new Date(Date.now() - 1000)); // 'Created some time in the past.'
   */
  export function inThePast(): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is within a specified time frame in the past.
   *
   * @param {number} n - The number of units for the time frame.
   * @param {TTimeFrame} timeFrame - The time frame ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inThePast } from 'match-iz/dates';
   *
   * const wasCreated = (date) => match(date)(
   *   when(inThePast(7, 'days'), () => 'Created in the last 7 days.'),
   *   otherwise(() => 'Created more than 7 days ago.')
   * );
   *
   * wasCreated(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)); // 'Created in the last 7 days.'
   */
  export function inThePast(n: number, timeFrame: TTimeFrame): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in the future.
   * If called with no arguments, it checks for any time in the future.
   *
   * @returns {TPredicateAsserting<Date>} A predicate function.
   */
  export function inTheNext(): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is within a specified time frame in the future.
   *
   * @param {number} n - The number of units for the time frame.
   * @param {TTimeFrame} timeFrame - The time frame ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inTheNext } from 'match-iz/dates';
   *
   * const expires = (date) => match(date)(
   *   when(inTheNext(30, 'days'), () => 'Expires in the next 30 days.'),
   *   otherwise(() => 'Does not expire in the next 30 days.')
   * );
   *
   * expires(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)); // 'Expires in the next 30 days.'
   */
  export function inTheNext(n: number, timeFrame: TTimeFrame): TPredicateAsserting<Date>

  /**
   * Alias for `inTheNext`.
   */
  export function inTheFuture(): TPredicateAsserting<Date>

  /**
   * Alias for `inTheNext`.
   */
  export function inTheFuture(n: number, timeFrame: TTimeFrame): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is before a specified date.
   *
   * @param {TDateTime} dateTime - The date to compare against. Can be a Date object, a timestamp, or an array `[YYYY, MM, DD, ...]`.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isBefore } from 'match-iz/dates';
   *
   * const checkDeadline = match(new Date('2025-07-10'))(
   *   when(isBefore([2025, 7, 15]), () => 'Before the deadline.'),
   *   otherwise(() => 'After the deadline.')
   * ); // 'Before the deadline.'
   */
  export function isBefore(dateTime: TDateTime): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is after a specified date.
   *
   * @param {TDateTime} dateTime - The date to compare against. Can be a Date object, a timestamp, or an array `[YYYY, MM, DD, ...]`.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { isAfter } from 'match-iz/dates';
   *
   * const checkStartDate = match(new Date('2025-08-01'))(
   *   when(isAfter([2025, 7, 31]), () => 'Project has started.'),
   *   otherwise(() => 'Project has not started yet.')
   * ); // 'Project has started.'
   */
  export function isAfter(dateTime: TDateTime): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is on the same day as the specified date.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inDay } from 'match-iz/dates';
   *
   * const checkDay = match(new Date('2025-07-05T10:00:00'))(
   *   when(inDay([2025, 7, 5]), () => 'Today!'),
   *   otherwise(() => 'Not today.')
   * ); // 'Today!'
   */
  export function inDay(dateTime: TDateTime): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is on any of the specified days.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inDays } from 'match-iz/dates';
   *
   * const holidays = [[2025, 1, 1], [2025, 12, 25]];
   *
   * const checkHoliday = (date) => match(date)(
   *   when(inDays(holidays), () => 'It is a holiday!'),
   *   otherwise(() => 'Not a holiday.')
   * );
   *
   * checkHoliday(new Date('2025-12-25')); // 'It is a holiday!'
   * checkHoliday(new Date('2025-07-05')); // 'Not a holiday.'
   */
  export function inDays(dateTime?: TDateTime[]): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in the same month as the specified date.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inMonth } from 'match-iz/dates';
   *
   * const checkMonth = match(new Date('2025-07-15'))(
   *   when(inMonth([2025, 7, 1]), () => 'In the same month.'),
   *   otherwise(() => 'Not in the same month.')
   * ); // 'In the same month.'
   */
  export function inMonth(dateTime: TDateTime): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in any of the specified months.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inMonths } from 'match-iz/dates';
   *
   * const summerMonths = [[2025, 6, 1], [2025, 7, 1], [2025, 8, 1]];
   *
   * const checkSummer = (date) => match(date)(
   *   when(inMonths(summerMonths), () => 'Summertime!'),
   *   otherwise(() => 'Not summer.')
   * );
   *
   * checkSummer(new Date('2025-07-20')); // 'Summertime!'
   */
  export function inMonths(dateTime?: TDateTime[]): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in the same year as the specified date.
   *
   * @param {TDateTime} dateTime - The date to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inYear } from 'match-iz/dates';
   *
   * const checkYear = match(new Date('2025-07-05'))(
   *   when(inYear([2025]), () => 'In 2025.'),
   *   otherwise(() => 'Not in 2025.')
   * ); // 'In 2025.'
   */
  export function inYear(dateTime: TDateTime): TPredicateAsserting<Date>

  /**
   * Creates a predicate that checks if a Date object is in any of the specified years.
   *
   * @param {TDateTime[]} [dateTime] - An array of dates to compare against.
   * @returns {TPredicateAsserting<Date>} A predicate function.
   * @example
   * import { match, when, otherwise } from 'match-iz';
   * import { inYears } from 'match-iz/dates';
   *
   * const recentYears = [[2023], [2024], [2025]];
   *
   * const checkRecent = (date) => match(date)(
   *   when(inYears(recentYears), () => 'A recent year.'),
   *   otherwise(() => 'An older year.')
   * );
   *
   * checkRecent(new Date('2024-01-01')); // 'A recent year.'
   */
  export function inYears(dateTime?: TDateTime[]): TPredicateAsserting<Date>
}
