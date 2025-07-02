import assert from "node:assert";
import { describe, test } from "node:test";

import { includes, match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: [1, 2, 3],
    expecting: "aha!",
  },
  {
    input: new Set(["x", "y", "z"]),
    expecting: "aha!",
  },
  {
    input: function*() {
      yield false;
      yield true;
      yield undefined;
      yield null;
      yield NaN;
    },
    expecting: "aha!",
  },
];

describe("exhaustiveness checking", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      let threw = false;
      try {
        const result = match(input)(
          when(includes("a"), "aha!"),
          when(includes("b"), "aha!"),
          when(0, "aha!"),
        );
        assert.strictEqual(result, expecting);
      } catch (err) {
        threw = err;
      }
      assert.notStrictEqual(threw, false);
    });
  });
});
