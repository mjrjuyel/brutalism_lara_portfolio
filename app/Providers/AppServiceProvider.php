<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('users')) {
                $user = \App\Models\User::where('email', 'mjrcoder7@gmail.com')->first();
                if (!$user) {
                    $old = \App\Models\User::where('email', 'admin@portfolio.dev')->first() ?? \App\Models\User::first();
                    if ($old) {
                        $old->update([
                            'name' => 'MJR JUYEL',
                            'email' => 'mjrcoder7@gmail.com',
                            'password' => \Illuminate\Support\Facades\Hash::make('Qwe123!!'),
                            'location' => 'Dhaka, Bangladesh',
                        ]);
                    }
                }
            }

            if (\Illuminate\Support\Facades\Schema::hasTable('hero_settings')) {
                if (!\Illuminate\Support\Facades\Schema::hasColumn('hero_settings', 'hero_image_path')) {
                    \Illuminate\Support\Facades\Schema::table('hero_settings', function (\Illuminate\Database\Schema\Blueprint $table) {
                        $table->string('hero_image_type')->default('upload')->nullable();
                        $table->text('hero_image_path')->nullable();
                    });
                }
            }

            if (\Illuminate\Support\Facades\Schema::hasTable('site_settings')) {
                if (!\Illuminate\Support\Facades\Schema::hasColumn('site_settings', 'favicon_type')) {
                    \Illuminate\Support\Facades\Schema::table('site_settings', function (\Illuminate\Database\Schema\Blueprint $table) {
                        $table->string('favicon_type')->default('default')->nullable();
                    });
                }
                if (!\Illuminate\Support\Facades\Schema::hasColumn('site_settings', 'favicon_path')) {
                    \Illuminate\Support\Facades\Schema::table('site_settings', function (\Illuminate\Database\Schema\Blueprint $table) {
                        $table->text('favicon_path')->nullable();
                    });
                }
            }
        } catch (\Throwable $e) {
            // Silently ignore if database is not reachable during setup/build
        }
    }
}
