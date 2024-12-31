import assert from "node:assert";
import { describe, test } from "node:test";

import { allOf, match, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: [1, 2, 3],
    expecting: "1",
  },
];

describe("match exact items in array only", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(allOf({ length: 3 }, [[1, 2, 3]]), "1"),
        otherwise(false),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
