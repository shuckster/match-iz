import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      // Built CJS companions of ESM sources
      "dates/index.js",
      "dates/utc/index.js",
      "asserts/index.js",
      // Local scratch / tooling noise
      "_scratch/**",
      "wiki/**",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
      },
      // Align with modern Node + features used in the tree (e.g. Error.cause)
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      sourceType: "module",
    },
  },
  // CJS build-check script uses require()
  {
    files: ["tests/browser/**/*.{js,cjs}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.d.ts", "tests/types/**/*.{ts,tsx}"],
    rules: {
      // Ambient declarations and type-only tests often look "unused" to core rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
);
