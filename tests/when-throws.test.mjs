import assert from "node:assert";
import { describe, test } from "node:test";

import { when } from "match-iz";
import { maybeTry } from "./lib/maybe.mjs";

describe("when() throws...", () => {
  test(`...with no arguments supplied`, () => {
    assert.strictEqual(
      maybeTry(() => when())
        .orElse(() => "null")
        .valueOf(),
      "null",
    );
  });
});
