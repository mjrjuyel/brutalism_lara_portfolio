<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Http\Requests\Dashboard\ExperienceRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\MediaService;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function __construct(private MediaService $mediaService, private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $items = $request->user()->experiences()->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Experiences/Index', ['items' => $items]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Experiences/Create');
    }

    public function store(ExperienceRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $result = $this->mediaService->upload($request->file('logo'), 'experiences');
            $data['logo_path'] = $result['path'];
            $data['logo_type'] = 'upload';
        } elseif ($request->filled('logo_path') && $request->input('logo_type') === 'url') {
            $data['logo_path'] = $request->input('logo_path');
            $data['logo_type'] = 'url';
        }

        $request->user()->experiences()->create($data);
        return redirect()->route('dashboard.experiences.index')->with('success', 'Created successfully.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('Dashboard/Experiences/Edit', ['item' => $experience]);
    }

    public function update(ExperienceRequest $request, Experience $experience)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            if ($experience->logo_type === 'upload' && $experience->logo_path) {
                $this->mediaService->delete($experience->logo_path);
            }
            $result = $this->mediaService->upload($request->file('logo'), 'experiences');
            $data['logo_path'] = $result['path'];
            $data['logo_type'] = 'upload';
        } elseif ($request->filled('logo_path') && $request->input('logo_type') === 'url') {
            $data['logo_path'] = $request->input('logo_path');
            $data['logo_type'] = 'url';
        }

        $experience->update($data);
        return redirect()->route('dashboard.experiences.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        if ($experience->logo_type === 'upload' && $experience->logo_path) {
            $this->mediaService->delete($experience->logo_path);
        }

        $experience->delete();
        return back()->with('success', 'Deleted successfully.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Experience::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
