import assert from "node:assert";
import { describe, test } from "node:test";

import { every, isNumber, isString, match, some, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: [1, "a", 3, 4, 5, 6],
    expecting: "some strings",
  },
  {
    input: [9, 8, 7, 6, 5],
    expecting: "all numbers",
  },
  {
    input: ["9", "8", "7", "6", "5"],
    expecting: "all strings",
  },
  {
    input: [{ id: 1 }, { id: 2 }, { id: 3 }],
    expecting: true,
  },
  {
    input: [{ id: 1 }, { id: "2" }, { id: 3 }],
    expecting: false,
  },
];

describe("some(), every()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(every({ id: isNumber }))(true),
        when(some({ id: isNumber }))(false),
        when(every(isString))(() => {
          return "all strings";
        }),
        when(some(isString))(() => {
          return "some strings";
        }),
        when(every(isNumber))(() => {
          return "all numbers";
        }),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
