import type { TPredicate } from '../common'

export type TPredicateOrNumber = TPredicate<number> | number

export type TTimeFrame = 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'

export type TYear = [number]
export type TYearMonth = [number, number]
export type TYearMonthDay = [number, number, number]
export type TYearMonthDayHour = [number, number, number, number]
export type TYearMonthDayHourMinute = [number, number, number, number, number]
export type TYearMonthDayHourMinuteSecond = [number, number, number, number, number, number]
export type TYearMonthDayHourMinuteSecondMillisecond = [number, number, number, number, number, number, number]
export type TDateTimeArray =
  | TYear
  | TYearMonth
  | TYearMonthDay
  | TYearMonthDayHour
  | TYearMonthDayHourMinute
  | TYearMonthDayHourMinuteSecond
  | TYearMonthDayHourMinuteSecondMillisecond

export type TDateTime = TDateTimeArray | Date | number
