<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\ProfileController as DashboardProfileController;
use App\Http\Controllers\Dashboard\HeroController;
use App\Http\Controllers\Dashboard\AboutController;
use App\Http\Controllers\Dashboard\SkillCategoryController;
use App\Http\Controllers\Dashboard\SkillController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\ExperienceController;
use App\Http\Controllers\Dashboard\EducationController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\TestimonialController;
use App\Http\Controllers\Dashboard\StatisticController;
use App\Http\Controllers\Dashboard\SocialLinkController;
use App\Http\Controllers\Dashboard\ContactMessageController;
use App\Http\Controllers\Dashboard\ThemeController;
use App\Http\Controllers\Dashboard\SeoController;
use App\Http\Controllers\Dashboard\SiteSettingController;
use App\Http\Controllers\Dashboard\MediaController;
use App\Http\Controllers\Dashboard\PreviewController;
use Illuminate\Support\Facades\Route;

// Public Portfolio
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');
Route::get('/project/{project:slug}', [PortfolioController::class, 'project'])->name('portfolio.project');
Route::post('/contact', [PortfolioController::class, 'contact'])->name('portfolio.contact');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {


    // Profile
    Route::get('/profile', [DashboardProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [DashboardProfileController::class, 'update'])->name('profile.update');

    // Hero
    Route::get('/hero', [HeroController::class, 'edit'])->name('hero.edit');
    Route::post('/hero', [HeroController::class, 'update'])->name('hero.update');

    // About
    Route::get('/about', [AboutController::class, 'edit'])->name('about.edit');
    Route::post('/about', [AboutController::class, 'update'])->name('about.update');

    // Skill Categories
    Route::get('/skill-categories', [SkillCategoryController::class, 'index'])->name('skill-categories.index');
    Route::post('/skill-categories', [SkillCategoryController::class, 'store'])->name('skill-categories.store');
    Route::put('/skill-categories/{skillCategory}', [SkillCategoryController::class, 'update'])->name('skill-categories.update');
    Route::delete('/skill-categories/{skillCategory}', [SkillCategoryController::class, 'destroy'])->name('skill-categories.destroy');
    Route::post('/skill-categories/reorder', [SkillCategoryController::class, 'reorder'])->name('skill-categories.reorder');

    // Skills
    Route::resource('skills', SkillController::class)->except(['show']);
    Route::post('/skills/reorder', [SkillController::class, 'reorder'])->name('skills.reorder');

    // Projects
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::post('/projects/reorder', [ProjectController::class, 'reorder'])->name('projects.reorder');

    // Experience
    Route::resource('experiences', ExperienceController::class)->except(['show']);
    Route::post('/experiences/reorder', [ExperienceController::class, 'reorder'])->name('experiences.reorder');

    // Education
    Route::resource('educations', EducationController::class)->except(['show']);
    Route::post('/educations/reorder', [EducationController::class, 'reorder'])->name('educations.reorder');

    // Services
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::post('/services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');

    // Testimonials
    Route::resource('testimonials', TestimonialController::class)->except(['show']);
    Route::post('/testimonials/reorder', [TestimonialController::class, 'reorder'])->name('testimonials.reorder');

    // Statistics
    Route::get('/statistics', [StatisticController::class, 'edit'])->name('statistics.edit');
    Route::post('/statistics', [StatisticController::class, 'store'])->name('statistics.store');
    Route::put('/statistics/{statistic}', [StatisticController::class, 'update'])->name('statistics.update');
    Route::delete('/statistics/{statistic}', [StatisticController::class, 'destroy'])->name('statistics.destroy');
    Route::post('/statistics/reorder', [StatisticController::class, 'reorder'])->name('statistics.reorder');

    // Social Links
    Route::get('/social-links', [SocialLinkController::class, 'edit'])->name('social-links.edit');
    Route::post('/social-links', [SocialLinkController::class, 'store'])->name('social-links.store');
    Route::put('/social-links/{socialLink}', [SocialLinkController::class, 'update'])->name('social-links.update');
    Route::delete('/social-links/{socialLink}', [SocialLinkController::class, 'destroy'])->name('social-links.destroy');
    Route::patch('/social-links/{socialLink}/toggle', [SocialLinkController::class, 'toggleActive'])->name('social-links.toggle');
    Route::post('/social-links/reorder', [SocialLinkController::class, 'reorder'])->name('social-links.reorder');

    // Contact Messages
    Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{contactMessage}', [ContactMessageController::class, 'show'])->name('messages.show');
    Route::delete('/messages/{contactMessage}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');

    // Theme
    Route::get('/theme', [ThemeController::class, 'edit'])->name('theme.edit');
    Route::post('/theme', [ThemeController::class, 'update'])->name('theme.update');

    // SEO
    Route::get('/seo', [SeoController::class, 'edit'])->name('seo.edit');
    Route::post('/seo', [SeoController::class, 'update'])->name('seo.update');

    // Site Settings
    Route::get('/settings', [SiteSettingController::class, 'edit'])->name('settings.edit');
    Route::post('/settings', [SiteSettingController::class, 'update'])->name('settings.update');

    // Media
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');

    // Preview
    Route::get('/preview', [PreviewController::class, 'index'])->name('preview');
});

// Keep Breeze auth profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
