import assert from "node:assert";
import { describe, test } from "node:test";

import { deepEq, eq, match, otherwise, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { hello: "world", here: "there", how: "now" },
    expecting: "no match",
  },
  {
    input: { one: "1", two: "2", three: { four: "4", five: "5" } },
    expecting: "no match",
  },
];

describe("eq()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(eq({ hello: "world", here: "there" }))("shallow match"),
        when(eq({ one: "1", two: "2", three: eq({ four: "4" }) }))(
          "deep match 1",
        ),
        when(deepEq({ one: "1", two: "2", three: { four: "4" } }))(
          "deep match 2",
        ),
        otherwise("no match"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
