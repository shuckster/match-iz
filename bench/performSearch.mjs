import { against, eq, isPojo, isString, match, otherwise, when } from "match-iz";
import { barplot, bench } from "mitata";
import { match as pmatch, P } from "ts-pattern";
import { MAX } from "./_iter.mjs";

function rString() {
  return Math.random().toString(36).substring(2);
}

const ranges = {
  string: () => rString(),
};

const patterns = [
  () => [ranges.string()],
  () => [{ pattern: ranges.string() }],
  () => [ranges.string(), { pattern: ranges.string() }],
];

const makeInput = () => {
  const key = Math.floor(Math.random() * patterns.length);
  return patterns[key]();
};

const find = () => 1;

function performSearch_vanilla(...args) {
  const [firstArg, secondArg] = args;
  if (args.length === 1) {
    if (isString(firstArg)) {
      return find({ pattern: firstArg });
    }
    if (isPojo(firstArg)) {
      return find(firstArg);
    }
  }
  if (args.length === 2 && isString(firstArg) && isPojo(secondArg)) {
    return find({ pattern: firstArg, ...secondArg });
  }
  throw new Error("Invalid arguments" + JSON.stringify({ cause: args }));
}

function performSearch_matchiz_match(...args) {
  return match(args)(
    when(eq([isString]), ([pattern]) => find({ pattern })),
    when(eq([isPojo]), ([options]) => find(options)),
    when(
      eq([isString, isPojo]),
      ([pattern, options]) => find({ pattern, ...options }),
    ),
    otherwise(() => {
      throw new Error("Invalid arguments" + JSON.stringify({ cause: args }));
    }),
  );
}

const performSearch_matchiz_against = against(
  when(eq([isString]), ([pattern]) => find({ pattern })),
  when(eq([isPojo]), ([options]) => find(options)),
  when(
    eq([isString, isPojo]),
    ([pattern, options]) => find({ pattern, ...options }),
  ),
  otherwise(args => {
    throw new Error("Invalid arguments" + JSON.stringify({ cause: args }));
  }),
);

function performSearch_tspattern(...args) {
  return pmatch(args)
    .with([P.string], ([pattern]) => find({ pattern }))
    .with([P.when(isPojo)], ([options]) => find(options))
    .with(
      [P.string, P.when(isPojo)],
      ([pattern, options]) => find({ pattern, ...options }),
    )
    .otherwise(() => {
      throw new Error("Invalid arguments" + JSON.stringify({ cause: args }));
    });
}

export const performSearch = () => {
  barplot(() => {
    bench("performSearch_vanilla x $iter", () => {
      return performSearch_vanilla(...makeInput());
    }).range("iter", 1, MAX);

    bench("performSearch_matchiz_match x $iter", () => {
      return performSearch_matchiz_match(...makeInput());
    }).range("iter", 1, MAX);

    bench("performSearch_matchiz_against x $iter", () => {
      return performSearch_matchiz_against(makeInput());
    }).range("iter", 1, MAX);

    bench("performSearch_tspattern x $iter", () => {
      return performSearch_tspattern(...makeInput());
    }).range("iter", 1, MAX);
  });
};
