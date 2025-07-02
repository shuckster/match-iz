import assert from "node:assert";
import { describe, test } from "node:test";

import { eq, lastOf, match, otherwise, when } from "match-iz";
import { desc } from "./lib/describe.mjs";
import { range } from "./lib/range.mjs";

const testCases = [
  {
    input: [1, 2, 3],
    expecting: "aha!",
  },
  {
    input: ["a", "b", "c", "d"],
    expecting: "gotcha!",
  },
  {
    input: [...range(0, 100)],
    expecting: "range!",
  },
];

describe("arguments", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      function matcher() {
        return match(arguments)(
          when(eq([1, 2, 3]), "aha!"),
          when(lastOf("c", "d"), "gotcha!"),
          when(lastOf(99, 100), "range!"),
          otherwise("no match"),
        );
      }

      const result = matcher(...input);
      assert.strictEqual(result, expecting);
    });
  });
});
