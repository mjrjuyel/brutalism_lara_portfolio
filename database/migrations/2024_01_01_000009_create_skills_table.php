<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('skill_category_id')->constrained('skill_categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->integer('percentage')->default(0);
            $table->integer('experience_years')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['user_id', 'skill_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
