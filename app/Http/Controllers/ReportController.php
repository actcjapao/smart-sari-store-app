<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ReportController extends Controller
{
    function loadPage() {
        return inertia('reports/Reports');
    }

    function records(Request $request) {
        $dateRange = $request->get('date_range', 'Today');
        $customStartDate = $request->get('start_date');
        $customEndDate = $request->get('end_date');

        $authenticatedUser = session('authenticated_user');
        if (!$authenticatedUser) {
            abort(403, 'Unauthorized');
        }

        $userUuid = $authenticatedUser->uuid;
        $user = User::with('userStores:user_id,store_id')
            ->where('uuid', $userUuid)
            ->firstOrFail();

        $storeId = $user->userStores->first()?->store_id;
        if (!$storeId) {
            return response()->json([
                'data' => [
                    'sales' => [],
                    'summary' => [
                        'total_sales' => 0,
                        'total_cost' => 0,
                        'total_profit' => 0,
                    ],
                ],
            ]);
        }

        $salesQuery = Sale::where('store_id', $storeId);

        $applyDateFilter = function ($query,  $column = 'created_at') use ($dateRange, $customStartDate, $customEndDate) {
            $now = Carbon::now();

            switch ($dateRange) {
                case 'This week':
                    return $query->whereBetween($column, [
                        $now->copy()->startOfWeek(),
                        $now->copy()->endOfWeek(),
                    ]);
                case 'This month':
                    return $query->whereBetween($column, [
                        $now->copy()->startOfMonth(),
                        $now->copy()->endOfMonth(),
                    ]);
                case 'Custom':
                    if ($customStartDate && $customEndDate) {
                        $start = Carbon::parse($customStartDate)->startOfDay();
                        $end = Carbon::parse($customEndDate)->endOfDay();
                        if ($end->lt($start)) {
                            [$start, $end] = [$end, $start];
                        }
                        return $query->whereBetween($column, [$start, $end]);
                    }
                    return $query;
                default:
                    return $query->whereDate($column, $now->toDateString());
            }
        };

        $salesQuery = $applyDateFilter($salesQuery, 'created_at');

        $sales = $salesQuery
            ->select([
                'id',
                'uuid',
                'created_at',
                'payment_method',
                'total_amount',
                'payment_amount',
                'change_amount',
            ])
            ->orderByDesc('created_at')
            ->get();

        $totalSales = $salesQuery->sum('total_amount');

        $totalCost = DB::table('sale_items')
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->where('sales.store_id', $storeId);

        $totalCost = $applyDateFilter($totalCost, 'sales.created_at')
            ->selectRaw('COALESCE(SUM(products.cost_price * sale_items.quantity), 0) as total_cost')
            ->value('total_cost');

        return response()->json([
            'data' => [
                'sales' => $sales,
                'summary' => [
                    'total_sales' => (float) $totalSales,
                    'total_cost' => (float) $totalCost,
                    'total_profit' => (float) ($totalSales - $totalCost),
                ],
            ],
        ]);
    }
}
