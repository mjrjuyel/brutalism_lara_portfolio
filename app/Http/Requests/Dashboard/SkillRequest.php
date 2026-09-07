<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skill_category_id' => 'required|exists:skill_categories,id',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
            'experience_years' => 'nullable|integer|min:0|max:50',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
