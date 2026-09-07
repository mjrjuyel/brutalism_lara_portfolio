<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => 'nullable|string|max:10000',
            'philosophy' => 'nullable|string|max:2000',
            'profile_image_type' => 'nullable|in:upload,url',
            'profile_image' => 'nullable|image|max:5120',
            'profile_image_path' => 'nullable|url',
        ];
    }
}
