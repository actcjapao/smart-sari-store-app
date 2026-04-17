<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Sale extends Model
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
     *     'name' => 'Sample Sale',
     *     'item' => 'xyz', // Not in $fillable, so will be ignored
     * ];
     *
     * Sales::create($data);
     * // Only 'store_id', 'name', are saved
     * ```
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'store_id',
        'total_amount',
        'payment_amount',
        'change_amount',
        'status',
        'notes',
    ];

    /**
     * Tell Laravel which column is the UUID to auto-generate.
     * 
     * Laravel will check if uses HasUuids trait before calling this method.
     * If HasUuids trait exist in this model, it will check if uniqueIds() method exist.
     * If uniqueIds() method exist, it will use the returned array to know
     * which columns are UUIDs and auto-generate them.
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    /**
     * Get the sale items pivot records.
     */
    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }
}
