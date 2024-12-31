import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: datesFrom({ startDate: [2000, 12, 31], days: 365 * 3 }),
    expecting: 730,
  },
];

describe("inYears()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.inYears([[2001], [2002]]), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
