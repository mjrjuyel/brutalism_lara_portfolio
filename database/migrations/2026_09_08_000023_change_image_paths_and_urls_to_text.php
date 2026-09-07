<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('profile_image_path')->nullable()->change();
            $table->text('resume_path')->nullable()->change();
            $table->text('website')->nullable()->change();
        });

        Schema::table('about_settings', function (Blueprint $table) {
            $table->text('profile_image_path')->nullable()->change();
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->text('thumbnail_path')->nullable()->change();
            $table->text('live_url')->nullable()->change();
            $table->text('github_url')->nullable()->change();
        });

        Schema::table('project_images', function (Blueprint $table) {
            $table->text('image_path')->change();
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->text('avatar_path')->nullable()->change();
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->text('logo_path')->nullable()->change();
            $table->text('company_url')->nullable()->change();
        });

        Schema::table('educations', function (Blueprint $table) {
            $table->text('logo_path')->nullable()->change();
        });

        Schema::table('site_settings', function (Blueprint $table) {
            $table->text('logo_path')->nullable()->change();
        });

        Schema::table('seo_settings', function (Blueprint $table) {
            $table->text('og_image_path')->nullable()->change();
            $table->text('favicon_path')->nullable()->change();
            $table->text('canonical_url')->nullable()->change();
        });

        Schema::table('social_links', function (Blueprint $table) {
            $table->text('url')->nullable()->change();
        });

        Schema::table('hero_settings', function (Blueprint $table) {
            $table->text('cta_primary_url')->nullable()->change();
            $table->text('cta_secondary_url')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Reverting text to varchar(255) if necessary
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_image_path', 255)->nullable()->change();
            $table->string('resume_path', 255)->nullable()->change();
            $table->string('website', 255)->nullable()->change();
        });
    }
};
