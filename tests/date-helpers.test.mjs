import assert from "node:assert";
import { describe, test } from "node:test";

import * as local from "../dates/index.mjs";
import * as utc from "../dates/utc/index.mjs";
import { against, allOf, gt, lt, match, otherwise, when } from "match-iz";

// Fixed UTC anchors so local timezone cannot affect weekday/month assertions.
const mothersDay2025 = new Date(Date.UTC(2025, 4, 11)); // 2nd Sunday in May
const lastFriOfMay2025 = new Date(Date.UTC(2025, 4, 30)); // 30 May 2025 is a Friday
const leapDay2024 = new Date(Date.UTC(2024, 1, 29));
const nonLeap2025 = new Date(Date.UTC(2025, 0, 1));
const morning = new Date(Date.UTC(2025, 6, 5, 9, 15, 30));
const afternoon = new Date(Date.UTC(2025, 6, 5, 14, 0, 0));
const evening = new Date(Date.UTC(2025, 6, 5, 20, 45, 10));

describe("date helpers: weekdays and months (UTC)", () => {
  test("isSun…isSat identify the correct weekday", () => {
    // 2025-07-06 is a Sunday; walk one week forward.
    const sunday = new Date(Date.UTC(2025, 6, 6));
    const days = Array.from(
      { length: 7 },
      (_, i) => new Date(sunday.getTime() + i * 86400000),
    );
    const preds = [
      utc.isSun,
      utc.isMon,
      utc.isTue,
      utc.isWed,
      utc.isThu,
      utc.isFri,
      utc.isSat,
    ];
    days.forEach((d, i) => {
      preds.forEach((pred, j) => {
        assert.strictEqual(pred(d), i === j, `day ${i} vs pred ${j}`);
      });
    });
  });

  test("isJan…isDec identify the correct month", () => {
    const months = [
      utc.isJan,
      utc.isFeb,
      utc.isMar,
      utc.isApr,
      utc.isMay,
      utc.isJun,
      utc.isJul,
      utc.isAug,
      utc.isSep,
      utc.isOct,
      utc.isNov,
      utc.isDec,
    ];
    months.forEach((pred, i) => {
      const d = new Date(Date.UTC(2025, i, 15));
      assert.strictEqual(pred(d), true);
      assert.strictEqual(pred(new Date(Date.UTC(2025, (i + 1) % 12, 15))), false);
    });
  });
});

describe("date helpers: nth weekday of month", () => {
  test("UTC nthSun(2) matches Mother's Day 2025", () => {
    assert.strictEqual(utc.nthSun(2)(mothersDay2025), true);
    assert.strictEqual(utc.nthSun(1)(mothersDay2025), false);
    assert.strictEqual(utc.nthSun(-1)(mothersDay2025), false);
  });

  test("UTC nthFri(-1) matches last Friday of May 2025", () => {
    assert.strictEqual(utc.nthFri(-1)(lastFriOfMay2025), true);
    assert.strictEqual(utc.nthFri(1)(lastFriOfMay2025), false);
  });

  test("local nthSun / nthFri work for the same calendar dates", () => {
    // Construct local-midnight dates so local getDay/getDate match the calendar day.
    const localMothers = new Date(2025, 4, 11);
    const localLastFri = new Date(2025, 4, 30);
    assert.strictEqual(local.nthSun(2)(localMothers), true);
    assert.strictEqual(local.nthFri(-1)(localLastFri), true);
  });

  test("remaining nth* helpers are callable", () => {
    const d = new Date(Date.UTC(2025, 0, 6)); // first Monday of Jan 2025
    assert.strictEqual(typeof utc.nthMon(1)(d), "boolean");
    assert.strictEqual(typeof utc.nthTue(1)(d), "boolean");
    assert.strictEqual(typeof utc.nthWed(1)(d), "boolean");
    assert.strictEqual(typeof utc.nthThu(1)(d), "boolean");
    assert.strictEqual(typeof utc.nthSat(1)(d), "boolean");
    assert.strictEqual(typeof local.nthMon(1)(new Date(2025, 0, 6)), "boolean");
  });
});

describe("date helpers: isLeapYear, isWeekNumber, isDayOfWeek", () => {
  test("isLeapYear", () => {
    assert.strictEqual(utc.isLeapYear(leapDay2024), true);
    assert.strictEqual(utc.isLeapYear(nonLeap2025), false);
    assert.strictEqual(local.isLeapYear(new Date(2024, 1, 29)), true);
    assert.strictEqual(local.isLeapYear(new Date(1900, 0, 1)), false); // %100, not %400
    assert.strictEqual(local.isLeapYear(new Date(2000, 0, 1)), true); // %400
  });

  test("isWeekNumber with number and predicate", () => {
    const week1 = new Date(Date.UTC(2025, 0, 2)); // Thursday of ISO week 1
    assert.strictEqual(utc.isWeekNumber(1)(week1), true);
    assert.strictEqual(utc.isWeekNumber(gt(50))(new Date(Date.UTC(2025, 11, 28))), true);
    assert.strictEqual(local.isWeekNumber(1)(new Date(2025, 0, 2)), true);
    assert.strictEqual(local.isWeekNumber(lt(10))(new Date(2025, 0, 15)), true);
  });

  test("isDayOfWeek with number and predicate", () => {
    const saturday = new Date(Date.UTC(2025, 6, 5)); // 5 Jul 2025 is Saturday
    assert.strictEqual(utc.isDayOfWeek(6)(saturday), true);
    assert.strictEqual(utc.isDayOfWeek(0)(saturday), false);
    assert.strictEqual(utc.isDayOfWeek(n => n >= 5)(saturday), true);
    assert.strictEqual(local.isDayOfWeek(6)(new Date(2025, 6, 5)), true);
  });
});

