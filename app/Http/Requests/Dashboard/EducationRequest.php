<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'description' => 'nullable|string|max:5000',
            'logo_type' => 'nullable|in:upload,url',
            'logo' => 'nullable|image|max:5120',
            'logo_path' => 'nullable|url',
        ];
    }
}
