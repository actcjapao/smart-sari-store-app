<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Store extends Model
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
     *     'name' => 'Alice',
     *     'email' => 'alice@example.com',
     *     'password' => bcrypt('secret'),
     *     'role' => 'admin', // Not in $fillable, so will be ignored
     * ];
     *
     * User::create($data);
     * // Only 'name', 'email', 'password' are saved
     * ```
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'location',
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
