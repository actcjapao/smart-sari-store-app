<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\Dashboard\DashboardService;

class DashboardController extends Controller
{
    public function loadPage(Request $request, DashboardService $dashboardService)
    {
        $user = $request->attributes->get('authenticated_user')
            ?? session('authenticated_user_with_subscription');

        if (!$user instanceof User) {
            abort(403, 'Unauthorized');
        }

        return inertia('dashboard/Dashboard', [
            'dashboardData' => $dashboardService->get($user),
        ]);
    }
}
