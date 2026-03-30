<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SaveProductRequest;
use Illuminate\Support\Facades\Log;

use App\Models\Product;
use App\Models\User;
use App\Models\UserStore;

class ProductController extends Controller
{
    /**
     * Pagination limit for products per page
     */
    private const PRODUCTS_PER_PAGE = 15;

    function loadPage() {
        $authenticatedUser = session('authenticated_user');
        $userUuid = $authenticatedUser->uuid;

        // Get user's store using relationships - avoids N+1 query
        $userStore = User::with('userStores:user_id,store_id')
                        ->where('uuid', $userUuid)
                        ->firstOrFail();
        
        // Paginate products with only needed columns
        $products = Product::where('store_id', $userStore->store_id)
                        ->select([
                            'id', 'uuid', 'store_id',
                            'name', 'brand', 'description',
                            'price', 'stock_quantity', 'tags',
                            'is_active', 'created_at'])
                        ->latest()
                        ->paginate(self::PRODUCTS_PER_PAGE);

        Log::info("Products loaded for store: $products");

        return inertia('products/Products', [
            'store_id' => $userStore->store_id,
            'products' => $products
        ]);
    }

    function save(SaveProductRequest $request, $product_uuid = null) {
        if ($product_uuid) {
            $product = Product::where('uuid', $product_uuid)->firstOrFail();
            $product->update($request->validated());
        } else {
            $product = Product::create($request->validated());
        }

        // Redirect to the products page with a success message (but only reloads the product list in the frontend)
        return back()->with('success', 'Product saved successfully!');
    }
}
