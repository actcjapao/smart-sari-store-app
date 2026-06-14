<?php

namespace App\Services\Dashboard;

use App\Actions\Dashboard\GetMetricsAction;
use App\Actions\Dashboard\GetSalesOverviewAction;
use App\Actions\Dashboard\GetWeeklySalesAction;
use App\Actions\Dashboard\GetTopProductsAction;

class DashboardService
{
    public function __construct(
        protected GetMetricsAction $getMetricsAction,
        protected GetSalesOverviewAction $getSalesOverviewAction,
        protected GetWeeklySalesAction $getWeeklySalesAction,
        protected GetTopProductsAction $getTopProductsAction,
    ) {}

    public function get(\App\Models\User $user): array
    {
        $storeId = $user->userStores->first()?->store_id;

        return [
            'metrics' => $this->getMetricsAction->handle($storeId),
            'sales_overview_chart' => $this->getSalesOverviewAction->handle($storeId),
            'weekly_sales' => $this->getWeeklySalesAction->handle($storeId),
            'top_products' => $this->getTopProductsAction->handle($storeId),
        ];
    }
}