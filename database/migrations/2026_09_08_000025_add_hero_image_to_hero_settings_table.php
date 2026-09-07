<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            if (!Schema::hasColumn('hero_settings', 'hero_image_type')) {
                $table->string('hero_image_type')->default('upload')->nullable();
            }
            if (!Schema::hasColumn('hero_settings', 'hero_image_path')) {
                $table->text('hero_image_path')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            if (Schema::hasColumn('hero_settings', 'hero_image_type')) {
                $table->dropColumn('hero_image_type');
            }
            if (Schema::hasColumn('hero_settings', 'hero_image_path')) {
                $table->dropColumn('hero_image_path');
            }
        });
    }
};
