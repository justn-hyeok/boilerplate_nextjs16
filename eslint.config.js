import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importX from "eslint-plugin-import-x";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
      "import-x": importX,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // FSD layer dependency rules
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            // shared cannot import from other layers
            {
              target: "./src/shared/**/*",
              from: "./src/entities/**/*",
              message: "shared cannot import from entities",
            },
            {
              target: "./src/shared/**/*",
              from: "./src/features/**/*",
              message: "shared cannot import from features",
            },
            {
              target: "./src/shared/**/*",
              from: "./src/widgets/**/*",
              message: "shared cannot import from widgets",
            },
            {
              target: "./src/shared/**/*",
              from: "./src/pages/**/*",
              message: "shared cannot import from pages",
            },
            // entities cannot import from features and above
            {
              target: "./src/entities/**/*",
              from: "./src/features/**/*",
              message: "entities cannot import from features",
            },
            {
              target: "./src/entities/**/*",
              from: "./src/widgets/**/*",
              message: "entities cannot import from widgets",
            },
            {
              target: "./src/entities/**/*",
              from: "./src/pages/**/*",
              message: "entities cannot import from pages",
            },
            // features cannot import from widgets and above
            {
              target: "./src/features/**/*",
              from: "./src/widgets/**/*",
              message: "features cannot import from widgets",
            },
            {
              target: "./src/features/**/*",
              from: "./src/pages/**/*",
              message: "features cannot import from pages",
            },
            // widgets cannot import from pages
            {
              target: "./src/widgets/**/*",
              from: "./src/pages/**/*",
              message: "widgets cannot import from pages",
            },
          ],
        },
      ],

      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "next/**", group: "builtin", position: "before" },
            { pattern: "@app/**", group: "internal", position: "before" },
            { pattern: "@pages/**", group: "internal", position: "before" },
            { pattern: "@widgets/**", group: "internal", position: "before" },
            { pattern: "@features/**", group: "internal", position: "before" },
            { pattern: "@entities/**", group: "internal", position: "before" },
            { pattern: "@shared/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "storybook-static/**",
    ],
  }
);
