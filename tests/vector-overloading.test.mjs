import assert from "node:assert";
import { describe, test } from "node:test";

import { defined, match, otherwise, spread, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { x: 10, y: 20, z: 5 },
    expecting: 22.9128784747792,
  },
  {
    input: { x: 12, y: 65 },
    expecting: 66.09841147864297,
  },
  {
    input: [1, 2, 3],
    expecting: 3,
  },
];

describe("Vector overloading", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const { x, y, z } = spread(defined);

      const output = match(input)(
        when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
        when({ x, y })(({ x, y }) => Math.hypot(x, y)),
        otherwise(vector => vector.length),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
