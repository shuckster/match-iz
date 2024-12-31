import assert from "node:assert";
import { describe, test } from "node:test";

import { isDate, match, not, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: new Date(NaN), expecting: "bad" },
  { input: new Date(-Infinity), expecting: "bad" },
  { input: new Date(Infinity), expecting: "bad" },
  { input: new Date("Invalid Date"), expecting: "bad" },
  { input: new Date("1970-01-01"), expecting: "ok" },
];

describe("Various isDate(Invalid Date)", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(not(isDate))(() => "bad"),
        otherwise("ok"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
