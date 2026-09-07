<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string|max:5000',
            'avatar_type' => 'nullable|in:upload,url',
            'avatar' => 'nullable|image|max:5120',
            'avatar_path' => 'nullable|url',
            'rating' => 'nullable|integer|min:1|max:5',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
