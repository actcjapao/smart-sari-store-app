<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SaveProductRequest;

use App\Models\Product;
use App\Models\User;
use App\Models\UserStore;

class ProductController extends Controller
{
    function loadPage() {
        $authenticatedUser = session('authenticated_user');
        $userUuid = $authenticatedUser->uuid;
        $user = User::where('uuid', $userUuid)->firstOrFail();
        $userStore = UserStore::where('user_id', $user->id)->firstOrFail();
        
        $products = Product::where('store_id', $userStore->id)
                        ->latest()
                        ->get();

        return inertia('products/Products', [
            'store_id' => $userStore->id,
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
