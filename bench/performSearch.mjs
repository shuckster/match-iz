import { against, eq, isPojo, isString, match, otherwise, when } from "match-iz";
import { barplot, bench } from "mitata";
import { match as pmatch, P } from "ts-pattern";

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
  throw new Error("Invalid arguments");
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
      throw new Error("Invalid arguments");
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
  otherwise(() => {
    throw new Error("Invalid arguments");
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
      throw new Error("Invalid arguments");
    });
}

export const performSearch = () => {
  barplot(() => {
    bench("performSearch_vanilla", () => {
      return performSearch_vanilla({ pattern: "text" });
    });

    bench("performSearch_matchiz_match", () => {
      return performSearch_matchiz_match({ pattern: "text" });
    });

    bench("performSearch_matchiz_against", () => {
      return performSearch_matchiz_against([{ pattern: "text" }]);
    });

    bench("performSearch_tspattern", () => {
      return performSearch_tspattern({ pattern: "text" });
    });
  });
};

