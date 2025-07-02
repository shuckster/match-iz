import assert from "node:assert";
import { describe, test } from "node:test";

import { isNumber, match, otherwise, rest, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { one: 1, two: 2, three: 3 },
    expecting: "1",
  },
  {
    input: { nine: 9, yes: true, hi: "greetings!" },
    expecting: "2",
  },
  {
    input: { nine: "9", no: false, hi: "ahoyhoy!" },
    expecting: "3",
  },
];

describe("rest() objects", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when({ one: 1, ...rest(isNumber) }, (_, rest) => {
          assert.deepStrictEqual(rest, { two: 2, three: 3 });
          return "1";
        }),
        when({ nine: 9, ...rest() }, (_, rest) => {
          assert.deepStrictEqual(rest, { yes: true, hi: "greetings!" });
          return "2";
        }),
        when({ nine: "9", ...rest() }, (_, rest) => {
          assert.deepStrictEqual(rest, { no: false, hi: "ahoyhoy!" });
          return "3";
        }),
        otherwise("4"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
