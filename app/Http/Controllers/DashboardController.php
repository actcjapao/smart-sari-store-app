<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function loadPage() {
        return inertia('dashboard/Dashboard');
    }
}
