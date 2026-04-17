<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * Only the attributes listed here can be set via mass assignment.
     *
     * Example:
     * ```php
     * $data = [
     *     'store_id' => '1',
     *     'sale_item' => 'Sample Sale Item',
     *     'item' => 'xyz', // Not in $fillable, so will be ignored
     * ];
     *
     * SaleItems::create($data);
     * // Only 'store_id', 'sale_item', are saved
     * ```
     *
     * @var list<string>
     */
    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'unit_price',
        'total_price',
    ];
    
    /**
     * Get the sale this item belongs to.
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
