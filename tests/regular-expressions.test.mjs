import assert from "node:assert";
import { describe, test } from "node:test";

import { match, otherwise, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: "01234567780",
    expecting: "+44(0)1234 567 780",
  },
  {
    input: "Ignacius Cheese",
    expecting: "Mr Cheese",
  },
  {
    input: "1 + 2",
    expecting: 3,
  },
  {
    input: "hello, world!",
    expecting: "that was standard",
  },
  {
    input: "the five boxing wizards jump quickly",
    expecting: "boxing",
  },
  {
    input: false,
    expecting: "Unknown field in CSV",
  },
];

describe("Regular-expression matching", () => {
  const add = (left, right) => parseInt(left, 10) + parseInt(right, 10);

  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const output = match(input)(
        when(/(boxing)/)(([, firstMatch]) => {
          return firstMatch;
        }),
        when(/(?<leadingZero>0?)(?<p1>\d{4,5})(?<p2>\d{3})(?<p3>\d{3})/)(
          ({ leadingZero, p1, p2, p3 }) => {
            return `+44(${leadingZero})${p1} ${p2} ${p3}`;
          },
        ),
        when(/(?<firstName>\w+) (?<lastName>\w+)/)(({ lastName }) => {
          return "Mr " + lastName;
        }),
        when(/(?<left>\d+) \+ (?<right>\d+)/)(({ left, right }) => {
          return add(left, right);
        }),
        when(/world/)("that was standard"),
        otherwise("Unknown field in CSV"),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
