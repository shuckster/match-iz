declare module 'match-iz/dates/utc' {
  export function isHour(hourOrFn: TPredicateOrNumber): TPredicate
  export function isMinute(minOrFn: TPredicateOrNumber): TPredicate
  export function isSecond(secOrFn: TPredicateOrNumber): TPredicate

  export const isAM: TPredicate
  export const isPM: TPredicate
  export const isMorning: TPredicate
  export const isAfternoon: TPredicate
  export const isEvening: TPredicate

  export const isSun: TPredicate
  export const isMon: TPredicate
  export const isTue: TPredicate
  export const isWed: TPredicate
  export const isThu: TPredicate
  export const isFri: TPredicate
  export const isSat: TPredicate

  export function nthSun(nth: number): TPredicate
  export function nthMon(nth: number): TPredicate
  export function nthTue(nth: number): TPredicate
  export function nthWed(nth: number): TPredicate
  export function nthThu(nth: number): TPredicate
  export function nthFri(nth: number): TPredicate
  export function nthSat(nth: number): TPredicate

  export const isJan: TPredicate
  export const isFeb: TPredicate
  export const isMar: TPredicate
  export const isApr: TPredicate
  export const isMay: TPredicate
  export const isJun: TPredicate
  export const isJul: TPredicate
  export const isAug: TPredicate
  export const isSep: TPredicate
  export const isOct: TPredicate
  export const isNov: TPredicate
  export const isDec: TPredicate

  export const isLeapYear: TPredicate

  export function isDay(dayOrFn: TPredicateOrNumber): TPredicate
  export function isMonth(monOrFn: TPredicateOrNumber): TPredicate
  export function isYear(yrOrFn: TPredicateOrNumber): TPredicate
  export function isDayOfWeek(dowOrFn: TPredicateOrNumber): TPredicate
  export function isWeekNumber(wkNumOrFn: TPredicateOrNumber): TPredicate
  export function isTime(msOrFn: TPredicateOrNumber): TPredicate

  export function inThePast(): TPredicate
  export function inThePast(n: number, timeFrame: TTimeFrame): TPredicate

  export function inTheNext(): TPredicate
  export function inTheNext(n: number, timeFrame: TTimeFrame): TPredicate

  export function inTheFuture(): TPredicate
  export function inTheFuture(n: number, timeFrame: TTimeFrame): TPredicate

  export function isBefore(dateTime: TDateTime): TPredicate
  export function isAfter(dateTime: TDateTime): TPredicate

  export function inDay(dateTime: TDateTime): TPredicate
  export function inDays(dateTime?: TDateTime[]): TPredicate
  export function inMonth(dateTime: TDateTime): TPredicate
  export function inMonths(dateTime?: TDateTime[]): TPredicate
  export function inYear(dateTime: TDateTime): TPredicate
  export function inYears(dateTime?: TDateTime[]): TPredicate
}
