# Smart Sari Store - Setup Guide

This guide walks through the complete setup process for the Smart Sari Store application, which uses Laravel with Inertia.js and React for a modern full-stack development experience.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- PHP 8.2 or higher
- Composer
- Node.js and npm
- A code editor (VSCode recommended)

## Step 1: Create a Fresh Laravel Application

Create a new Laravel project without using any starter kits.

```bash
curl -s "https://laravel.build/smart-sari-store" | bash
cd smart-sari-store
./vendor/bin/sail up
```

For detailed instructions, refer to the [Laravel Installation Documentation](https://laravel.com/docs/12.x/installation#creating-a-laravel-project).

After creation, open the project in your code editor.

## Step 2: Install and Configure React

### Install React Dependencies

Install React and the React-specific Vite plugin:

```bash
npm install react react-dom
npm install --save-dev @vitejs/plugin-react
```

For more information, see the [Laravel Vite with React Documentation](https://laravel.com/docs/12.x/vite#react).

## Step 3: Set Up Inertia.js

Inertia.js is a JavaScript framework that enables you to build single-page applications using classic server-side routing and controllers.

### Server-Side Setup (Laravel)

1. **Install the Inertia Laravel package:**

   ```bash
   composer require inertiajs/inertia-laravel
   ```

2. **Create the root view template:**

   - Rename `resources/views/welcome.blade.php` to `resources/views/app.blade.php`
   - Add the following lines to the `<head>` section:

   ```html
   @vite('resources/js/app.jsx')
   @inertiaHead
   ```

   - Add the following directive to the `<body>` section:

   ```html
   @inertia
   ```

3. **Register the Inertia middleware:**

   ```bash
   php artisan inertia:middleware
   ```

   For more details, visit the [Inertia Laravel Server-Side Setup](https://inertiajs.com/docs/v2/installation/server-side-setup#installation).

### Client-Side Setup (React)

1. **Install Inertia React dependencies:**

   ```bash
   npm install @inertiajs/react
   ```

2. **Set up the React entry point:**

   - Rename `resources/js/app.js` to `resources/js/app.jsx`
   - Initialize the Inertia app in this file

   For detailed instructions, refer to the [Inertia React Client-Side Setup](https://inertiajs.com/docs/v2/installation/client-side-setup#installation).

3. **Update the Vite configuration:**

   Edit `vite.config.js` to include the React plugin and update the entry point:

   ```js
   import { defineConfig } from 'vite';
   import laravel from 'laravel-vite-plugin';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
       plugins: [
           laravel({
               input: 'resources/js/app.jsx',
               refresh: true,
           }),
           react(),
       ],
   });
   ```

4. **Add React Refresh to the Blade template:**

   Update `resources/views/app.blade.php` and add the `@viteReactRefresh` directive before `@vite()`:

   ```html
   @viteReactRefresh
   @vite('resources/js/app.jsx')
   ```

5. **Create the Pages directory:**

   Create a new directory at `resources/js/Pages`. This will contain your React page components. You can customize this path if needed.

6. **Create a sample home page:**

   Create `resources/js/Pages/Home.jsx` as your first page component:

   ```jsx
   export default function Home() {
       return (
           <div>
               <h1>Welcome to Smart Sari Store</h1>
           </div>
       );
   }
   ```

## Step 4: Configure the Session Driver

By default, newer Laravel versions use the `database` session driver. Since the database hasn't been set up yet, switch to the `file` driver temporarily:

1. Open `.env` and change:

   ```
   SESSION_DRIVER=file
   ```

2. Clear the configuration cache:

   ```bash
   php artisan config:clear
   ```

## Step 5: Install TailwindCSS

TailwindCSS provides utility-first CSS for rapid UI development.

Follow the [TailwindCSS Laravel + Vite Installation Guide](https://tailwindcss.com/docs/installation/framework-guides/laravel/vite) to complete the setup.

## Step 6: (Optional) Configure Path Aliases

To simplify imports and avoid relative path repetition, configure path aliases in your Vite configuration.

Update `vite.config.js`:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
```

With this configuration, you can use `@` instead of the full path when importing modules:

```jsx
// Instead of: import Home from '../../../Pages/Home'
import Home from '@/Pages/Home';
```

## Step 7: Start the Development Servers

Run both the Laravel development server and the npm build process in separate terminals:

**Terminal 1 - Laravel Server:**

```bash
php artisan serve
```

**Terminal 2 - Frontend Build:**

```bash
npm run dev
```

Your application should now be running at `http://localhost:8000`.

## Next Steps

- Review the [Inertia.js Documentation](https://inertiajs.com/) for advanced features
- Explore the [Laravel Documentation](https://laravel.com/docs/12.x) for backend development
- Check the [React Documentation](https://react.dev) for frontend patterns
- Set up a proper database and update the session driver to `database` for production

## Troubleshooting

**Issue: "Session driver not configured" errors**

- Ensure `SESSION_DRIVER=file` is set in your `.env` file
- Run `php artisan config:clear`

**Issue: React components not rendering**

- Verify all file extensions are `.jsx` (not `.js`)
- Check that `@viteReactRefresh` appears before `@vite()` in the Blade template
- Ensure the npm dev server is running: `npm run dev`

**Issue: Import paths not resolving**

- Verify the path alias is correctly configured in `vite.config.js`
- Restart both servers after modifying the configuration

[Youtube Video Reference](https://www.youtube.com/watch?v=qBxo6hW83jU&list=PL38wFHH4qYZVOnXxcS0NMGGmUsZky6JNG&index=2).
