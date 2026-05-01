<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{

    function loadPage() {
        return inertia('reports/Reports');
    }
}
