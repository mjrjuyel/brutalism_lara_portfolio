<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class SiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'logo_type' => 'required|in:upload,url,text',
            'logo' => 'nullable|image|max:5120',
            'logo_path' => 'nullable|string',
            'logo_text' => 'nullable|string|max:255',
            'favicon_type' => 'nullable|in:upload,url,default',
            'favicon' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,ico,webp|max:2048',
            'favicon_path' => 'nullable|string',
            'footer_text' => 'nullable|string|max:1000',
            'maintenance_mode' => 'boolean',
            'analytics_id' => 'nullable|string|max:255',
            'custom_css' => 'nullable|string|max:10000',
            'custom_js' => 'nullable|string|max:10000',
        ];
    }
}
