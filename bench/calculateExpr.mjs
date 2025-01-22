import { against, match, otherwise, when } from "match-iz";
import { barplot, bench } from "mitata";
import { match as pmatch, P } from "ts-pattern";
import { MAX } from "./_iter.mjs";

const add = (x, y) => Number(x) + Number(y);
const subtract = (x, y) => Number(x) - Number(y);

const OP = "+-".split("");
const rint = () => Math.round(Math.random() * 100);
const rop = () => OP[Math.floor(Math.random() * OP.length)];

const makeInput = () => {
  return rint() + " " + rop() + " " + rint();
};

function calculateExpr_vanilla(expr) {
  const rxAdd = /(?<left>\d+) \+ (?<right>\d+)/;
  const rxSub = /(?<left>\d+) - (?<right>\d+)/;
  if (typeof expr === "string") {
    const addMatch = expr.match(rxAdd);
    if (addMatch) {
      const { left, right } = addMatch.groups;
      return add(left, right);
    }
    const subMatch = expr.match(rxSub);
    if (subMatch) {
      const { left, right } = subMatch.groups;
      return subtract(left, right);
    }
  }
  throw new Error("I couldn't parse that!");
}

function calculateExpr_matchiz_match(expr) {
  return match(expr)(
    when(
      /(?<left>\d+) \+ (?<right>\d+)/,
      groups => add(groups.left, groups.right),
    ),
    when(
      /(?<left>\d+) - (?<right>\d+)/,
      groups => subtract(groups.left, groups.right),
    ),
    otherwise("I couldn't parse that!"),
  );
}

const calculateExpr_matchiz_against = against(
  when(
    /(?<left>\d+) \+ (?<right>\d+)/,
    groups => add(groups.left, groups.right),
  ),
  when(
    /(?<left>\d+) - (?<right>\d+)/,
    groups => subtract(groups.left, groups.right),
  ),
  otherwise("I couldn't parse that!"),
);

function calculateExpr_tspattern(expr) {
  return pmatch(expr)
    .with(
      P.when(str => /(?<left>\d+) \+ (?<right>\d+)/.test(str)),
      str => {
        const matchResult = /(?<left>\d+) \+ (?<right>\d+)/.exec(str);
        if (matchResult?.groups) {
          const { left, right } = matchResult.groups;
          return add(left, right);
        }
        return "I couldn't parse that!";
      },
    )
    .with(
      P.when(str => /(?<left>\d+) - (?<right>\d+)/.test(str)),
      str => {
        const matchResult = /(?<left>\d+) - (?<right>\d+)/.exec(str);
        if (matchResult?.groups) {
          const { left, right } = matchResult.groups;
          return subtract(left, right);
        }
        return "I couldn't parse that!";
      },
    )
    // Fallback for anything not matched
    .otherwise(() => "I couldn't parse that!");
}

export const calculateExpr = () => {
  barplot(() => {
    bench("calculateExpr_vanilla x $iter", () => {
      return calculateExpr_vanilla(makeInput());
    }).range("iter", 1, MAX);

    bench("calculateExpr_matchiz_match x $iter", () => {
      return calculateExpr_matchiz_match(makeInput());
    }).range("iter", 1, MAX);

    bench("calculateExpr_matchiz_against x $iter", () => {
      return calculateExpr_matchiz_against(makeInput());
    }).range("iter", 1, MAX);

    bench("calculateExpr_tspattern x $iter", () => {
      return calculateExpr_tspattern(makeInput());
    }).range("iter", 1, MAX);
  });
};
