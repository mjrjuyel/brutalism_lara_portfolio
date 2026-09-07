<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('thumbnail_type')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('category')->nullable();
            $table->string('year')->nullable();
            $table->string('client')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('status')->default('draft');
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('user_id');
            $table->index('slug');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
