import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "match-iz";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: datesFrom({ startDate: [2001, 1, 1], days: 10 }),
    expecting: 5,
  },
];

describe("isAfter()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(utc.isAfter([2001, 1, 5]), true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
