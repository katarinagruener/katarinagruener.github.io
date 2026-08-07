import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", "public/pagefind/**", "node_modules/**"],
  },
  tseslint.configs.recommended,
  eslintPluginAstro.configs["flat/recommended"],
  eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    rules: {
      // CMS-driven content and third-party JSON payloads are read as `any`
      // in a few lib files (search.ts, calendar.ts) — that's a deliberate
      // boundary, not an oversight worth failing CI over.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
