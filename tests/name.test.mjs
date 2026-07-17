import assert from "node:assert";
import { describe, test } from "node:test";

import { isString, isNumber } from "match-iz";

describe("name", () => {
  test("isString", () => {
    assert.strictEqual(isString.name, "isString")
  })
  test("isNumber", () => {
    assert.strictEqual(isNumber.name, "isNumber")
  })
});

