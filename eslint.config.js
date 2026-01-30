import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,

    {
        files: ["resources/js/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            // Inertia / React realities
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            // Quality-of-life
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn"],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },

    // Disable formatting rules (Prettier owns formatting)
    prettier,
];
