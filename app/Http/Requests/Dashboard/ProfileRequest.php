<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->user()->id,
            'username' => 'nullable|string|max:50|unique:users,username,' . $this->user()->id,
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:5000',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:2048',
            'availability' => 'required|in:available,busy,unavailable',
            'years_of_experience' => 'required|integer|min:0|max:100',
            'profile_image_type' => 'nullable|in:upload,url',
            'profile_image' => 'nullable|image|max:5120',
            'profile_image_path' => 'nullable|url',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ];
    }
}
