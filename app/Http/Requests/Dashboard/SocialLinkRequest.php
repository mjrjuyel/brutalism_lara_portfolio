<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'platform' => 'required|string|in:github,linkedin,twitter,facebook,instagram,youtube,dribbble,behance',
            'url' => 'required|url|max:2048',
            'is_active' => 'boolean',
        ];
    }
}
