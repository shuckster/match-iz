import { isDate, isNumber, match, spread, when } from "match-iz";

export function daysMs(n) {
  return n * 24 * 60 * 60 * 1000;
}

export function datesFrom({ startDate, days }) {
  const { isYear, isMonth, isDay, isEpoch } = spread(isNumber);
  const refDate = match(startDate)(
    when([isYear, isMonth, isDay])(x => {
      const [year, month, day] = x;
      return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }),
    when(isEpoch)(x => new Date(x)),
    when(isDate)(x => x),
  );
  return Array.from(
    { length: days },
    (_, i) => new Date(refDate.getTime() + daysMs(i)),
  );
}

export function mockDate(ctx, date) {
  ctx.mock.timers.enable({
    apis: ['Date'],
    now: new Date(date),
  });
}

