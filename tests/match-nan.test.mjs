import assert from "node:assert";
import { describe, test } from "node:test";

import { eq, match, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: [1, NaN], expecting: "1 NaN" },
  { input: [2, NaN], expecting: "2 NaN" },
  { input: [3, NaN], expecting: "3 NaN" },
  { input: [4, NaN, [NaN]], expecting: "4 NaN" },
  { input: [4, NaN, [NaN, "b"]], expecting: "5 NaN" },
];

describe("Can match NaN, sub-arrays", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(eq([1, NaN]))("1 NaN"),
        when(eq([2, isNaN]))("2 NaN"),
        when(eq([3, Number.isNaN]))("3 NaN"),
        when(eq([4, isNaN, [NaN, "b"]]))("5 NaN"),
        when(eq([4, Number.isNaN, [NaN]]))("4 NaN"),
        otherwise("oops"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
