import assert from "node:assert";
import { describe, test } from "node:test";

import { defined, match, spread, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const testCases = [
  {
    input: { loading: true },
    expecting: "<Loading />",
  },
  {
    input: { error: "That didn't work out" },
    expecting: "<Error>That didn't work out</Error>",
  },
  {
    input: { data: "Hey, what up" },
    expecting: "<Page>Hey, what up</Page>",
  },
];

describe("HTML component state-machine", () => {
  testCases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const { loading, error, data } = spread(defined);

      const LoadingComponent = () => "<Loading />";
      const ErrorComponent = ({ error }) => `<Error>${error}</Error>`;
      const PageComponent = ({ data }) => `<Page>${data}</Page>`;

      const output = match(input)(
        when({ loading })(LoadingComponent),
        when({ error })(ErrorComponent),
        when({ data })(PageComponent),
      );

      assert.strictEqual(output, expecting);
    });
  });
});
