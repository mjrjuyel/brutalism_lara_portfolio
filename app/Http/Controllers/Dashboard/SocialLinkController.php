<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use App\Http\Requests\Dashboard\SocialLinkRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialLinkController extends Controller
{
    public function __construct(private SortOrderService $sortOrderService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/SocialLinks/Edit', [
            'socialLinks' => $request->user()->socialLinks()->orderBy('sort_order')->get()
        ]);
    }

    public function store(SocialLinkRequest $request)
    {
        $request->user()->socialLinks()->create($request->validated());
        return back()->with('success', 'Link created.');
    }

    public function update(SocialLinkRequest $request, SocialLink $socialLink)
    {
        $socialLink->update($request->validated());
        return back()->with('success', 'Link updated.');
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();
        return back()->with('success', 'Link deleted.');
    }

    public function toggleActive(SocialLink $socialLink)
    {
        $socialLink->update(['is_active' => !$socialLink->is_active]);
        return back()->with('success', 'Status updated.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(SocialLink::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
