import assert from "node:assert";
import { describe, test } from "node:test";

import { against, when } from "match-iz";
import { desc } from "./lib/describe.mjs";
import { nargs } from "./lib/nargs.mjs";

const testCases = [
  { input: [10, 9, 8, 7], expecting: [7, 8, 9, 10] },
];

describe("sort(against...", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = input.sort(
        nargs(
          against(
            when(([a, b]) => a < b)(-1),
            when(([a, b]) => a === b)(0),
            when(([a, b]) => a > b)(1),
          ),
        ),
      );

      assert.deepStrictEqual(output, expecting);
    });
  });
});
