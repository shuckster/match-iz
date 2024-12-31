import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, allOf, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: {
      name: "days",
      dates: datesFrom({ startDate: Date.now(), days: 10 }),
    },
    expecting: 5,
  },
  {
    input: {
      name: "months",
      dates: datesFrom({ startDate: Date.now(), days: 300 }),
    },
    expecting: 180,
  },
];

describe("inTheNext(...)", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.dates.filter(
        against(
          when(
            allOf(() => input.name === "days", utc.inTheNext(5, "days")),
            true,
          ),
          when(
            allOf(() => input.name === "months", utc.inTheNext(6, "months")),
            true,
          ),
          otherwise(false),
        ),
      );

      assert.strictEqual(days.length, expecting);
    });
  });
});
