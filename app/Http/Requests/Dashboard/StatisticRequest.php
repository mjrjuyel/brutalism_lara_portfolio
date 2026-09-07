<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StatisticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:50',
            'suffix' => 'nullable|string|max:20',
            'numeric_value' => 'required|integer|min:0',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}
