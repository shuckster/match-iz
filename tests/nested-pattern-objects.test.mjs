import assert from "node:assert";
import { describe, test } from "node:test";

import { match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { status: 1, hello: { where: "world" } },
    expecting: 'nested "world"',
  },
  {
    input: { status: 1, hello: { where: "there" } },
    expecting: 'nested "there"',
  },
  {
    input: { status: 1, hello: { where: "everywhere" } },
    expecting: 'nested "everywhere"',
  },
  {
    input: { status: 1 },
    expecting: "just status 1",
  },
];

describe("Nested pattern objects", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when({ status: 1, hello: { where: "world" } })('nested "world"'),
        when({ status: 1, hello: { where: "there" } })('nested "there"'),
        when({ status: 1, hello: { where: /where|every/ } })(
          'nested "everywhere"',
        ),
        when({ status: 1 })("just status 1"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
