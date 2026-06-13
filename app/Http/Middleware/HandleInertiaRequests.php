<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Models\User;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Access coming from SubscriptionMiddleware, which is guaranteed to run before this middleware for protected routes
        $user = session('authenticated_user_with_subscription');

        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],

            'auth' => [
                'user' => $user ? [
                    'user_uuid' => $user->uuid,
                    'name' => $user->name,
                    'email' => $user->email,
                    // Add any other user attributes you want to share with Inertia
                ] : null,
                'store' => $user && $user->userStores->isNotEmpty() ? [
                    'store_uuid' => $user->userStores[0]->store->uuid,
                    'store_name' => $user->userStores[0]->store->name,
                ] : null,
            ],

            'subscription' => $user ? [
                'status' => $user->subscription?->status,
                'plan' => $user->subscription?->plan,
                'active' => $user->hasActiveSubscription(),
                // Add any other subscription attributes you want to share with Inertia
            ] : null,
        ]);
    }
}
