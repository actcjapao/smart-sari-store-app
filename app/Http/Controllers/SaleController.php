<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SaleController extends Controller
{

    function loadPage() {
        return inertia('sales/Sales');
    }
}
