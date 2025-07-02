import assert from "node:assert";
import { describe, test } from "node:test";

import { isStrictly, match, when } from "match-iz";
import { desc } from "./lib/describe.mjs";

const objectToTest1 = {
  some: "data",
};

const objectToTest2 = {
  some: "data",
};

const testCases = [
  {
    input: {
      data1: objectToTest1,
      data2: objectToTest2,
    },
    expecting: "ok!",
  },
];

describe("isStrictly()", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when({
          data1: isStrictly(objectToTest1),
          data2: isStrictly(objectToTest2),
        })("ok!"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
