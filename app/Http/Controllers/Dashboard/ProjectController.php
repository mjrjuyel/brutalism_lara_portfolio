<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Technology;
use App\Http\Requests\Dashboard\ProjectRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\MediaService;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(private MediaService $mediaService, private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $projects = $request->user()->projects()->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Projects/Index', ['projects' => $projects]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Projects/Create', [
            'technologies' => Technology::all()
        ]);
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('thumbnail')) {
            $result = $this->mediaService->upload($request->file('thumbnail'), 'projects');
            $data['thumbnail_path'] = $result['path'];
            $data['thumbnail_type'] = 'upload';
        }

        $project = $request->user()->projects()->create($data);
        if (isset($data['technologies'])) {
            $project->technologies()->sync($data['technologies']);
        }

        return redirect()->route('dashboard.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project)
    {
        $project->load(['images', 'technologies']);
        return Inertia::render('Dashboard/Projects/Edit', [
            'project' => $project,
            'technologies' => Technology::all()
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail_type === 'upload' && $project->thumbnail_path) {
                $this->mediaService->delete($project->thumbnail_path);
            }
            $result = $this->mediaService->upload($request->file('thumbnail'), 'projects');
            $data['thumbnail_path'] = $result['path'];
            $data['thumbnail_type'] = 'upload';
        } elseif ($request->filled('thumbnail_path') && $request->input('thumbnail_type') === 'url') {
            $data['thumbnail_path'] = $request->input('thumbnail_path');
            $data['thumbnail_type'] = 'url';
        }

        $project->update($data);
        
        if (isset($data['technologies'])) {
            $project->technologies()->sync($data['technologies']);
        } else {
            $project->technologies()->detach();
        }

        return redirect()->route('dashboard.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail_type === 'upload' && $project->thumbnail_path) {
            $this->mediaService->delete($project->thumbnail_path);
        }
        foreach ($project->images as $image) {
            $this->mediaService->delete($image->image_path);
        }
        $project->delete();
        return back()->with('success', 'Project deleted.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Project::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
