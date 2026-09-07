<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'user_id',
        'filename',
        'original_filename',
        'mime_type',
        'size',
        'path',
        'disk',
        'alt_text',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getUrlAttribute(): ?string
    {
        if (!$this->path) return null;
        return Storage::disk($this->disk)->url($this->path);
    }
}
