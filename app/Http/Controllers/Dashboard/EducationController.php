<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Education;
use App\Http\Requests\Dashboard\EducationRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\MediaService;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function __construct(private MediaService $mediaService, private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $items = $request->user()->educations()->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Educations/Index', ['items' => $items]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Educations/Create');
    }

    public function store(EducationRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $result = $this->mediaService->upload($request->file('logo'), 'educations');
            $data['logo_path'] = $result['path'];
            $data['logo_type'] = 'upload';
        } elseif ($request->filled('logo_path') && $request->input('logo_type') === 'url') {
            $data['logo_path'] = $request->input('logo_path');
            $data['logo_type'] = 'url';
        }

        $request->user()->educations()->create($data);
        return redirect()->route('dashboard.educations.index')->with('success', 'Created successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('Dashboard/Educations/Edit', ['item' => $education]);
    }

    public function update(EducationRequest $request, Education $education)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            if ($education->logo_type === 'upload' && $education->logo_path) {
                $this->mediaService->delete($education->logo_path);
            }
            $result = $this->mediaService->upload($request->file('logo'), 'educations');
            $data['logo_path'] = $result['path'];
            $data['logo_type'] = 'upload';
        } elseif ($request->filled('logo_path') && $request->input('logo_type') === 'url') {
            $data['logo_path'] = $request->input('logo_path');
            $data['logo_type'] = 'url';
        }

        $education->update($data);
        return redirect()->route('dashboard.educations.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Education $education)
    {
        if ($education->logo_type === 'upload' && $education->logo_path) {
            $this->mediaService->delete($education->logo_path);
        }

        $education->delete();
        return back()->with('success', 'Deleted successfully.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Education::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
