import assert from "node:assert";
import { describe, test } from "node:test";

import { empty, match, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

describe('empty() === ""', () => {
  const testCases = [
    { input: "", expecting: "empty" },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(empty)("empty"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});

describe("empty() === undefined", () => {
  const testCases = [
    { input: undefined, expecting: "empty" },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(empty)("empty"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});

describe("empty() === null", () => {
  const testCases = [
    { input: null, expecting: "empty" },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(empty)("empty"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});

describe("empty() === []", () => {
  const testCases = [
    { input: [], expecting: "empty" },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(empty)("empty"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});

describe("empty() === {}", () => {
  const testCases = [
    { input: {}, expecting: "empty" },
  ];

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(empty)("empty"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
