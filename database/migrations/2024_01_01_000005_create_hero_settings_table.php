<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('headline');
            $table->string('subheadline')->nullable();
            $table->text('introduction')->nullable();
            $table->string('cta_primary_text')->nullable();
            $table->string('cta_primary_url')->nullable();
            $table->string('cta_secondary_text')->nullable();
            $table->string('cta_secondary_url')->nullable();
            $table->boolean('show_availability')->default(true);
            $table->boolean('show_scroll_indicator')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
