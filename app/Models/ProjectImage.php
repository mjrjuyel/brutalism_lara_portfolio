<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class ProjectImage extends Model
{
    protected $fillable = [
        'project_id',
        'image_type',
        'image_path',
        'caption',
        'sort_order',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image_path) return null;
        return $this->image_type === 'url'
            ? $this->image_path
            : Storage::url($this->image_path);
    }
}
