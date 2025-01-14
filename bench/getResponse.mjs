import { against, inRange, match, otherwise, when } from "match-iz";
import { barplot, bench } from "mitata";
import { match as pmatch, P } from "ts-pattern";

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
    bench("getResponse_vanilla", () => {
      return getResponse_vanilla({ statusCode: 200 });
    });

    bench("getResponse_matchiz_match", () => {
      return getResponse_matchiz_match({ statusCode: 200 });
    });

    bench("getResponse_matchiz_against", () => {
      return getResponse_matchiz_against({ statusCode: 200 });
    });

    bench("getResponse_tspattern", () => {
      return getResponse_tspattern({ statusCode: 200 });
    });
  });
};

