# Dashboard Store Filter Implementation

## Summary

The dashboard analytics system has been refactored to filter all data by the authenticated user's associated store. This prevents data leakage and ensures each user only sees metrics for their own store.

## Problem Statement

Previously, the dashboard actions (`GetMetricsAction`, `GetSalesOverviewAction`, `GetWeeklySalesAction`, `GetTopProductsAction`) were querying the entire database without any store-level filtering. This meant:

- All users would see aggregated data from all stores
- Products, sales, and metrics had no user/store boundaries
- Multi-tenant isolation was not enforced

## Solution Architecture

### Data Flow

```
Request → DashboardController
   ↓
   Extract authenticated user from request attributes or session
   ↓
DashboardService.get(User $user)
   ↓
   Extract store_id from user->userStores->first()->store_id
   ↓
Pass $storeId to each dashboard action
   ↓
GetMetricsAction.handle(?int $storeId)
GetSalesOverviewAction.handle(?int $storeId)
GetWeeklySalesAction.handle(?int $storeId)
GetTopProductsAction.handle(?int $storeId)
   ↓
   Each action filters queries by: WHERE store_id = $storeId
   ↓
Return aggregated metrics for that store only
```

## Modified Files

### 1. **DashboardController** - [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php)

**Changes:**

- Retrieve authenticated user from request attributes or session
- Pass user instance to `DashboardService.get($user)`
- Added User type hint and authorization check

**Key Code:**

```php
public function loadPage(Request $request, DashboardService $dashboardService)
{
    $user = $request->attributes->get('authenticated_user')
        ?? session('authenticated_user_with_subscription');

    if (!$user instanceof User) {
        abort(403, 'Unauthorized');
    }

    return inertia('dashboard/Dashboard', [
        'dashboardData' => $dashboardService->get($user),
    ]);
}
```

### 2. **DashboardService** - [app/Services/Dashboard/DashboardService.php](app/Services/Dashboard/DashboardService.php)

**Changes:**

- Updated `get()` method to accept User parameter
- Extract store_id from user's userStores relationship
- Pass store_id to each dashboard action

**Key Code:**

```php
public function get(User $user): array
{
    $storeId = $user->userStores->first()?->store_id;

    return [
        'metrics' => $this->getMetricsAction->handle($storeId),
        'sales_overview_chart' => $this->getSalesOverviewAction->handle($storeId),
        'weekly_sales' => $this->getWeeklySalesAction->handle($storeId),
        'top_products' => $this->getTopProductsAction->handle($storeId),
    ];
}
```

### 3. **GetMetricsAction** - [app/Actions/Dashboard/GetMetricsAction.php](app/Actions/Dashboard/GetMetricsAction.php)

**Changes:**

- Changed signature to `handle(?int $storeId)`
- Added guard clause for null storeId (returns empty metrics)
- Added WHERE clause: `->where('store_id', $storeId)` for all queries

**Filtered Queries:**

- `Product::where('store_id', $storeId)->count()`
- `Sale::where('store_id', $storeId)->sum('total_amount')`
- SaleItem join filtered by `sales.store_id`

### 4. **GetSalesOverviewAction** - [app/Actions/Dashboard/GetSalesOverviewAction.php](app/Actions/Dashboard/GetSalesOverviewAction.php)

**Changes:**

- Changed signature to `handle(?int $storeId)`
- Added guard clause returning empty 7-day array if no storeId
- Added WHERE clause: `->where('sales.store_id', $storeId)`

**Filtered Query:**

```php
$salesData = Sale::query()
    ->join('sale_items', 'sales.id', '=', 'sale_items.sale_id')
    ->select([...])
    ->where('sales.store_id', $storeId)  // ← Store filter
    ->whereBetween('sales.created_at', [...])
    ->groupBy(...)
    ->get();
```

### 5. **GetWeeklySalesAction** - [app/Actions/Dashboard/GetWeeklySalesAction.php](app/Actions/Dashboard/GetWeeklySalesAction.php)

**Changes:**

- Changed signature to `handle(?int $storeId)`
- Added guard clause returning empty week array if no storeId
- Added WHERE clause: `->where('sales.store_id', $storeId)`

**Filtered Query:**

