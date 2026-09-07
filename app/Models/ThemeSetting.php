<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThemeSetting extends Model
{
    protected $fillable = [
        'user_id',
        'active_theme',
        'allow_visitor_switching',
        'custom_overrides',
    ];

    protected function casts(): array
    {
        return [
            'custom_overrides' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
