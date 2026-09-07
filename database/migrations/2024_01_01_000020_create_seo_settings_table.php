<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('site_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('keywords')->nullable();
            $table->string('og_image_type')->nullable();
            $table->string('og_image_path')->nullable();
            $table->string('favicon_path')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('robots')->default('index, follow');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seo_settings');
    }
};
