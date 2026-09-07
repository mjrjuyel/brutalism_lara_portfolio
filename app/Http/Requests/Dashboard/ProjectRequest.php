<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . ($this->route('project') ? $this->route('project')->id : 'NULL'),
            'short_description' => 'nullable|string|max:1000',
            'description' => 'nullable|string|max:50000',
            'thumbnail_type' => 'nullable|in:upload,url',
            'thumbnail' => 'nullable|image|max:5120',
            'thumbnail_path' => 'nullable|url|max:2048',
            'live_url' => 'nullable|url|max:2048',
            'github_url' => 'nullable|url|max:2048',
            'category' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'client' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'technologies' => 'nullable|array',
            'technologies.*' => 'exists:technologies,id',
        ];
    }
}
