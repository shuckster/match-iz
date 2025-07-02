import assert from "node:assert";
import { describe, test } from "node:test";

import { defined, eq, lastOf, match, otherwise, pluck, when } from "match-iz";
import { desc } from "./lib/describe.mjs";
import { range } from "./lib/range.mjs";

const testCases = [
  {
    input: (function* gen1() {
      yield 1;
      yield 2;
      yield 3;
    })(),
    expecting: "aha!",
  },
  {
    input: (function* gen2() {
      yield "a";
      yield "b";
      yield "c";
      yield "d";
    })(),
    expecting: "gotcha!",
  },
  {
    input: range(0, 100),
    expecting: "range!",
  },
  {
    input: new Map([
      [{ id: 1 }, "a"],
      [{ id: 2 }, "b"],
      [{ id: 3 }, "c"],
    ]),
    expecting: 2,
  },
  {
    input: new Set(["zero", "one", "two", "three"]),
    expecting: "Set!",
  },
];

describe("iterators / generators / Map / Set", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const result = match(input)(
        when(eq([1, 2, 3]), "aha!"),
        when(lastOf("c", "d"), "gotcha!"),
        when(lastOf(99, 100), "range!"),
        when({ key: { id: pluck(defined) }, value: "b" })(
          maybeTwo => maybeTwo,
        ),
        when("three", "Set!"),
        otherwise("no match"),
      );

      assert.strictEqual(result, expecting);
    });
  });
});
