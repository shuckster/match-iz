import assert from "node:assert";
import { describe, test } from "node:test";

import { isNumber, isString, match, otherwise, rest, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: [1, 2, 3, 4],
    expecting: "1",
  },
  {
    input: [1, 2, "3", "4"],
    expecting: "2",
  },
  {
    input: [4, 3, "2", "1"],
    expecting: "3",
  },
  {
    input: [9, true, "8", {}],
    expecting: "4",
  },
];

describe("rest() arrays", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when([1, 2, rest(isNumber)], (_, rest) => {
          assert.deepStrictEqual(rest, [3, 4]);
          return "1";
        }),
        when([1, 2, rest(isString)], (_, rest) => {
          assert.deepStrictEqual(rest, ["3", "4"]);
          return "2";
        }),
        when([4, 3, rest(isString)], (_, rest) => {
          assert.deepStrictEqual(rest, ["2", "1"]);
          return "3";
        }),
        when([9, rest()], (_, rest) => {
          assert.deepStrictEqual(rest, [true, "8", {}]);
          return "4";
        }),
        otherwise("5"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
