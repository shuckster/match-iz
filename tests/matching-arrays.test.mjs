import assert from "node:assert";
import { describe, test } from "node:test";

import { empty, eq, match, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: ["1", "", undefined, ""], expecting: "one" },
  { input: ["1", "", "", "!"], expecting: "nope" },
  { input: ["", "2"], expecting: "two, two items" },
  { input: ["", "2", "", ""], expecting: "two, four items" },
  { input: ["", "2", ""], expecting: "two, three items" },
  { input: [undefined, "2", ""], expecting: "two, three items" },
  { input: ["", "2", undefined], expecting: "two, three items" },
  { input: ["", []], expecting: "nope" },
  { input: "fish", expecting: "nope" },
];

describe("Matching an array against an eq(array)", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const _ = empty;

      const output = match(input)(
        when(eq(["1", _, _, _]))("one"),
        when(eq([_, "2", _, _]))("two, four items"),
        when(eq([_, "2"]))("two, two items"),
        when(eq([_, "2", _]))("two, three items"),
        otherwise("nope"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
