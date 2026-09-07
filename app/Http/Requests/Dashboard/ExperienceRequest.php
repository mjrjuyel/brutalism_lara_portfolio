<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string|max:5000',
            'technologies' => 'nullable|array',
            'company_url' => 'nullable|url|max:2048',
            'logo_type' => 'nullable|in:upload,url',
            'logo' => 'nullable|image|max:5120',
            'logo_path' => 'nullable|url',
        ];
    }
}
