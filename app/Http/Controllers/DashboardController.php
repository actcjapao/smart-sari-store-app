<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function loadDashboardPage() {
        return inertia('dashboard/Dashboard');
    }
}
