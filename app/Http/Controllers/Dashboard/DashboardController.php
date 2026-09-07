<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'total_projects' => $user->projects()->count(),
                'total_skills' => $user->skills()->count(),
                'unread_messages' => $user->contactMessages()->where('is_read', false)->count(),
                'total_views' => $user->projects()->count() // mock
            ]
        ]);
    }
}
