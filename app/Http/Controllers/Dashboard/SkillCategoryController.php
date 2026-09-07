<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SkillCategory;
use App\Http\Requests\Dashboard\SkillCategoryRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillCategoryController extends Controller
{
    public function __construct(private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $categories = $request->user()->skillCategories()->withCount('skills')->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Skills/Categories', ['categories' => $categories]);
    }

    public function store(SkillCategoryRequest $request)
    {
        $request->user()->skillCategories()->create($request->validated());
        return back()->with('success', 'Category created.');
    }

    public function update(SkillCategoryRequest $request, SkillCategory $skillCategory)
    {
        $skillCategory->update($request->validated());
        return back()->with('success', 'Category updated.');
    }

    public function destroy(SkillCategory $skillCategory)
    {
        $skillCategory->delete();
        return back()->with('success', 'Category deleted.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(SkillCategory::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
