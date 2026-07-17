import assert from "node:assert";
import { describe, test } from "node:test";

import { asserts, makeAsserter } from "../asserts/index.mjs";
import { isNumber, isString } from "match-iz";

describe("asserts()", () => {
  const isUser = asserts({ id: isNumber, name: isString });

  test("curried: does not throw when the value matches", () => {
    assert.doesNotThrow(() => {
      isUser({ id: 1, name: "Ada" });
    });
  });

  test("direct: does not throw when the value matches", () => {
    assert.doesNotThrow(() => {
      asserts({ id: isNumber, name: isString }, { id: 1, name: "Ada" });
    });
  });

  test("curried: throws TypeError with message and cause on mismatch", () => {
    const bad = { id: "nope", name: "Ada" };
    assert.throws(
      () => isUser(bad, "expected a user"),
      (err) => {
        assert.ok(err instanceof TypeError);
        assert.strictEqual(err.message, "expected a user");
        assert.strictEqual(err.cause, bad);
        return true;
      },
    );
  });

  test("direct: throws TypeError with message and cause on mismatch", () => {
    const bad = { id: "nope", name: "Ada" };
    assert.throws(
      () => asserts({ id: isNumber, name: isString }, bad, "expected a user"),
      (err) => {
        assert.ok(err instanceof TypeError);
        assert.strictEqual(err.message, "expected a user");
        assert.strictEqual(err.cause, bad);
        return true;
      },
    );
  });

  test("uses default description when none is supplied", () => {
    assert.throws(
      () => asserts(isString, 42),
      (err) => {
        assert.ok(err instanceof TypeError);
        assert.strictEqual(err.message, "Assertion failed");
        assert.strictEqual(err.cause, 42);
        return true;
      },
    );
  });

  test("works with predicate patterns", () => {
    const isName = asserts(isString);
    assert.doesNotThrow(() => isName("hello"));
    assert.throws(() => isName(123));
  });
});

describe("makeAsserter()", () => {
  test("returns the same dual signature as asserts()", () => {
    const custom = makeAsserter((input, description) => {
      throw new Error(description);
    });

    // Direct form: (pattern, value, description?)
    assert.doesNotThrow(() => custom(isString, "ok"));
    assert.throws(() => custom(isString, 1, "bad"), /bad/);

    // Curried form: (pattern) => (value, description?)
    const isName = custom(isString);
    assert.doesNotThrow(() => isName("ok"));
    assert.throws(() => isName(1, "nope"), /nope/);
  });

  test("invokes custom onFailure on mismatch", () => {
    const calls = [];
    const softThrow = makeAsserter((input, description) => {
      calls.push({ input, description });
      throw new Error(description);
    });
    const isName = softThrow(isString);

    assert.throws(() => isName(99, "not a name"), /not a name/);
    assert.deepStrictEqual(calls, [{ input: 99, description: "not a name" }]);
  });

  test("does not call onFailure when the value matches", () => {
    let called = false;
    const custom = makeAsserter(() => {
      called = true;
      throw new Error("should not run");
    });
    custom(isNumber, 7);
    custom(isNumber)(7);
    assert.strictEqual(called, false);
  });
});
