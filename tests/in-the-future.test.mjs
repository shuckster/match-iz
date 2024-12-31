import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom, daysMs } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: datesFrom({ startDate: Date.now() - daysMs(5), days: 11 }),
    expecting: 5,
  },
];

describe("inTheFuture()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.inTheFuture(), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
