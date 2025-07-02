import assert from "node:assert";
import { describe, test } from "node:test";

import { gt, gte, isNumber, lt, match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: 6,
    expecting: "greater than 5",
  },
  {
    input: 8,
    expecting: "greater than 6 and less than 11",
  },
];

describe("when() guards", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(
          isNumber,
          gte(7),
          lt(11),
          () => "greater than 6 and less than 11",
        ),
        when(isNumber, gt(5), () => "greater than 5"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
