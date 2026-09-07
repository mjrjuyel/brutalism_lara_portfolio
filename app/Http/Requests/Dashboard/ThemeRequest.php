<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ThemeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'active_theme' => 'required|string|in:cyber-brutalism,mono-brutal,digital-terminal,acid-future,minimal-future',
            'allow_visitor_switching' => 'boolean',
        ];
    }
}
