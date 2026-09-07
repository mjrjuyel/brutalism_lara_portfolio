<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('logo_type')->default('text');
            $table->string('logo_path')->nullable();
            $table->string('logo_text')->nullable();
            $table->string('footer_text')->nullable();
            $table->boolean('maintenance_mode')->default(false);
            $table->string('analytics_id')->nullable();
            $table->text('custom_css')->nullable();
            $table->text('custom_js')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
