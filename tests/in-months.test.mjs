import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: datesFrom({ startDate: [2000, 11, 30], days: 63 }),
    expecting: 62,
  },
];

describe("inMonths()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(
          when(
            utc.inMonths([
              [2000, 12],
              [2001, 1],
            ]),
            true,
          ),
          otherwise(false),
        ),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
