import assert from "node:assert";
import { describe, test } from "node:test";

import { cata, isNumber, match, otherwise } from "match-iz";
import { desc } from "./lib/describe.mjs";
import { safe } from "./lib/maybe.mjs";

const { just, nothing } = cata({
  just: m => m?.isJust,
  nothing: m => m?.isNothing,
  getValue: m => m?.valueOf(),
});

const maybeNumber = safe(isNumber);

const testCases = [
  { input: maybeNumber(42), expecting: 42 },
  { input: maybeNumber("42"), expecting: "empty" },
  { input: "42", expecting: "not a monad" },
];

describe("cata", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        just(x => x),
        nothing("empty"),
        otherwise("not a monad"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
