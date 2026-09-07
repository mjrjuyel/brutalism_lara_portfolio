<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class HeroSetting extends Model
{
    protected $fillable = [
        'user_id',
        'headline',
        'subheadline',
        'introduction',
        'cta_primary_text',
        'cta_primary_url',
        'cta_secondary_text',
        'cta_secondary_url',
        'show_availability',
        'show_scroll_indicator',
        'hero_image_type',
        'hero_image_path',
    ];

    protected $appends = [
        'hero_image_url',
    ];

    public function getHeroImageUrlAttribute(): ?string
    {
        if (!$this->hero_image_path) {
            return null;
        }

        return $this->hero_image_type === 'url'
            ? $this->hero_image_path
            : Storage::url($this->hero_image_path);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
