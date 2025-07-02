import assert from "node:assert";
import { describe, test } from "node:test";

import { gte, match, not, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: 0, expecting: "a" },
  { input: 10, expecting: "b" },
  { input: 20, expecting: "c" },
  { input: 30, expecting: "d" },
  { input: 40, expecting: "e" },
];

describe("not()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(not(gte(10)))("a"),
        when(not(gte(20)))("b"),
        when(not(gte(30)))("c"),
        when(not(40))("d"),
        when(40)("e"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
