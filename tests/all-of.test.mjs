import assert from "node:assert";
import { describe, test } from "node:test";

import { allOf, isArray, isPojo, match, not, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: { option: "yes", quantity: 1 }, expecting: "1" },
  { input: { option: "yes", quantity: 2 }, expecting: "2" },
  { input: { option: "yes", quantity: 3 }, expecting: "3" },
  { input: { array: [1, 2, 3, 4] }, expecting: "4" },
];

describe("allOf() / AND", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(allOf(isPojo, { option: "yes" }, { quantity: 1 }))("1"),
        when(allOf(isPojo, { option: "yes", quantity: 2 }))("2"),
        when(allOf(isPojo, { quantity: 3 }, { option: "yes" }))("3"),
        when({ array: allOf(not(isPojo), isArray, x => x.length === 4) })("4"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
