<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Requests\Dashboard\ServiceRequest;
use App\Http\Requests\Dashboard\ReorderRequest;
use App\Services\SortOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function __construct(private SortOrderService $sortOrderService) {}

    public function index(Request $request)
    {
        $items = $request->user()->services()->orderBy('sort_order')->get();
        return Inertia::render('Dashboard/Services/Index', ['items' => $items]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Services/Create');
    }

    public function store(ServiceRequest $request)
    {
        $data = $request->validated();
        $request->user()->services()->create($data);
        return redirect()->route('dashboard.services.index')->with('success', 'Created successfully.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Dashboard/Services/Edit', ['item' => $service]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $data = $request->validated();
        $service->update($data);
        return redirect()->route('dashboard.services.index')->with('success', 'Updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Deleted successfully.');
    }

    public function reorder(ReorderRequest $request)
    {
        $this->sortOrderService->reorder(Service::class, $request->validated()['ids']);
        return back()->with('success', 'Order updated.');
    }
}
