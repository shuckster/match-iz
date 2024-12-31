import assert from "node:assert";
import { describe, test } from "node:test";

import { gte, inRange, match, otherwise, pluck, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { status: 200, headers: { "Content-Length": 1234 } },
    expecting: "size is 1234",
  },
  {
    input: { status: 200 },
    expecting: "I didn't understand that...",
  },
  {
    input: { status: 301 },
    expecting: "This is fine",
  },
  {
    input: { status: 401 },
    expecting: "Flagrant error! 401",
  },
  {
    input: { status: 404 },
    expecting: "JSON not found",
  },
  {
    input: { status: 500 },
    expecting: "Server error!",
  },
  {
    input: { status: 0 },
    expecting: "I didn't understand that...",
  },
];

const isInteger = Number.isInteger;

describe("Matching fetch() responses", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      function fetch() {
        return input;
      }

      const res = fetch(input);

      const output = match(res)(
        when({ status: 200, headers: { "Content-Length": isInteger } })(
          ({ headers: { "Content-Length": size } }) => {
            return `size is ${size}`;
          },
        ),
        when({ status: 404 })("JSON not found"),
        when(({ status }) => status >= 500)("Server error!"),
        when({ status: pluck(gte(400)) })(status =>
          `Flagrant error! ${status}`
        ),
        when({ status: inRange(300, 399) })("This is fine"),
        otherwise("I didn't understand that..."),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
