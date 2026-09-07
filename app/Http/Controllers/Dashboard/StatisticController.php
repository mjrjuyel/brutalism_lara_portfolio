<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use App\Http\Requests\Dashboard\StatisticRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatisticController extends Controller
{
    public function __construct(private SortOrderService $sortOrderService) {}

    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Statistics/Edit', [
            'statistics' => $request->user()->statistics()->orderBy('sort_order')->get()
        ]);
    }

    public function store(StatisticRequest $request)
    {
        $request->user()->statistics()->create($request->validated());
        return back()->with('success', 'Statistic created.');
    }

    public function update(StatisticRequest $request, Statistic $statistic)
    {
        $statistic->update($request->validated());
        return back()->with('success', 'Statistic updated.');
    }

    public function destroy(Statistic $statistic)
    {
        $statistic->delete();
        return back()->with('success', 'Statistic deleted.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Statistic::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
