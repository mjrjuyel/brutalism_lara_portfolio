<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('institution');
            $table->string('degree');
            $table->string('field');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('description')->nullable();
            $table->string('logo_type')->nullable();
            $table->string('logo_path')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
