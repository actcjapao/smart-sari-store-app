<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    function loadProductsPage() {
        return inertia('products/Products');
    }
}
