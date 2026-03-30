<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = "posts";

    protected $fillable = [
        'title',
        'content',
    ];

    /**
     * Scope to select only essential columns
     */
    public function scopeWithEssentialColumns($query)
    {
        return $query->select([
            'id as post_id',
            'title',
            'content',
        ]);
    }

    /**
     * Scope to order by latest posts
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
