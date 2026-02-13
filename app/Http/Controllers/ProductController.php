<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    function loadProductsPage() {
        return inertia('products/Products');
    }

    function save(Request $request) {
        /**
         * Validation that is recommended by Inertia
         * $request->validate($rules, $customErrorMessages);
         */
        $rules = [
            'store_id' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'brand' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'tags' => ['nullable', 'array'],
        ];

        $customErrorMessages = [
            'store_id.required' => 'Store ID is required.',
            'store_id.string' => 'Store ID must be a string.',
            'store_id.max' => 'Store ID cannot exceed 255 characters.',
            'store_id.regex' => 'Store ID can only contain letters and spaces.',

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

            'tags.array' => 'Tags must be an array of strings.',
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

        return redirect()->route('products.page.load')->with('success', 'Product saved successfully.');
    }
}
