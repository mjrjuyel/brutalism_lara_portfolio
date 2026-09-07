<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'icon' => 'nullable|string|max:255',
            'price_label' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
