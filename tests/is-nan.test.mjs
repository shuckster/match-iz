import assert from "node:assert";
import { describe, test } from "node:test";

import { isNumber, match, not, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: NaN, expecting: "NaN" },
  { input: 1, expecting: "1" },
  { input: 2, expecting: "2" },
];

describe("isNumber(NaN) should return false", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(2)("2"),
        when(isNumber)("1"),
        when(not(isNumber))("NaN"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