```php
$salesData = Sale::query()
    ->join('sale_items', 'sales.id', '=', 'sale_items.sale_id')
    ->select([...])
    ->where('sales.store_id', $storeId)  // ← Store filter
    ->whereBetween('sales.created_at', [...])
    ->groupBy(...)
    ->get();
```

### 6. **GetTopProductsAction** - [app/Actions/Dashboard/GetTopProductsAction.php](app/Actions/Dashboard/GetTopProductsAction.php)

**Changes:**

- Changed signature to `handle(?int $storeId)`
- Added guard clause returning empty array if no storeId
- Added WHERE clause: `->where('products.store_id', $storeId)`
- Added LEFT JOINs with sales to calculate daily/overall stats per store

**Filtered Query:**

```php
return Product::query()
    ->where('products.store_id', $storeId)  // ← Store filter
    ->leftJoin('sale_items', 'sale_items.product_id', '=', 'products.id')
    ->leftJoin('sales', 'sales.id', '=', 'sale_items.sale_id')
    ->select([...])
    ->groupBy(...)
    ->get();
```

## Data Integrity Safeguards

### Null Store Handling

All dashboard actions gracefully handle scenarios where a user has no associated store:

```php
if (!$storeId) {
    return []; // or appropriate empty structure
}
```

### Authentication Layer

- User is retrieved from request attributes (set by `AuthenticationMiddleware`)
- Fallback to session if request attribute unavailable
- Type check ensures User instance is valid
- Aborts with 403 if user validation fails

### Multi-Store Support (Future)

The current implementation assumes one store per user. When supporting multiple stores:

1. DashboardController can accept store selection parameter
2. Pass selected storeId explicitly instead of extracting from first userStore
3. Frontend can provide store switcher UI

## Database Relationships

**Data Model Dependencies:**

- `User` → `userStores` → `Store` (OneToMany/BelongsToMany)
- `Sale` has `store_id` column
- `Product` has `store_id` column
- `SaleItem` references Sale (which has store_id)

**Query Performance:**

- All indexed queries use `store_id` as primary filter
- Join operations on indexed columns (sale_id, product_id)
- Date range filters applied AFTER store filter for optimization

## Testing Recommendations

### Unit Tests

1. Test DashboardService extracts correct storeId
2. Test each dashboard action filters by storeId
3. Test null storeId handling returns empty results

### Integration Tests

1. Create users with different stores
2. Verify each user sees only their store's metrics
3. Verify no data leakage between stores

### Example Test:

```php
public function test_dashboard_metrics_filtered_by_user_store()
{
    $user1 = User::factory()->create();
    $store1 = Store::factory()->create();
    UserStore::create(['user_id' => $user1->id, 'store_id' => $store1->id]);

    $user2 = User::factory()->create();
    $store2 = Store::factory()->create();
    UserStore::create(['user_id' => $user2->id, 'store_id' => $store2->id]);

    // Create sales for each store
    Sale::factory()->count(5)->create(['store_id' => $store1->id]);
    Sale::factory()->count(3)->create(['store_id' => $store2->id]);

    $dashboardService = new DashboardService(
        new GetMetricsAction(),
        new GetSalesOverviewAction(),
        new GetWeeklySalesAction(),
        new GetTopProductsAction(),
    );

    $metrics1 = $dashboardService->get($user1)['metrics'];
    $metrics2 = $dashboardService->get($user2)['metrics'];

    // Verify different metrics for different users
    $this->assertNotEquals($metrics1['total_sales'], $metrics2['total_sales']);
}
```

## Migration Path (if needed)

If this is deployed to an existing database with mixed/unfiltered data:

1. Audit database for orphaned records without store_id
2. Assign store_id to historical records
3. Add database constraints: `ALTER TABLE sales ADD CONSTRAINT sales_store_id_fk FOREIGN KEY (store_id) REFERENCES stores(id)`
4. Enable NOT NULL on store_id columns

## Future Enhancements

1. **Store Selection UI** - Allow users with multiple stores to switch dashboard view
2. **Caching** - Cache dashboard metrics by store_id to reduce query load
3. **Audit Logging** - Track which user accessed which store's analytics
4. **Role-Based Access** - Differentiate admin (all stores) vs user (own stores)
5. **Date Range Selection** - Make date ranges configurable in frontend
