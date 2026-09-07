<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            if (!Schema::hasColumn('site_settings', 'favicon_type')) {
                $table->string('favicon_type')->default('default')->nullable()->after('logo_text');
            }
            if (!Schema::hasColumn('site_settings', 'favicon_path')) {
                $table->text('favicon_path')->nullable()->after('favicon_type');
            }
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            if (Schema::hasColumn('site_settings', 'favicon_path')) {
                $table->dropColumn('favicon_path');
            }
            if (Schema::hasColumn('site_settings', 'favicon_type')) {
                $table->dropColumn('favicon_type');
            }
        });
    }
};
