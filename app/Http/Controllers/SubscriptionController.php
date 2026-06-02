<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    function loadPage() {
        return inertia('subscription/Pricing');
    }
}
