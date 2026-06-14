<?php

namespace App\Actions\Dashboard;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;

class GetMetricsAction
{
    public function handle(?int $storeId): array
    {
        if (!$storeId) {
            return [
                'total_products' => 0,
                'total_sales_cost' => 0,
                'total_sales' => 0,
                'total_profit' => 0,
            ];
        }

        $totalProducts = Product::where('store_id', $storeId)->count();
        $totalSales = Sale::where('store_id', $storeId)->sum('total_amount');
        $totalSalesCost = SaleItem::query()
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->where('sales.store_id', $storeId)
            ->sum('sale_items.total_cost_price_at_sale');

        return [
            'total_products' => $totalProducts,
            'total_sales_cost' => $totalSalesCost,
            'total_sales' => $totalSales,
            'total_profit' => $totalSales - $totalSalesCost,
        ];
    }
}