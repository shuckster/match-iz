import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, allOf, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom, mockDate } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: {
      name: "days",
      dates: datesFrom({ startDate: [2024, 12, 12, 0, 0, 0, 0], days: 10 }),
    },
    expecting: 5,
  },
  {
    input: {
      name: "months",
      dates: datesFrom({ startDate: [2024, 12, 12, 0, 0, 0, 0], days: 300 }),
    },
    expecting: 180,
  },
];

describe("inTheNext(...) regression", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), ctx => {
      mockDate(ctx, Date.UTC(2024, 11, 12, 0, 0, 0, 0));

      console.log("input.dates", input.dates);

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

      console.log("days", days);

      assert.strictEqual(days.length, expecting);
    });
  });
});