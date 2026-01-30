# Sample guide on how to setup ESLint into a React.js + Typescript project

## ✅ Target Setup (what we’re aiming for)

- ESLint checks React + hooks
- ESLint checks TypeScript
- Prettier handles formatting
- ESLint handles logic & correctness
- Auto-fix runs on save
- No duplicate or conflicting rules

## Prerequisite

### VS Code MUST have the ESLint extension

Installing npm packages alone is not enough.

You need:

**ESLint VS Code extension** <br />
by: `dbaeumer.vscode-eslint`

- This extension is what:
- runs ESLint in the editor
- shows warnings in Problems
- shows ESLint in Output
- applies auto-fixes on save

Without it:

- ESLint only works in terminal
- VS Code will show nothing

## 1️⃣ Install ESLint dependencies

From your project root:

```bash
npm install -D eslint @eslint/js \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-import \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-config-prettier
```

✔ Works for React + TS <br />
✔ Compatible with Vite + Inertia

Packages purpose:

- `eslint` – Core linter engine that analyzes JavaScript/TypeScript code for errors and bad patterns.
- `@eslint/js` – Official base set of recommended JavaScript safety rules.
- `eslint-plugin-react` – Adds rules that understand JSX and common React patterns.
- `eslint-plugin-react-hooks` – Enforces correct and safe usage of React Hooks.
- `eslint-plugin-import` – Detects broken, duplicate, or invalid ES module imports.
- `@typescript-eslint/parser` – Allows ESLint to parse and understand TypeScript syntax.
- `@typescript-eslint/eslint-plugin` – Provides TypeScript-specific linting rules and type-aware checks.
- `eslint-config-prettier` – Disables ESLint formatting rules to avoid conflicts with Prettier

## 2️⃣ Create ESLint config (modern format)

Create `eslint.config.js` in your project root:

```js
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
```

👉 This is important: ESLint will not format code.

## 3️⃣ Add ESLint script

In `package.json`:

```json
{
    "scripts": {
        "lint": "eslint resources/js",
        "lint:fix": "eslint resources/js --fix"
    }
}
```

Test it:

```
npm run lint
```

If ESLint is working, you’ll see warnings/errors.

## 4️⃣ VS Code wiring (this is mandatory)

Create or update `.vscode/settings.json`:

```json
{
    "editor.formatOnSave": true,

    "editor.defaultFormatter": "esbenp.prettier-vscode",

    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },

    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ]
}
```

**Why this matters**

- Prettier formats
- ESLint fixes logic issues
- Both run automatically
- No conflicts

## 5️⃣ Verify ESLint is actually running

### A. Create a deliberate ESLint error

In any `.tsx` file:

```tsx
const foo = 123;
```

Save the file.
You should see:

- ⚠️ Warning: foo is defined but never used

If you don’t → ESLint is not wired correctly.

### B. Check ESLint output

VS Code:

```sql
View → Output → ESLint
```

You should see logs when saving.

## 6️⃣ What ESLint now protects you from (real value)

### ❌ Invalid hook usage

```tsx
if (cond) {
    useEffect(() => {});
}
```

### ❌ Missing dependencies

```tsx
useEffect(() => {
    doThing(value);
}, []);
```

### ❌ Unused variables

```tsx
const unused = 123;
```

### ❌ Incorrect imports

```tsx
import Something from "./missing-file";
```

These are bugs, not formatting.

### 7️⃣ What ESLint will NOT do (by design)

- ❌ Indentation
- ❌ Line breaks
- ❌ Quotes
- ❌ Semicolons

That’s Prettier’s job.

## 8️⃣ Common pitfalls (avoid these)

- ❌ Using `.eslintrc` + `eslint.config.js` together
- ❌ Letting ESLint format code
- ❌ Not setting default formatter (already setup `Prettier`)
- ❌ Forgetting `eslint-config-prettier` (this is a package and included on the `eslint.config.js` config)
