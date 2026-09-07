<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'short_description',
        'description',
        'thumbnail_type',
        'thumbnail_path',
        'live_url',
        'github_url',
        'category',
        'year',
        'client',
        'is_featured',
        'status',
        'sort_order',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function projectImages(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail_path) return null;
        return $this->thumbnail_type === 'url'
            ? $this->thumbnail_path
            : Storage::url($this->thumbnail_path);
    }
}
