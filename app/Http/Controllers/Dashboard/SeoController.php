<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SeoRequest;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Seo/Edit', [
            'seo' => $request->user()->seoSetting()->firstOrCreate([])
        ]);
    }

    public function update(SeoRequest $request)
    {
        $user = $request->user();
        $seo = $user->seoSetting()->firstOrCreate([]);
        $data = $request->validated();
        
        if ($request->hasFile('og_image')) {
            if ($seo->og_image_type === 'upload' && $seo->og_image_path) {
                $this->mediaService->delete($seo->og_image_path);
            }
            $result = $this->mediaService->upload($request->file('og_image'), 'seo');
            $data['og_image_path'] = $result['path'];
            $data['og_image_type'] = 'upload';
        } elseif ($request->filled('og_image_path') && $request->input('og_image_type') === 'url') {
            $data['og_image_path'] = $request->input('og_image_path');
            $data['og_image_type'] = 'url';
        }

        if ($request->hasFile('favicon')) {
            if ($seo->favicon_path) {
                $this->mediaService->delete($seo->favicon_path);
            }
            $result = $this->mediaService->upload($request->file('favicon'), 'seo');
            $data['favicon_path'] = $result['path'];
        }

        $seo->update($data);
        return back()->with('success', 'SEO settings updated.');
    }
}
