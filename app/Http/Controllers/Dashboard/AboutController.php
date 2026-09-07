<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AboutRequest;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/About/Edit', [
            'about' => $request->user()->aboutSetting()->firstOrCreate([])
        ]);
    }

    public function update(AboutRequest $request)
    {
        $user = $request->user();
        $about = $user->aboutSetting()->firstOrCreate([]);
        $data = $request->validated();
        
        if ($request->hasFile('profile_image')) {
            if ($about->profile_image_type === 'upload' && $about->profile_image_path) {
                $this->mediaService->delete($about->profile_image_path);
            }
            $result = $this->mediaService->upload($request->file('profile_image'), 'about');
            $data['profile_image_path'] = $result['path'];
            $data['profile_image_type'] = 'upload';
        } elseif ($request->filled('profile_image_path') && $request->input('profile_image_type') === 'url') {
            $data['profile_image_path'] = $request->input('profile_image_path');
            $data['profile_image_type'] = 'url';
        }

        $about->update($data);
        return back()->with('success', 'About settings updated.');
    }
}
