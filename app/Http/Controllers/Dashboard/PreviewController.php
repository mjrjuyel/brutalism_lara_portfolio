<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\PortfolioService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreviewController extends Controller
{
    public function __construct(private PortfolioService $portfolioService) {}

    public function index(Request $request)
    {
        $data = $this->portfolioService->getPortfolioData($request->user());
        $data['isPreview'] = true;
        
        return Inertia::render('Portfolio/Index', $data);
    }
}
