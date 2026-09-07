<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Http\Requests\Dashboard\SkillRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function __construct(private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $skills = $request->user()->skills()->with('category')->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Skills/Index', ['skills' => $skills]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Skills/Create', [
            'categories' => $request->user()->skillCategories()->orderBy('sort_order')->get()
        ]);
    }

    public function store(SkillRequest $request)
    {
        $request->user()->skills()->create($request->validated());
        return redirect()->route('dashboard.skills.index')->with('success', 'Skill created.');
    }

    public function edit(Request $request, Skill $skill)
    {
        return Inertia::render('Dashboard/Skills/Edit', [
            'skill' => $skill,
            'categories' => $request->user()->skillCategories()->orderBy('sort_order')->get()
        ]);
    }

    public function update(SkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return redirect()->route('dashboard.skills.index')->with('success', 'Skill updated.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return back()->with('success', 'Skill deleted.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Skill::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
