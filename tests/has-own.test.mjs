import assert from "node:assert";
import { describe, test } from "node:test";

import { gt, hasOwn, match, not, otherwise, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: { pages: 1, data: { body: "text" } }, expecting: "a" },
  { input: { pages: 2, data: { body: "text" } }, expecting: "b" },
  { input: { data: { body: "text" } }, expecting: "c" },
  { input: { pages: 0, data: { body: "text" } }, expecting: "d" },
];

describe("hasOwn()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(not(hasOwn("pages", "data")))("c"),
        when({ pages: gt(1) })(() => "b"),
        when({ pages: 1 })("a"),
        otherwise(() => "d"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
