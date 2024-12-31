import assert from "node:assert";
import { describe, test } from "node:test";

import * as local from "../dates/index.mjs";
import { against, allOf, gt, otherwise, when } from "../src/match-iz.mjs";
import { datesFrom } from "./lib/dates-from.mjs";
import { desc } from "./lib/describe.mjs";

describe("isDay / isFri / isTue", () => {
  const testCases = [
    {
      input: datesFrom({ startDate: [2022, 1, 1], days: 365 }),
      expecting: 114,
    },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(
          when(local.isDay(-1))(true),
          when(local.isFri)(true),
          when(local.isTue)(true),
          otherwise(false),
        ),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});

describe("isDay(gt(28)) in 2022", () => {
  const testCases = [
    {
      input: datesFrom({ startDate: [2022, 1, 1], days: 366 }),
      expecting: 29,
    },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(allOf(local.isDay(gt(28))))(true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});

describe("isDay(gt(28)) in 2024", () => {
  const testCases = [
    {
      input: datesFrom({ startDate: [2024, 1, 1], days: 366 }),
      expecting: 30,
    },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const days = input.filter(
        against(when(allOf(local.isDay(gt(28))))(true), otherwise(false)),
      );
      assert.strictEqual(days.length, expecting);
    });
  });
});