describe("date helpers: time-of-day", () => {
  test("isHour / isMinute / isSecond (UTC)", () => {
    assert.strictEqual(utc.isHour(9)(morning), true);
    assert.strictEqual(utc.isHour(gt(12))(evening), true);
    assert.strictEqual(utc.isMinute(15)(morning), true);
    assert.strictEqual(utc.isMinute(lt(20))(morning), true);
    assert.strictEqual(utc.isSecond(30)(morning), true);
    assert.strictEqual(utc.isSecond(10)(evening), true);
  });

  test("isHour / isMinute / isSecond (local)", () => {
    const d = new Date(2025, 6, 5, 9, 15, 30);
    assert.strictEqual(local.isHour(9)(d), true);
    assert.strictEqual(local.isMinute(15)(d), true);
    assert.strictEqual(local.isSecond(30)(d), true);
    assert.strictEqual(local.isHour(h => h === 9)(d), true);
  });

  test("isAM / isPM / isMorning / isAfternoon / isEvening", () => {
    assert.strictEqual(utc.isAM(morning), true);
    assert.strictEqual(utc.isPM(afternoon), true);
    assert.strictEqual(utc.isMorning(morning), true);
    assert.strictEqual(utc.isAfternoon(afternoon), true);
    assert.strictEqual(utc.isEvening(evening), true);
    assert.strictEqual(utc.isAM(evening), false);

    const localMorning = new Date(2025, 6, 5, 9, 0, 0);
    const localAfternoon = new Date(2025, 6, 5, 14, 0, 0);
    const localEvening = new Date(2025, 6, 5, 20, 0, 0);
    assert.strictEqual(local.isAM(localMorning), true);
    assert.strictEqual(local.isPM(localAfternoon), true);
    assert.strictEqual(local.isMorning(localMorning), true);
    assert.strictEqual(local.isAfternoon(localAfternoon), true);
    assert.strictEqual(local.isEvening(localEvening), true);
  });

  test("isTime with number and predicate", () => {
    const t = morning.getTime();
    assert.strictEqual(utc.isTime(t)(morning), true);
    assert.strictEqual(utc.isTime(lt(t + 1))(morning), true);
  });
});

describe("date helpers: isDay / isMonth / isYear edge cases", () => {
  test("UTC isDay(-1) is last day of month", () => {
    const jan31 = new Date(Date.UTC(2025, 0, 31));
    const jan30 = new Date(Date.UTC(2025, 0, 30));
    assert.strictEqual(utc.isDay(-1)(jan31), true);
    assert.strictEqual(utc.isDay(-1)(jan30), false);
    assert.strictEqual(utc.isDay(31)(jan31), true);
  });

  test("isMonth / isYear with number and predicate", () => {
    assert.strictEqual(utc.isMonth(5)(mothersDay2025), true);
    assert.strictEqual(utc.isMonth(m => m === 5)(mothersDay2025), true);
    assert.strictEqual(utc.isYear(2025)(mothersDay2025), true);
    assert.strictEqual(utc.isYear(y => y > 2020)(mothersDay2025), true);
    assert.strictEqual(local.isMonth(5)(new Date(2025, 4, 11)), true);
    assert.strictEqual(local.isYear(2025)(new Date(2025, 4, 11)), true);
  });
});

describe("date helpers: local isBefore / isAfter / inDay / inMonth / inYear", () => {
  const d = new Date(2001, 0, 5, 12, 0, 0); // local noon 5 Jan 2001

  test("isBefore accepts Date, timestamp, and date arrays", () => {
    assert.strictEqual(local.isBefore(new Date(2001, 0, 6))(d), true);
    assert.strictEqual(local.isBefore(+new Date(2001, 0, 6))(d), true);
    assert.strictEqual(local.isBefore([2001])(d), false); // before 1 Jan 2001
    assert.strictEqual(local.isBefore([2001, 2])(d), true); // before 1 Feb 2001
    assert.strictEqual(local.isBefore([2001, 1, 6])(d), true);
    assert.strictEqual(local.isBefore([2001, 1, 5, 13, 0, 0])(d), true);
  });

  test("isAfter accepts Date, timestamp, and date arrays", () => {
    assert.strictEqual(local.isAfter(new Date(2001, 0, 4))(d), true);
    assert.strictEqual(local.isAfter(+new Date(2001, 0, 4))(d), true);
    assert.strictEqual(local.isAfter([2000])(d), true);
    // [year, month] → end of that month: Jan 5 is not after end of Jan
    assert.strictEqual(local.isAfter([2001, 1])(d), false);
    assert.strictEqual(local.isAfter([2000, 12])(d), true); // after end of Dec 2000
    assert.strictEqual(local.isAfter([2001, 1, 4])(d), true);
    // Extended arrays pass hour/min/sec through; day is still advanced by 1
    assert.strictEqual(local.isAfter([2001, 1, 4, 11, 0, 0])(d), true);
  });

  test("inDay / inMonth / inYear", () => {
    assert.strictEqual(local.inDay([2001, 1, 5])(d), true);
    assert.strictEqual(local.inDay([2001, 1, 6])(d), false);
    assert.strictEqual(local.inMonth([2001, 1, 1])(d), true);
    assert.strictEqual(local.inMonth([2001, 2, 1])(d), false);
    assert.strictEqual(local.inYear([2001])(d), true);
    assert.strictEqual(local.inYear([2002])(d), false);
  });
});

