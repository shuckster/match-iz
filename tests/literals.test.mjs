import assert from "node:assert";
import { describe, test } from "node:test";

import { match, otherwise, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const cases = [
  { input: null, expecting: "null" },
  { input: true, expecting: "true" },
  { input: false, expecting: "false" },
  { input: 1, expecting: "1" },
  { input: "hello, world!", expecting: "hello, world!" },
  { input: "non-existent", expecting: false },
];

describe("Literals", () => {
  cases.forEach(({ input, expecting }, index) => {
    test("curried when(): " + desc(index, input, expecting), () => {
      const result = match(input)(
        when(true)("true"),
        when(false)("false"),
        when({ test: 1 })('should not throw if "null" is an input'),
        when(null)("null"),
        when(1)("1"),
        when("hello, world!")("hello, world!"),
        otherwise(false),
      );

      assert.strictEqual(result, expecting);
    });

    test("uncurried when():" + desc(index, input, expecting), () => {
      const result = match(input)(
        when(true, "true"),
        when(false, "false"),
        when({ test: 1 }, 'should not throw if "null" is an input'),
        when(null, "null"),
        when(1, "1"),
        when("hello, world!", "hello, world!"),
        otherwise(false),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
