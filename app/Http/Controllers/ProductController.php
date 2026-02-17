<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\User;
use App\Models\UserStore;

class ProductController extends Controller
{
    function loadProductsPage() {
        $authenticatedUser = session('authenticated_user');
        $userUuid = $authenticatedUser->uuid;
        $user = User::where('uuid', $userUuid)->firstOrFail();
        $userStore = UserStore::where('user_id', $user->id)->firstOrFail();
        
        return inertia('products/Products', [
            'store_id' => $userStore->id
        ]);
    }

    function save(Request $request) {
        /**
         * Validation that is recommended by Inertia
         * $request->validate($rules, $customErrorMessages);
         */
        $rules = [
            'store_id' => ['required', 'integer', 'exists:stores,id'],

            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'brand' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],

            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
        ];

        $customErrorMessages = [
            'store_id.required' => 'Store ID is required.',
            'store_id.integer' => 'Store ID must be an integer.',
            'store_id.exists' => 'The specified store does not exist.',

            'name.required' => 'Product name is required.',
            'name.string' => 'Product name must be a string.',
            'name.max' => 'Product name cannot exceed 255 characters.',
            'name.regex' => 'Product name can only contain letters and spaces.',

            'brand.string' => 'Brand must be a string.',
            'brand.max' => 'Brand cannot exceed 255 characters.',
            'description.string' => 'Description must be a string.',

            'stock_quantity.required' => 'Stock quantity is required.',
            'stock_quantity.integer' => 'Stock quantity must be an integer.',
            'stock_quantity.min' => 'Stock quantity cannot be negative.',

            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a number.',
            'price.min' => 'Price cannot be negative.',

            'tags.array' => 'Tags must be an array.',
            'tags.*.string' => 'Each tag must be a string.',
            'tags.*.max' => 'Each tag cannot exceed 50 characters.',
        ];

        $validatedData = $request->validate($rules, $customErrorMessages);

        $user = Product::create([
            'store_id' => $validatedData['store_id'],
            'name' => $validatedData['name'],
            'brand' => $validatedData['brand'] ?? null,
            'description' => $validatedData['description'] ?? null,
            'stock_quantity' => $validatedData['stock_quantity'],
            'price' => $validatedData['price'],
            'tags' => $validatedData['tags'] ?? [],
        ]);

        return back()->with('success', 'Product added successfully!');
    }
}