describe("date helpers: UTC parseDateAfter with time components", () => {
  test("isAfter with [y, m, d, h, ...] uses extended array branch", () => {
    const noon = new Date(Date.UTC(2001, 0, 5, 12, 0, 0));
    assert.strictEqual(utc.isAfter([2001, 1, 5, 11, 0, 0])(noon), true);
    assert.strictEqual(utc.isAfter([2001, 1, 5, 13, 0, 0])(noon), false);
  });

  test("isBefore with Date and timestamp", () => {
    const noon = new Date(Date.UTC(2001, 0, 5, 12, 0, 0));
    assert.strictEqual(utc.isBefore(new Date(Date.UTC(2001, 0, 6)))(noon), true);
    assert.strictEqual(utc.isBefore(+new Date(Date.UTC(2001, 0, 6)))(noon), true);
    assert.strictEqual(utc.isBefore([2001])(noon), false);
    assert.strictEqual(utc.isBefore([2001, 2])(noon), true);
  });
});

describe("date helpers: inThePast / inTheNext units and errors", () => {
  test("inThePast accepts multiple time-unit spellings", () => {
    const now = Date.now();
    const recent = new Date(now - 500);
    assert.strictEqual(utc.inThePast(2000, "ms")(recent), true);
    assert.strictEqual(utc.inThePast(2000, "milliseconds")(recent), true);
    assert.strictEqual(utc.inThePast(2, "s")(recent), true);
    assert.strictEqual(utc.inThePast(2, "secs")(recent), true);
    assert.strictEqual(utc.inThePast(2, "seconds")(recent), true);
    assert.strictEqual(utc.inThePast(2, "m")(recent), true);
    assert.strictEqual(utc.inThePast(2, "mins")(recent), true);
    assert.strictEqual(utc.inThePast(2, "minutes")(recent), true);
    assert.strictEqual(utc.inThePast(2, "h")(recent), true);
    assert.strictEqual(utc.inThePast(2, "hours")(recent), true);
    assert.strictEqual(utc.inThePast(2, "w")(recent), true);
    assert.strictEqual(utc.inThePast(2, "weeks")(recent), true);
    assert.strictEqual(utc.inThePast(2, "y")(recent), true);
    assert.strictEqual(utc.inThePast(2, "years")(recent), true);
  });

  test("inTheNext accepts multiple time-unit spellings", () => {
    const now = Date.now();
    const soon = new Date(now + 500);
    assert.strictEqual(utc.inTheNext(2000, "ms")(soon), true);
    assert.strictEqual(utc.inTheNext(2, "seconds")(soon), true);
    assert.strictEqual(utc.inTheNext(2, "minutes")(soon), true);
    assert.strictEqual(utc.inTheNext(2, "hours")(soon), true);
    assert.strictEqual(utc.inTheNext(2, "weeks")(soon), true);
    assert.strictEqual(utc.inTheNext(2, "years")(soon), true);
    assert.strictEqual(utc.inTheFuture(2, "days")(soon), true);
  });

  test("invalid arguments throw", () => {
    assert.throws(() => utc.inThePast("nope"), /inThePast: invalid arguments/);
    assert.throws(() => utc.inTheNext("nope"), /inTheNext\/inTheFuture: invalid arguments/);
  });
});

describe("date helpers: match integration smoke", () => {
  test("composes with match/when", () => {
    const result = match(mothersDay2025)(
      when(allOf(utc.isMay, utc.nthSun(2)), "Mother's Day"),
      when(utc.isLeapYear, "leap"),
      otherwise("other"),
    );
    assert.strictEqual(result, "Mother's Day");
  });

  test("filters a range with against()", () => {
    const may2025 = Array.from(
      { length: 31 },
      (_, i) => new Date(Date.UTC(2025, 4, i + 1)),
    );
    const secondSundays = may2025.filter(
      against(when(utc.nthSun(2), true), otherwise(false)),
    );
    assert.strictEqual(secondSundays.length, 1);
    assert.strictEqual(secondSundays[0].getUTCDate(), 11);
  });
});
