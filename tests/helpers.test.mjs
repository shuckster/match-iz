import assert from "node:assert";
import { describe, test } from "node:test";

import { defined, empty, endsWith, gt, gte, includes, inRange, lt, lte, match, startsWith, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: 0, expecting: "lte" },
  { input: 10, expecting: "gte" },
  { input: 1, expecting: "gt" },
  { input: -1, expecting: "lt" },
  { input: 35, expecting: "inRange1" },
  { input: 55, expecting: "inRange2" },
  { input: "hello, world!", expecting: "startsWith" },
  { input: "ahoyhoy, world!", expecting: "endsWith" },
  { input: ["ignatius", "cheese"], expecting: "includesArray" },
  { input: "chili dogs", expecting: "includesString" },
  { input: undefined, expecting: "empty" },
  { input: false, expecting: "defined" },
];

describe("Helpers", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(inRange(30, 40))("inRange1"),
        when(inRange(60, 50))("inRange2"),
        when(gte(10))("gte"),
        when(gt(0))("gt"),
        when(lt(0))("lt"),
        when(lte(20))("lte"),
        when(startsWith("hello"))("startsWith"),
        when(endsWith("world!"))("endsWith"),
        when(includes("cheese"))("includesArray"),
        when(includes("chili"))("includesString"),
        when(empty)("empty"),
        when(defined)("defined"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
