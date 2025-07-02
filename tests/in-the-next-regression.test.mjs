import assert from "node:assert";
import { describe, test } from "node:test";

import * as utc from "../dates/utc/index.mjs";
import { against, allOf, otherwise, when } from "match-iz";
import { datesFrom, mockDate } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: {
      name: "days",
      dates: datesFrom({ startDate: [2024, 12, 15, 0, 0, 0, 0], days: 10 }),
    },
    expecting: 5,
  },
  {
    input: {
      name: "months",
      dates: datesFrom({ startDate: [2024, 12, 15, 0, 0, 0, 0], days: 300 }),
    },
    expecting: 180,
  },
];

describe("inTheNext(...) regression", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), ctx => {
      mockDate(ctx, Date.UTC(2024, 11, 15, 0, 0, 0, 0));

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
