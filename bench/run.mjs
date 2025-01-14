import { run } from "mitata";
import { calculateExpr } from "./calculateExpr.mjs";
import { getResponse } from "./getResponse.mjs";
import { performSearch } from "./performSearch.mjs";

performSearch();
getResponse();
calculateExpr();

run();

