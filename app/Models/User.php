<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    #[Fillable]
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'title',
        'bio',
        'location',
        'phone',
        'website',
        'availability',
        'years_of_experience',
        'profile_image_type',
        'profile_image_path',
        'resume_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    #[Hidden]
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getProfileImageUrlAttribute(): ?string
    {
        if (!$this->profile_image_path) return null;
        return $this->profile_image_type === 'url'
            ? $this->profile_image_path
            : Storage::url($this->profile_image_path);
    }

    public function socialLinks(): HasMany
    {
        return $this->hasMany(SocialLink::class);
    }

    public function statistics(): HasMany
    {
        return $this->hasMany(Statistic::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }

    public function skillCategories(): HasMany
    {
        return $this->hasMany(SkillCategory::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class);
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }

    public function contactMessages(): HasMany
    {
        return $this->hasMany(ContactMessage::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function heroSetting(): HasOne
    {
        return $this->hasOne(HeroSetting::class);
    }

    public function aboutSetting(): HasOne
    {
        return $this->hasOne(AboutSetting::class);
    }

    public function themeSetting(): HasOne
    {
        return $this->hasOne(ThemeSetting::class);
    }

    public function seoSetting(): HasOne
    {
        return $this->hasOne(SeoSetting::class);
    }

    public function siteSetting(): HasOne
    {
        return $this->hasOne(SiteSetting::class);
    }
}
