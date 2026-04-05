<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class POSController extends Controller
{
    function loadPage() {
        return inertia('pos/POS');
    }
}
