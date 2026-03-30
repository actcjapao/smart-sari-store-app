---
name: inertia-react-laravel
description: Best practices for full-stack apps using Laravel 12, Inertia.js, and React.
---

# Inertia + React + Laravel 12 Skill

This skill captures development conventions for projects that combine:
- Laravel 12 for backend/VCS, ORM, validation, authentication, routing, and API resources.
- Inertia.js for server-driven single-page apps with shared state and navigation.
- React for UI components, hooks, client-side state, and TypeScript path safety.

## 1. Laravel 12 backend patterns

### 1.1 Use API Resources / Resource Collections
```php
use App\Http\Resources\ProductResource;

public function index()
{
    $products = Product::with('store', 'images')->paginate(20);
    return inertia('Products/Index', [
        'products' => ProductResource::collection($products),
    ]);
}
```

### 1.2 Validation in Form Requests
```php
class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ];
    }
}
```

### 1.3 Eager load relationships + avoid N+1
```php
$stores = Store::with(['owner', 'products'])->paginate();
```

### 1.4 Route model binding + RESTful controllers
```php
Route::resource('products', ProductController::class);
```

### 1.5 Use `->through()` when transforming nested resources
```php
use App\Models\User;

return Inertia::render('Users/Index', [
    'users' => User::with('stores')
        ->get()
        ->through(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'stores_count' => $user->stores_count,
        ]),
]);
```

## 2. Inertia.js conventions

### 2.1 Shared props + global state
```php
// AppServiceProvider
Inertia::share([
    'auth.user' => fn() => auth()->user() ? auth()->user()->only('id', 'name', 'email') : null,
    'flash' => fn() => [
        'success' => session('success'),
        'error' => session('error'),
    ],
]);
```

### 2.2 Use `Inertia::lazy()` for heavy data
```php
return Inertia::render('Products/Index', [
    'most_expensive' => Inertia::lazy(fn() => ProductResource::collection(Product::expensive()->take(5)->get())),
]);
```

### 2.3 Use `redirect()->route()` and `Inertia::location()` properly
```php
return redirect()->route('products.index')->with('success', 'Created');
```

### 2.4 Prevent mass assignment in controllers
```php
$product = Product::create($request->validated());
```

## 3. React + TypeScript conventions

### 3.1 Pages as components with typed props
```tsx
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

type Product = { id: number; name: string; price: number };

type Props = { products: Product[]; auth: { user: { name: string } | null } };

export default function ProductsIndex() {
  const { props } = usePage<{ props: Props }>();
  const { products, auth } = props;

  return (
    <div>
      <h1>Hi {auth.user?.name}</h1>
      {products.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
}
```

### 3.2 Use `useForm` from Inertia for optimistic UI and errors
```tsx
import { useForm } from '@inertiajs/inertia-react';

function ProductCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    price: 0,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/products');
  };

  return (
    <form onSubmit={submit}>
      <input value={data.name} onChange={(e) => setData('name', e.target.value)} />
      {errors.name && <span>{errors.name}</span>}
      <button disabled={processing}>Save</button>
    </form>
  );
}
```

### 3.3 Components + hooks
- Keep components small and focused
- Use custom hooks for repeated Inertia form logic, filtered lists, and table state
- Use `React.memo` and `useMemo` for expensive transforms

### 3.4 CSS architecture
- Use module CSS, Tailwind utilities, or scoped component styles
- Do not mutate global style for page-specific components unless intentional

## 4. Authentication + authorization

### 4.1 Policies + gates
```php
public function update(User $user, Product $product)
{
    return $user->id === $product->user_id;
}
```

Usage in controller:
```php
$this->authorize('update', $product);
```

### 4.2 Route middleware
```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('products', ProductController::class);
});
```

## 5. Testing strategy

### 5.1 Laravel feature tests with Inertia assertions
```php
use function Inertia\assert;

$this->actingAs($user)
     ->get(route('products.index'))
     ->assertInertia(fn (Assert $page) =>
         $page->component('Products/Index')
              ->has('products')
     );
```

### 5.2 React component tests (Vitest / Jest)
- Render Inertia page components with mocked `usePage()` and `InertiaLink`
- Assert button click triggers `Inertia.post` when form submits

## 6. Performance and UX

- Use server pagination / cursor pagination
- Avoid heavyweight eager nested relations unless needed
- Use `once` in Inertia for transient props:
```php
Inertia::share('flash', fn() => [
    'success' => session()->pull('success'),
]);
```
- Add route caching in production:
```bash
php artisan route:cache
php artisan config:cache
```

## Checklist
- [ ] API resources used for payload shape
- [ ] Form requests for validation
- [ ] Eloquent relationships eagerly loaded
- [ ] Inertia shared props validated and typed
- [ ] React components typed via TypeScript
- [ ] Form and error handling via `useForm`
- [ ] Authorization policies enforced
- [ ] Tests cover Inertia pages + React units
- [ ] Production caches enabled
