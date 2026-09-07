<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class HeroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'headline' => 'required|string|max:500',
            'subheadline' => 'nullable|string|max:500',
            'introduction' => 'nullable|string|max:2000',
            'cta_primary_text' => 'nullable|string|max:100',
            'cta_primary_url' => 'nullable|string|max:2048',
            'cta_secondary_text' => 'nullable|string|max:100',
            'cta_secondary_url' => 'nullable|string|max:2048',
            'show_availability' => 'boolean',
            'show_scroll_indicator' => 'boolean',
            'hero_image' => 'nullable|image|max:10240',
            'hero_image_path' => 'nullable|string',
            'hero_image_type' => 'nullable|in:upload,url',
        ];
    }
}
