<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\HeroSetting;
use App\Models\AboutSetting;
use App\Models\ThemeSetting;
use App\Models\SeoSetting;
use App\Models\SiteSetting;
use App\Models\SkillCategory;
use App\Models\Skill;
use App\Models\Technology;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Statistic;
use App\Models\SocialLink;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create or update portfolio owner user
        $user = User::where('email', 'mjrcoder7@gmail.com')
            ->orWhere('email', 'admin@portfolio.dev')
            ->first();

        $userData = [
            'name' => 'MJR JUYEL',
            'email' => 'mjrcoder7@gmail.com',
            'password' => Hash::make('Qwe123!!'),
            'username' => 'mjr_juyel',
            'title' => 'CREATIVE TECHNOLOGIST & DISTRIBUTED SYSTEMS ARCHITECT',
            'bio' => 'Senior software engineer specializing in scalable backend infrastructure, reactive UI architecture, and modern digital web applications.',
            'location' => 'Dhaka, Bangladesh',
            'phone' => '+880 1700-000000',
            'website' => 'https://github.com/mjrcoder7',
            'availability' => 'available',
            'years_of_experience' => 9,
            'profile_image_type' => 'url',
            'profile_image_path' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        ];


        

        if ($user) {
            $user->update($userData);
        } else {
            $user = User::create($userData);
        }

        // 2. Hero Settings
        HeroSetting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'headline' => 'I BUILD DIGITAL EXPERIENCES FOR THE FUTURE.',
                'subheadline' => 'FULL STACK ARCHITECTURE // EXPERIMENTAL COMPUTATION',
                'introduction' => 'Bridging the gap between brutalist visual expression and hyper-scalable backend systems. Crafting resilient web applications, distributed APIs, and next-generation interactive interfaces.',
                'cta_primary_text' => 'ACCESS ARCHIVE',
                'cta_primary_url' => '#work',
                'cta_secondary_text' => 'TRANSMIT MESSAGE',
                'cta_secondary_url' => '#contact',
                'show_availability' => true,
                'show_scroll_indicator' => true,
            ]
        );

        // 3. About Settings
        AboutSetting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'philosophy' => 'Code is architectural scripture. Every byte of unnecessary overhead eliminated is a victory for computational elegance.',
                'content' => '<p>I operate at the convergence of <strong>infrastructure engineering</strong> and <strong>high-fidelity interactive design</strong>. Over the past decade, I have architected systems processing billions of events per day while maintaining a relentless commitment to digital brutalism and typographical precision.</p><p>My technical stack is anchored in Laravel\'s robust backend architecture, React\'s reactive state model, Inertia\'s seamless glue, and modern distributed database patterns.</p>',
                'profile_image_type' => 'url',
                'profile_image_path' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            ]
        );

        // 4. Theme Settings
        ThemeSetting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'active_theme' => 'cyber-brutalism',
                'allow_visitor_switching' => true,
            ]
        );

        // 5. SEO Settings
        SeoSetting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'site_title' => 'MJR JUYEL // Creative Technologist & Systems Architect',
                'meta_description' => 'Futuristic developer portfolio and case studies showcasing high-throughput systems, creative web engineering, and neo-brutalist digital interfaces.',
                'keywords' => 'Laravel, React, Inertia, Creative Technologist, Neo-Brutalism, Full Stack Developer, Systems Architect',
                'canonical_url' => 'https://portfolio.dev',
                'robots' => 'index, follow',
                'og_image_type' => 'url',
                'og_image_path' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
            ]
        );

        // 6. Site Settings
        SiteSetting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'logo_type' => 'text',
                'logo_text' => 'MJR.JUYEL // 2030',
                'favicon_type' => 'default',
                'footer_text' => 'TRANSMISSION COMPLETE. SYSTEM OPERATING UNDER LARAVEL 13, INERTIA V3, REACT 19 & TAILWIND V4. ALL RIGHTS RESERVED.',
                'maintenance_mode' => false,
            ]
        );

        // 7. Statistics
        $user->statistics()->delete();
        $stats = [
            ['label' => 'Years in Production', 'value' => '09+', 'suffix' => '+', 'numeric_value' => 9, 'sort_order' => 1],
            ['label' => 'Deployed Architectures', 'value' => '48+', 'suffix' => '+', 'numeric_value' => 48, 'sort_order' => 2],
            ['label' => 'Global Enterprise Clients', 'value' => '32+', 'suffix' => '+', 'numeric_value' => 32, 'sort_order' => 3],
            ['label' => 'Core Technologies', 'value' => '18+', 'suffix' => '+', 'numeric_value' => 18, 'sort_order' => 4],
        ];
        foreach ($stats as $s) {
            $user->statistics()->create($s);
        }

        // 8. Social Links
        $user->socialLinks()->delete();
        $links = [
            ['platform' => 'github', 'url' => 'https://github.com', 'is_active' => true, 'sort_order' => 1],
            ['platform' => 'linkedin', 'url' => 'https://linkedin.com', 'is_active' => true, 'sort_order' => 2],
            ['platform' => 'twitter', 'url' => 'https://x.com', 'is_active' => true, 'sort_order' => 3],
            ['platform' => 'youtube', 'url' => 'https://youtube.com', 'is_active' => true, 'sort_order' => 4],
            ['platform' => 'dribbble', 'url' => 'https://dribbble.com', 'is_active' => true, 'sort_order' => 5],
        ];
        foreach ($links as $l) {
            $user->socialLinks()->create($l);
        }

        // 9. Technologies
        $technologiesData = [
            ['name' => 'Laravel 13', 'slug' => 'laravel'],
            ['name' => 'React 19', 'slug' => 'react'],
            ['name' => 'Inertia.js v3', 'slug' => 'inertia'],
            ['name' => 'Tailwind CSS v4', 'slug' => 'tailwind'],
            ['name' => 'PostgreSQL', 'slug' => 'postgresql'],
            ['name' => 'Redis Cache', 'slug' => 'redis'],
            ['name' => 'Docker & K8s', 'slug' => 'docker'],
            ['name' => 'TypeScript', 'slug' => 'typescript'],
            ['name' => 'WebGL / Shaders', 'slug' => 'webgl'],
        ];
        $techModels = [];
        foreach ($technologiesData as $t) {
            $techModels[$t['slug']] = Technology::firstOrCreate(['slug' => $t['slug']], $t);
        }

        // 10. Skill Categories & Skills
        $user->skillCategories()->delete();
        $categories = [
            [
                'name' => 'Frontend Architecture',
                'slug' => 'frontend-architecture',
                'sort_order' => 1,
                'skills' => [
                    ['name' => 'React 19 / JSX Architecture', 'percentage' => 96, 'experience_years' => 7, 'is_featured' => true, 'sort_order' => 1],
                    ['name' => 'Inertia.js v3 Integration', 'percentage' => 95, 'experience_years' => 5, 'is_featured' => true, 'sort_order' => 2],
                    ['name' => 'Tailwind CSS v4 Design Tokens', 'percentage' => 98, 'experience_years' => 6, 'is_featured' => false, 'sort_order' => 3],
                    ['name' => 'Motion / Interactive Micro-UX', 'percentage' => 90, 'experience_years' => 5, 'is_featured' => true, 'sort_order' => 4],
                    ['name' => 'TypeScript & Clean Typing', 'percentage' => 88, 'experience_years' => 6, 'is_featured' => false, 'sort_order' => 5],
                ]
            ],
            [
                'name' => 'Backend & Distributed Systems',
                'slug' => 'backend-systems',
                'sort_order' => 2,
                'skills' => [
                    ['name' => 'Laravel Framework & Ecosystem', 'percentage' => 98, 'experience_years' => 9, 'is_featured' => true, 'sort_order' => 1],
                    ['name' => 'RESTful & GraphQL API Architecture', 'percentage' => 94, 'experience_years' => 8, 'is_featured' => true, 'sort_order' => 2],
                    ['name' => 'PostgreSQL Schema & Index Optimization', 'percentage' => 91, 'experience_years' => 7, 'is_featured' => false, 'sort_order' => 3],
                    ['name' => 'Redis Pipelines & Message Queues', 'percentage' => 89, 'experience_years' => 6, 'is_featured' => false, 'sort_order' => 4],
                    ['name' => 'High-Concurrency Event Sourcing', 'percentage' => 86, 'experience_years' => 4, 'is_featured' => false, 'sort_order' => 5],
                ]
            ],
            [
                'name' => 'Cloud & Infrastructure',
                'slug' => 'cloud-infrastructure',
                'sort_order' => 3,
                'skills' => [
                    ['name' => 'Docker Orchestration & CI/CD', 'percentage' => 90, 'experience_years' => 6, 'is_featured' => true, 'sort_order' => 1],
                    ['name' => 'Kubernetes Cluster Management', 'percentage' => 82, 'experience_years' => 4, 'is_featured' => false, 'sort_order' => 2],
                    ['name' => 'Cloudflare Workers & Edge Compute', 'percentage' => 88, 'experience_years' => 4, 'is_featured' => false, 'sort_order' => 3],
                ]
            ],
        ];

        foreach ($categories as $catData) {
            $skills = $catData['skills'];
            unset($catData['skills']);
            $cat = $user->skillCategories()->create($catData);
            foreach ($skills as $s) {
                $s['user_id'] = $user->id;
                $cat->skills()->create($s);
            }
        }

        // 11. Projects
        $user->projects()->delete();
        $projectsData = [
            [
                'title' => 'AETHER SYNAPSE // Autonomous Trading Terminal',
                'slug' => 'aether-synapse-terminal',
                'short_description' => 'Sub-millisecond cryptocurrency liquidity aggregator and algorithmic execution workstation built with Laravel event broadcasting and React WebSockets.',
                'description' => '<p>Aether Synapse was engineered to eliminate execution slippage across 14 decentralized liquidity pools. The system processes over 25,000 price ticks per second through Redis streams and dispatches atomic order batches.</p><h3>Key Architectural Innovations</h3><ul><li>Sub-50ms roundtrip order dispatch pipeline.</li><li>WebGL candle visualization rendering 100k data points at 60 FPS.</li><li>Zero-downtime hot-swappable liquidity routing algorithms.</li></ul>',
                'thumbnail_type' => 'url',
                'thumbnail_path' => 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
                'live_url' => 'https://example.com/aether',
                'github_url' => 'https://github.com/example/aether-synapse',
                'category' => 'Financial Infrastructure',
                'year' => '2026',
                'client' => 'Apex Quant Capital',
                'is_featured' => true,
                'status' => 'published',
                'sort_order' => 1,
                'tech' => ['laravel', 'react', 'inertia', 'redis', 'postgresql'],
            ],
            [
                'title' => 'NEURAL GRAPH // Distributed Knowledge Engine',
                'slug' => 'neural-graph-knowledge',
                'short_description' => 'Real-time collaborative semantic graph platform visualizing multi-dimensional research nodes with vector similarity clustering.',
                'description' => '<p>Neural Graph provides researchers with an infinite canvas for exploring complex ontology relationships. Built with Laravel backend indexing and an interactive React canvas matrix.</p><h3>System Highlights</h3><ul><li>Vector embeddings mapped across 3D interactive coordinates.</li><li>Real-time collaborative cursor presence via WebSockets.</li><li>Multi-tenant row-level access control.</li></ul>',
                'thumbnail_type' => 'url',
                'thumbnail_path' => 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
                'live_url' => 'https://example.com/neural-graph',
                'github_url' => 'https://github.com/example/neural-graph',
                'category' => 'AI & Knowledge Graph',
                'year' => '2025',
                'client' => 'Cortex Institute',
                'is_featured' => true,
                'status' => 'published',
                'sort_order' => 2,
                'tech' => ['laravel', 'react', 'tailwind', 'postgresql', 'typescript'],
            ],
            [
                'title' => 'ORBITAL OS // Web Kernel Workstation',
                'slug' => 'orbital-os-workstation',
                'short_description' => 'A browser-based Unix environment featuring virtual file systems, sandboxed execution, and brutalist command line ergonomics.',
                'description' => '<p>An experimental operating system living entirely in the browser. Powered by WebAssembly and an Inertia/React HUD.</p>',
                'thumbnail_type' => 'url',
                'thumbnail_path' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
                'live_url' => 'https://example.com/orbital',
                'github_url' => 'https://github.com/example/orbital-os',
                'category' => 'Experimental Computing',
                'year' => '2025',
                'client' => 'Internal Research R&D',
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 3,
                'tech' => ['react', 'typescript', 'tailwind'],
            ],
            [
                'title' => 'CYBER CORE // High-Throughput Payment Switch',
                'slug' => 'cyber-core-payment',
                'short_description' => 'Fault-tolerant multi-rail payment routing engine handling distributed ledger settlements and fiat gateways with 99.999% uptime.',
                'description' => '<p>Mission-critical payment telemetry switch processing recurring subscriptions and instant cross-border transfers.</p>',
                'thumbnail_type' => 'url',
                'thumbnail_path' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
                'live_url' => 'https://example.com/cyber-core',
                'github_url' => 'https://github.com/example/cyber-core',
                'category' => 'FinTech Systems',
                'year' => '2024',
                'client' => 'Vanguard Pay',
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 4,
                'tech' => ['laravel', 'redis', 'docker', 'postgresql'],
            ],
        ];

        foreach ($projectsData as $pData) {
            $techSlugs = $pData['tech'];
            unset($pData['tech']);
            $project = $user->projects()->create($pData);

            $techIds = [];
            foreach ($techSlugs as $slug) {
                if (isset($techModels[$slug])) {
                    $techIds[] = $techModels[$slug]->id;
                }
            }
            $project->technologies()->sync($techIds);
        }

        // 12. Experiences
        $user->experiences()->delete();
        $experiences = [
            [
                'company' => 'QUANTUM LABS',
                'position' => 'Principal Systems Architect',
                'location' => 'Tokyo / Remote',
                'start_date' => '2023-04-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Leading platform architecture across distributed multi-region cloud services. Spearheaded migration to event-driven microservices reducing P99 latency by 58%.',
                'company_url' => 'https://example.com',
                'sort_order' => 1,
            ],
            [
                'company' => 'HYPERSCALE CLOUD',
                'position' => 'Staff Full Stack Engineer',
                'location' => 'San Francisco, CA',
                'start_date' => '2020-08-01',
                'end_date' => '2023-03-31',
                'is_current' => false,
                'description' => 'Architected customer-facing telemetry dashboard deployed to 80,000+ engineers. Engineered core Inertia + React component library still in active production.',
                'company_url' => 'https://example.com',
                'sort_order' => 2,
            ],
            [
                'company' => 'CYBERKINETICS R&D',
                'position' => 'Senior Backend Developer',
                'location' => 'Austin, TX',
                'start_date' => '2017-06-01',
                'end_date' => '2020-07-31',
                'is_current' => false,
                'description' => 'Built high-throughput payment ingestion APIs handling $400M+ in annual transactions. Implemented strict automated integration suites.',
                'company_url' => 'https://example.com',
                'sort_order' => 3,
            ],
        ];
        foreach ($experiences as $exp) {
            $user->experiences()->create($exp);
        }

        // 13. Education
        $user->educations()->delete();
        $educations = [
            [
                'institution' => 'STANFORD UNIVERSITY',
                'degree' => 'Master of Science',
                'field' => 'Distributed Systems & Computer Science',
                'start_date' => '2015-09-01',
                'end_date' => '2017-06-01',
                'description' => 'Research focus on distributed consensus algorithms, peer-to-peer gossip protocols, and fault-tolerant storage topologies.',
                'sort_order' => 1,
            ],
            [
                'institution' => 'UC BERKELEY',
                'degree' => 'Bachelor of Science',
                'field' => 'Computer Science & Mathematics',
                'start_date' => '2011-09-01',
                'end_date' => '2015-05-01',
                'description' => 'Graduated with Magna Cum Laude. Undergraduate research assistant in programming languages and compiler optimizations.',
                'sort_order' => 2,
            ],
        ];
        foreach ($educations as $edu) {
            $user->educations()->create($edu);
        }

        // 14. Services
        $user->services()->delete();
        $services = [
            [
                'title' => 'Distributed Systems Architecture',
                'description' => 'Designing fault-tolerant backend infrastructure, multi-region event pipelines, and high-throughput data layers designed for 99.999% availability.',
                'icon' => 'cpu',
                'price_label' => 'From $12,000',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Full Stack Web Platform Engineering',
                'description' => 'End-to-end bespoke development leveraging modern Laravel backend architecture paired with Inertia.js, React, and tailored brutalist design systems.',
                'icon' => 'layout',
                'price_label' => 'From $8,500',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'High-Performance API & Database Tuning',
                'description' => 'Deep PostgreSQL index optimization, query profiling, Redis caching strategies, and memory footprint reduction for latency-critical systems.',
                'icon' => 'database',
                'price_label' => 'From $5,000',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Creative Tech & Interactive Prototyping',
                'description' => 'Experimental interface engineering, custom WebGL visualizers, interactive 3D web applications, and brutalist design implementations.',
                'icon' => 'sparkles',
                'price_label' => 'From $6,000',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];
        foreach ($services as $srv) {
            $user->services()->create($srv);
        }

        // 15. Testimonials
        $user->testimonials()->delete();
        $testimonials = [
            [
                'name' => 'Dr. Aris Thorne',
                'position' => 'Chief Technology Officer',
                'company' => 'Quantum Labs',
                'content' => 'Kaien operates with unprecedented engineering velocity and surgical precision. One of the rarest minds in modern computation.',
                'avatar_type' => 'url',
                'avatar_path' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Sarah Chen',
                'position' => 'VP of Product Engineering',
                'company' => 'HyperScale IO',
                'content' => 'The architecture Kaien delivered handled our Black Friday load spike without a millisecond of jitter. Exceptional craftsmanship.',
                'avatar_type' => 'url',
                'avatar_path' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'David Kova',
                'position' => 'Founder & Managing Partner',
                'company' => 'Apex Quant Capital',
                'content' => 'A true creative technologist. Bold, unapologetic brutalist aesthetic backed by rock-solid enterprise backend engineering.',
                'avatar_type' => 'url',
                'avatar_path' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];
        foreach ($testimonials as $t) {
            $user->testimonials()->create($t);
        }

        // 16. Contact Messages (Initial sample)
        $user->contactMessages()->delete();
        $user->contactMessages()->create([
            'name' => 'Morgan Vance',
            'email' => 'morgan@frontier-ventures.ai',
            'subject' => 'Invitation: Architecture Advisory & Keynote',
            'message' => 'Greetings Kaien. We have been tracking your work on decentralized liquidity aggregates. We would like to discuss an advisory role on our upcoming computational infrastructure fund.',
            'is_read' => false,
        ]);
    }
}
