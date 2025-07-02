import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "match-iz";
import { datesFrom, daysMs } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

describe("inThePast(...)", () => {
  const testCases = [
    {
      input: datesFrom({ startDate: Date.now() - daysMs(10), days: 12 }),
      expecting: 5,
    },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.inThePast(5, "days"), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});

describe("inThePast()", () => {
  const testCases = [
    {
      input: datesFrom({ startDate: Date.now() - daysMs(4), days: 10 }),
      expecting: 5,
    },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.inThePast(), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
