<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ThemeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Dashboard/Theme/Edit', [
            'theme' => $request->user()->themeSetting()->firstOrCreate([])
        ]);
    }

    public function update(ThemeRequest $request)
    {
        $request->user()->themeSetting()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->validated()
        );
        return back()->with('success', 'Theme updated.');
    }
}
