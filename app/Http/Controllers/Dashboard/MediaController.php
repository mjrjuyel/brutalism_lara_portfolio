<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function __construct(private MediaService $mediaService) {}

    public function index(Request $request)
    {
        return Inertia::render('Dashboard/Media/Index', [
            'media' => $request->user()->media()->latest()->paginate(20)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['file' => 'required|file|max:10240']);
        $result = $this->mediaService->upload($request->file('file'), 'media');
        
        $request->user()->media()->create([
            'path' => $result['path'],
            'original_filename' => $result['original_filename'],
            'mime_type' => $result['mime_type'],
            'size' => $result['size']
        ]);
        
        return back()->with('success', 'Media uploaded.');
    }

    public function destroy(Media $media)
    {
        $this->mediaService->delete($media->path);
        $media->delete();
        return back()->with('success', 'Media deleted.');
    }
}
