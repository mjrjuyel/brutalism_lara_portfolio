<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class SeoSetting extends Model
{
    protected $fillable = [
        'user_id',
        'site_title',
        'meta_description',
        'keywords',
        'og_image_type',
        'og_image_path',
        'favicon_path',
        'canonical_url',
        'robots',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getOgImageUrlAttribute(): ?string
    {
        if (!$this->og_image_path) return null;
        return $this->og_image_type === 'url'
            ? $this->og_image_path
            : Storage::url($this->og_image_path);
    }
}
