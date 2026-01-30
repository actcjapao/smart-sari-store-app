# 🟦 ESLint for React (Inertia + React)
ESLint is the correct tool for your React frontend.

## 1️⃣ Install ESLint (Vite / React setup)
From your project root:
```
npm install -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

If you’re using TypeScript, add:
```
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## 2️⃣ Create ESLint config
```
npx eslint --init
```

Recommended answers:
- ✔ JavaScript modules
- ✔ React
- ✔ TypeScript (if applicable)
- ✔ Browser
- ✔ JSON format

This generates `.eslintrc.*`

## 3️⃣ Example ESLint config (React + Inertia friendly)

```js
// eslint.config.js (new ESLint format)
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  {
    files: ['resources/js/**/*.{js,jsx,ts,tsx}'],
    plugins: { react, hooks },
    rules: {
      'react/react-in-jsx-scope': 'off', // Vite + React 17+
      'react/prop-types': 'off',         // Inertia doesn't use PropTypes
      'no-unused-vars': ['warn'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
```

## 4️⃣ Add scripts
```js
"scripts": {
  "lint": "eslint resources/js --fix"
}
```
Run:
```
npm run lint
```

## 5️⃣ VS Code (strongly recommended)
Install extensions:
- **ESLint**
- **Prettier**

Then add .vscode/settings.json:
```js
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
