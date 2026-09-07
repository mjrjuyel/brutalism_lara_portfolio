<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class SiteSetting extends Model
{
    protected $fillable = [
        'user_id',
        'logo_type',
        'logo_path',
        'logo_text',
        'favicon_type',
        'favicon_path',
        'footer_text',
        'maintenance_mode',
        'analytics_id',
        'custom_css',
        'custom_js',
    ];

    protected $appends = [
        'logo_url',
        'favicon_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo_path) return null;
        return $this->logo_type === 'url'
            ? $this->logo_path
            : Storage::url($this->logo_path);
    }

    public function getFaviconUrlAttribute(): ?string
    {
        if (!$this->favicon_path || $this->favicon_type === 'default') {
            return asset('favicon.svg');
        }
        return $this->favicon_type === 'url'
            ? $this->favicon_path
            : Storage::url($this->favicon_path);
    }
}
