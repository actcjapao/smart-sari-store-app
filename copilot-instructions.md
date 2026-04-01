---
description: "Smart Sari Store: Laravel + Inertia.js + React/TypeScript e-commerce application for managing sari products and stores"
---

# Smart Sari Store Project Context

This is a full-stack e-commerce application built for managing sari-sari stores. The application allows store owners to manage their inventory, products, and customer interactions through a modern web interface.

## Technology Stack

- **Backend**: Laravel 12.x (PHP framework)
- **Frontend**: React 18 with TypeScript, using Inertia.js for SPA-like experience
- **Database**: MySQL/PostgreSQL with Eloquent ORM
- **Styling**: Tailwind CSS with FlyonUI components
- **Build Tool**: Vite for asset compilation
- **Testing**: Pest PHP for backend tests
- **Code Quality**: ESLint for JavaScript/TypeScript, PHPStan for PHP

## Project Structure

- `app/Models/`: Eloquent models (User, Store, Product, Post, UserStore)
- `app/Http/Controllers/`: Laravel controllers handling business logic
- `resources/js/Pages/`: React components organized by feature
- `resources/js/components/`: Reusable React components
- `database/migrations/`: Database schema definitions
- `routes/web.php`: Web routes
- `docs/`: Project documentation and setup guides

## Key Features

- User authentication and registration
- Store management (each user has a store)
- Product CRUD operations (add, update, delete, search products)
- Dashboard for store owners
- Responsive design with modern UI components

## Development Conventions

- Use TypeScript for all new React components
- Follow Laravel naming conventions for models, controllers, and migrations
- Use Inertia.js for server-side routing and data passing
- Write tests using Pest for PHP code
- Commit messages follow conventional format
- Use ESLint and Prettier for code formatting

## Current Status

- User registration and login implemented
- Basic store and product models created
- Dashboard in progress
- Product management features planned

This context should help you understand the codebase and provide relevant assistance for development tasks.
