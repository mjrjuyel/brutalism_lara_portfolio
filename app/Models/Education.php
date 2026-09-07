<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'user_id',
        'institution',
        'degree',
        'field',
        'start_date',
        'end_date',
        'description',
        'logo_type',
        'logo_path',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo_path) return null;
        return $this->logo_type === 'url'
            ? $this->logo_path
            : Storage::url($this->logo_path);
    }
}
