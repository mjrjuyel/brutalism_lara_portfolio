<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Http\Requests\Dashboard\TestimonialRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\MediaService;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function __construct(private MediaService $mediaService, private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $items = $request->user()->testimonials()->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Testimonials/Index', ['items' => $items]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Testimonials/Create');
    }

    public function store(TestimonialRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $result = $this->mediaService->upload($request->file('avatar'), 'testimonials');
            $data['avatar_path'] = $result['path'];
            $data['avatar_type'] = 'upload';
        } elseif ($request->filled('avatar_path') && $request->input('avatar_type') === 'url') {
            $data['avatar_path'] = $request->input('avatar_path');
            $data['avatar_type'] = 'url';
        }

        $request->user()->testimonials()->create($data);
        return redirect()->route('dashboard.testimonials.index')->with('success', 'Created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Dashboard/Testimonials/Edit', ['item' => $testimonial]);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar_type === 'upload' && $testimonial->avatar_path) {
                $this->mediaService->delete($testimonial->avatar_path);
            }
            $result = $this->mediaService->upload($request->file('avatar'), 'testimonials');
            $data['avatar_path'] = $result['path'];
            $data['avatar_type'] = 'upload';
        } elseif ($request->filled('avatar_path') && $request->input('avatar_type') === 'url') {
            $data['avatar_path'] = $request->input('avatar_path');
            $data['avatar_type'] = 'url';
        }

        $testimonial->update($data);
        return redirect()->route('dashboard.testimonials.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar_type === 'upload' && $testimonial->avatar_path) {
            $this->mediaService->delete($testimonial->avatar_path);
        }

        $testimonial->delete();
        return back()->with('success', 'Deleted successfully.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Testimonial::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
