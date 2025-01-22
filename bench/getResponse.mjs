import { against, inRange, match, otherwise, when } from "match-iz";
import { barplot, bench } from "mitata";
import { match as pmatch, P } from "ts-pattern";
import { MAX } from "./_iter.mjs";

const rRange = (min = 0, max = 100) => (Math.random() * (max - min)) + min;

function rString() {
  return Math.random().toString(36).substring(2);
}

const ranges = {
  statusCode: () => rRange(200, 299),
  body: () => rString(),
};

const objects = [
  () => ({ statusCode: ranges.statusCode() }),
  () => ({ statusCode: ranges.statusCode(), body: ranges.body() }),
];

const makeInput = () => {
  const key = Math.floor(Math.random() * objects.length);
  return objects[key]();
};

function getResponse_vanilla(res) {
  if (res && typeof res.statusCode === "number") {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return res.body;
    } else if (res.statusCode === 404) {
      return "Not found";
    }
  }
  throw new Error("Invalid response");
}

function getResponse_matchiz_match(res) {
  return match(res)(
    when({ statusCode: inRange(200, 299) }, res => res.body),
    when({ statusCode: 404 }, () => "Not found"),
    otherwise(res => {
      throw new Error(`Invalid response: ${res}`);
    }),
  );
}

const getResponse_matchiz_against = against(
  when({ statusCode: inRange(200, 299) }, res => res.body),
  when({ statusCode: 404 }, () => "Not found"),
  otherwise(res => {
    throw new Error(`Invalid response: ${res}`);
  }),
);

function getResponse_tspattern(res) {
  return pmatch(res)
    .with({ statusCode: P.number.between(200, 299) }, res => res.body)
    .with({ statusCode: 404 }, () => "Not found")
    .otherwise(res => {
      throw new Error(`Invalid response: ${res}`);
    });
}

export const getResponse = () => {
  barplot(() => {
    bench("getResponse_vanilla x $iter", () => {
      return getResponse_vanilla(makeInput());
    }).range("iter", 1, MAX);

    bench("getResponse_matchiz_match x $iter", () => {
      return getResponse_matchiz_match(makeInput());
    }).range("iter", 1, MAX);

    bench("getResponse_matchiz_against x $iter", () => {
      return getResponse_matchiz_against(makeInput());
    }).range("iter", 1, MAX);

    bench("getResponse_tspattern x $iter", () => {
      return getResponse_tspattern(makeInput());
    }).range("iter", 1, MAX);
  });
};
