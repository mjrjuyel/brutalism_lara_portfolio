<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SiteSettingRequest;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Settings/Edit', [
            'settings' => $request->user()->siteSetting()->firstOrCreate([])
        ]);
    }

    public function update(SiteSettingRequest $request)
    {
        $user = $request->user();
        $setting = $user->siteSetting()->firstOrCreate([]);
        $data = $request->validated();
        
        if ($request->hasFile('logo')) {
            if ($setting->logo_type === 'upload' && $setting->logo_path) {
                $this->mediaService->delete($setting->logo_path);
            }
            $result = $this->mediaService->upload($request->file('logo'), 'settings');
            $data['logo_path'] = $result['path'];
            $data['logo_type'] = 'upload';
        } elseif ($request->filled('logo_path') && $request->input('logo_type') === 'url') {
            $data['logo_path'] = $request->input('logo_path');
            $data['logo_type'] = 'url';
        }

        if ($request->hasFile('favicon')) {
            if ($setting->favicon_type === 'upload' && $setting->favicon_path) {
                $this->mediaService->delete($setting->favicon_path);
            }
            $result = $this->mediaService->upload($request->file('favicon'), 'settings');
            $data['favicon_path'] = $result['path'];
            $data['favicon_type'] = 'upload';
        } elseif ($request->filled('favicon_path') && $request->input('favicon_type') === 'url') {
            $data['favicon_path'] = $request->input('favicon_path');
            $data['favicon_type'] = 'url';
        } elseif ($request->input('favicon_type') === 'default') {
            $data['favicon_path'] = null;
            $data['favicon_type'] = 'default';
        }

        $setting->update($data);
        return back()->with('success', 'Site settings updated.');
    }
}
