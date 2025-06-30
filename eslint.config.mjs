import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Apply to JS files, CommonJS style
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // ✅ Add Node globals (includes process)
        ...globals.browser, // Optional: keep browser if needed
      },
    },
  },
  pluginJs.configs.recommended,
];
