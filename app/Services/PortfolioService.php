<?php

namespace App\Services;

use App\Models\User;
use App\Models\Project;

class PortfolioService
{
    public function __construct(private MediaService $mediaService) {}

    public function getPortfolioData(User $user): array
    {
        $user->load([
            'heroSetting',
            'aboutSetting',
            'statistics' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'skillCategories' => fn($q) => $q->orderBy('sort_order')->with(['skills' => fn($q) => $q->where('is_active', true)->orderBy('sort_order')]),
            'experiences' => fn($q) => $q->orderBy('sort_order'),
            'educations' => fn($q) => $q->orderBy('sort_order'),
            'services' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'testimonials' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'socialLinks' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'seoSetting',
            'siteSetting',
            'themeSetting'
        ]);

        // Fetch projects
        $projects = $user->projects()
            ->where('status', 'published')
            ->with('technologies')
            ->orderBy('sort_order')
            ->get();
            
        $featuredProjects = $projects->where('is_featured', true)->values();
        $otherProjects = $projects->where('is_featured', false)->values();
        
        $allProjects = $featuredProjects->merge($otherProjects);

        return [
            'profile' => $user,
            'hero' => $user->heroSetting,
            'about' => $user->aboutSetting,
            'statistics' => $user->statistics,
            'skillCategories' => $user->skillCategories,
            'projects' => $allProjects,
            'experiences' => $user->experiences,
            'educations' => $user->educations,
            'services' => $user->services,
            'testimonials' => $user->testimonials,
            'socialLinks' => $user->socialLinks,
            'seo' => $user->seoSetting,
            'siteSettings' => $user->siteSetting,
            'theme' => $user->themeSetting,
        ];
    }
}
