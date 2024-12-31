import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { match, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  { input: { note: "ahoyhoy, world!" }, expecting: "world" },
  { input: { text: "hello, world!" }, expecting: "hello" },
  { input: "non-existent", expecting: null },
];

describe("Object-prop regular-expressions", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when({ text: /hello/ })("hello"),
        when({ note: /world/ })("world"),
        otherwise(null),
      );
      strictEqual(result, expecting);
    });
  });
});
