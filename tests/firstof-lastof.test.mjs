import assert from "node:assert";
import { describe, test } from "node:test";

import { firstOf, isNumber, isString, lastOf, match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: [1, "a", 3, 4, 5, 6],
    expecting: "firstOf",
  },
  {
    input: [9, 8, 7, 6, 5, "a"],
    expecting: "lastOf",
  },
];

describe("firstOf(), lastOf()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(lastOf(isNumber, isString))(() => {
          return "lastOf";
        }),
        when(firstOf(isNumber, isString))(() => {
          return "firstOf";
        }),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
