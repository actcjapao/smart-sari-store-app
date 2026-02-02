<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class UserStore extends Model
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
     *     'user_id' => '1',
     *     'store_id' => '1',
     *     'location' => 'sample', // Not in $fillable, so will be ignored
     * ];
     *
     * User::create($data);
     * // Only 'user_id', 'store_id' are saved
     * ```
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'store_id',
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
}
