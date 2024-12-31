import assert from "node:assert";
import { describe, test } from "node:test";

import { anyOf, endsWith, match, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { message: "hello world!", number: 42 },
    expecting: "that's no good",
  },
  {
    input: { message: "hello wrrld!", number: 42 },
    expecting: "ok!",
  },
  {
    input: "two",
    expecting: "two?",
  },
];

describe("anyOf() / OR", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when({ message: endsWith("world!"), number: 42 })("that's no good"),
        when(anyOf({ message: endsWith("world!") }, { number: 42 }))("ok!"),
        when(anyOf("one", /two/))("two?"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
