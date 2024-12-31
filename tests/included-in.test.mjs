import assert from "node:assert";
import { describe, test } from "node:test";

import { includedIn, match, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: 0, expecting: "a" },
  { input: 10, expecting: "b" },
  { input: 20, expecting: "c" },
];

describe("includedIn()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(includedIn([1, 2, 3, 0, 4, 5]))("a"),
        when(includedIn([1, 2, 3, 10, 4, 5]))("b"),
        when(includedIn([1, 2, 3, 20, 4, 5]))("c"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
