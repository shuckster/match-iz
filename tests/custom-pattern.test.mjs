import assert from "node:assert";
import { describe, test } from "node:test";

import { match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: { status: 1 }, expecting: "status is an integer" },
  { input: 1, expecting: "input is an integer" },
];

const isInteger = value => Number.isInteger(value);

describe("Custom pattern", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when({ status: isInteger })("status is an integer"),
        when(isInteger)("input is an integer"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
