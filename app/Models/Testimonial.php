<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'position',
        'company',
        'content',
        'avatar_type',
        'avatar_path',
        'rating',
        'is_featured',
        'sort_order',
        'is_active',
    ];

    protected $appends = ['avatar_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function getAvatarUrlAttribute(): ?string
    {
        if (!$this->avatar_path) return null;
        return $this->avatar_type === 'url'
            ? $this->avatar_path
            : Storage::url($this->avatar_path);
    }
}
