<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProfileRequest;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Profile/Edit', [
            'user' => $request->user()->load('socialLinks')
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        
        if ($request->hasFile('profile_image')) {
            if ($user->profile_image_type === 'upload' && $user->profile_image_path) {
                $this->mediaService->delete($user->profile_image_path);
            }
            $result = $this->mediaService->upload($request->file('profile_image'), 'profile');
            $data['profile_image_path'] = $result['path'];
            $data['profile_image_type'] = 'upload';
        } elseif ($request->filled('profile_image_path') && $request->input('profile_image_type') === 'url') {
            $data['profile_image_path'] = $request->input('profile_image_path');
            $data['profile_image_type'] = 'url';
        }

        if ($request->hasFile('resume')) {
            if ($user->resume_path) {
                $this->mediaService->delete($user->resume_path);
            }
            $result = $this->mediaService->upload($request->file('resume'), 'resumes');
            $data['resume_path'] = $result['path'];
        }
        
        $user->update($data);
        
        return back()->with('success', 'Profile updated.');
    }
}
