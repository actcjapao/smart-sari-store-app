<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Retrieve the authenticated user from the previous AuthenticationMiddleware
        $user = $request
            ->attributes
            ->get('authenticated_user');

        if (!$user) {
            return redirect('/login');
        }

        if (!$user->hasActiveSubscription()) {
            if (
                $request->wantsJson() ||
                $request->is('api/*')
            ) {
                return response()->json([
                    'message' => 'Subscription required.',
                ], 403);
            }

            // This page does not exist yet, but the idea is to redirect users without active subscription to a billing page where they can subscribe or manage their subscription
            return redirect('/pricing')
                ->with(
                    'error',
                    'An active subscription is required.'
                );
        }

        /**
         * Purpose: Instead of doing redudant user lookup in HandleInertiaRequests, we can do it once here
         * and make the user object available via session. This way, we have the latest user data including 
         * subscription status available for Inertia views.
         */
        session()->put('authenticated_user_with_subscription', $user);

        // Proceed to the next middleware or controller
        return $next($request);
    }
}
