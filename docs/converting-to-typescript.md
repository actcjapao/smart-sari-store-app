# 1️⃣ Install TypeScript + React types
From your Laravel project root:
```
npm install -D typescript @types/react @types/react-dom
```
If you’re using Inertia React adapter (you are), that’s already TS-friendly.

# 2️⃣ Add tsconfig.json
Create `tsconfig.json` in your project root:
```js
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/js/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["resources/js/**/*"]
}
```
This works perfectly with Laravel 12 + Vite.

Note: Do not use this command in Laravel12 + Inertia.js + React.js stack
```
npx tsc --init
```
As this will only introduce node-specific & automatic typescript config. Better to create it manually to specify the config that are only necessary.

# 3️⃣ Rename files when ready
Examples:
```
Index.jsx   → Index.tsx
Button.jsx → Button.tsx
```
No other changes required initially — TS will infer a lot automatically.

> Important: Also change all the instances of `app.jsx` to `app.tsx`.

# 4️⃣ Typing Inertia page props (VERY important)
This is where TS really shines with Inertia.

**Before (JSX)**
```js
export default function Index({ users }) {
  ...
}
```

**After (TSX)**
```js
interface User {
  id: number;
  name: string;
  email: string;
}

interface PageProps {
  users: User[];
}

export default function Index({ users }: PageProps) {
  ...
}
```
This catches backend/frontend mismatches early 👌

# 5️⃣ Global shared props typing (auth, flash, etc.)
Inertia exposes a PageProps type you can extend.

Create:
```js
// resources/js/types/inertia.d.ts
import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    } | null;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}
```
Then in pages:
```js
import { PageProps } from '@/types/inertia';

export default function Dashboard({ auth }: PageProps) {
  ...
}
```

# 6️⃣ Typing useForm() (huge win)
```js
import { useForm } from '@inertiajs/react';

interface FormData {
  name: string;
  email: string;
}

const { data, setData, post, errors } = useForm<FormData>({
  name: '',
  email: '',
});
```
Now:
- `setData('email', ...)` is type-safe
- Typos get caught instantly

# 7️⃣ Vite config — usually NO changes needed
Laravel 12’s Vite setup already supports TS.
Your `vite.config.js` is fine as-is.

# 8️⃣ Should you convert EVERYTHING to TypeScript?
**Recommended approach:**
- ✅ Pages → TSX first
- ✅ Forms & complex components → TSX
- ⏳ Small presentational components can wait

TypeScript adds the most value where:

- Props are complex
- Forms exist
- Backend data shapes matter
