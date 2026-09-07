<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class SeoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'keywords' => 'nullable|string|max:500',
            'og_image_type' => 'nullable|in:upload,url',
            'og_image' => 'nullable|image|max:5120',
            'og_image_path' => 'nullable|url',
            'favicon' => 'nullable|image|max:2048',
            'canonical_url' => 'nullable|url|max:2048',
            'robots' => 'nullable|string|max:255',
        ];
    }
}
