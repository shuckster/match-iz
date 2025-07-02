import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "match-iz";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: datesFrom({ startDate: [2000, 12, 31], days: 35 }),
    expecting: 31,
  },
];

describe("inMonth()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.inMonth([2001, 1]), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
