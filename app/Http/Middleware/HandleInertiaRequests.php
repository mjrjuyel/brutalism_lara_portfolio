<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        
        $activeTheme = 'cyber-brutalism';
        $allowVisitorSwitching = true;
        $unreadMessagesCount = 0;
        
        $siteSettings = null;
        if ($user) {
            $siteSettings = $user->siteSetting()->first();
            $themeSetting = $user->themeSetting()->first();
            if ($themeSetting) {
                $activeTheme = $themeSetting->active_theme ?? 'cyber-brutalism';
                $allowVisitorSwitching = $themeSetting->allow_visitor_switching ?? true;
            }
            $unreadMessagesCount = $user->contactMessages()->where('is_read', false)->count();
        } else {
            $owner = \App\Models\User::first();
            if ($owner) {
                $siteSettings = $owner->siteSetting()->first();
                $themeSetting = $owner->themeSetting()->first();
                if ($themeSetting) {
                    $activeTheme = $themeSetting->active_theme ?? 'cyber-brutalism';
                    $allowVisitorSwitching = $themeSetting->allow_visitor_switching ?? true;
                }
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'activeTheme' => $activeTheme,
            'allowVisitorSwitching' => $allowVisitorSwitching,
            'unreadMessagesCount' => $unreadMessagesCount,
            'siteSettings' => $siteSettings,
        ];
    }
}
