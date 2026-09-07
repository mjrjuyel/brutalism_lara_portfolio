<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Http\Requests\ContactRequest;
use App\Services\PortfolioService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function __construct(private PortfolioService $portfolioService) {}

    public function index()
    {
        $user = User::where('email', 'mjrcoder7@gmail.com')->first() ?? User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'MJR JUYEL',
                'email' => 'mjrcoder7@gmail.com',
                'password' => bcrypt('Qwe123!!'),
                'username' => 'mjr_juyel',
                'location' => 'Dhaka, Bangladesh',
                'title' => 'CREATIVE TECHNOLOGIST // 2030',
                'bio' => 'Portfolio system initialized. Log into /dashboard to manage all content dynamically.',
                'availability' => 'available',
            ]);
        }
        
        $data = $this->portfolioService->getPortfolioData($user);
        
        return Inertia::render('Portfolio/Index', $data);
    }

    public function project(Project $project)
    {
        if ($project->status !== 'published') abort(404);
        
        $project->load(['images', 'technologies']);
        
        return Inertia::render('Portfolio/Project', [
            'project' => $project
        ]);
    }

    public function contact(ContactRequest $request)
    {
        $user = User::first();
        $user->contactMessages()->create($request->validated());
        
        return back()->with('success', 'MESSAGE TRANSMITTED');
    }
}
