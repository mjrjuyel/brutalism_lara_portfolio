<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique();
            $table->string('title')->nullable();
            $table->text('bio')->nullable();
            $table->string('location')->nullable();
            $table->string('phone')->nullable();
            $table->text('website')->nullable();
            $table->string('availability')->default('available');
            $table->integer('years_of_experience')->default(0);
            $table->string('profile_image_type')->nullable();
            $table->text('profile_image_path')->nullable();
            $table->text('resume_path')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username', 'title', 'bio', 'location', 'phone', 'website',
                'availability', 'years_of_experience', 'profile_image_type',
                'profile_image_path', 'resume_path'
            ]);
        });
    }
};
