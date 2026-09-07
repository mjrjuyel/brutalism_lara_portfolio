<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HeroRequest;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Hero/Edit', [
            'hero' => $request->user()->heroSetting()->firstOrCreate([])
        ]);
    }

    public function update(HeroRequest $request)
    {
        $hero = $request->user()->heroSetting()->firstOrCreate([]);
        $data = $request->validated();

        if ($request->hasFile('hero_image')) {
            if ($hero->hero_image_type === 'upload' && $hero->hero_image_path) {
                $this->mediaService->delete($hero->hero_image_path);
            }
            $result = $this->mediaService->upload($request->file('hero_image'), 'hero');
            $data['hero_image_path'] = $result['path'];
            $data['hero_image_type'] = 'upload';
        } elseif ($request->filled('hero_image_path') && $request->input('hero_image_type') === 'url') {
            $data['hero_image_path'] = $request->input('hero_image_path');
            $data['hero_image_type'] = 'url';
        }

        $hero->update($data);

        return back()->with('success', 'Hero settings and image updated.');
    }
}
