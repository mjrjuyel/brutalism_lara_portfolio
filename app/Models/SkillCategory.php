<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class SkillCategory extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'sort_order',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc');
    }
}
