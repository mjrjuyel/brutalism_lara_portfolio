<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class AboutSetting extends Model
{
    protected $fillable = [
        'user_id',
        'content',
        'philosophy',
        'profile_image_type',
        'profile_image_path',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getProfileImageUrlAttribute(): ?string
    {
        if (!$this->profile_image_path) return null;
        return $this->profile_image_type === 'url'
            ? $this->profile_image_path
            : Storage::url($this->profile_image_path);
    }
}
