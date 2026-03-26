import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
import sanity from "@sanity/eslint-config-studio";

export default ts.config(
	// Global ignores
	{
		ignores: [
			"front-end/.svelte-kit/",
			"front-end/build/",
			"back-end/.sanity/",
			"back-end/dist/",
			".claude/",
		],
	},

	// Base JS + TS rules
	js.configs.recommended,
	...ts.configs.recommended,

	// Svelte (front-end)
	...svelte.configs.recommended,
	{
		files: ["front-end/**/*.svelte"],
		languageOptions: {
			parserOptions: { parser: ts.parser },
		},
	},

	// Sanity / React (back-end)
	...sanity.map((config) => ({
		...config,
		files: ["back-end/**/*.{js,ts,jsx,tsx}"],
	})),

	// Unused imports (parity with Biome's noUnusedImports)
	{
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
		},
	},

	// Prettier must be last
	prettier,
);
