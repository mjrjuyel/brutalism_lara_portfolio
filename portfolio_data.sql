-- ========================================================
-- Portfolio Database MySQL Import Dump
-- Generated from: Database\Seeders\PortfolioSeeder
-- Compatible with: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+
-- ========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- 1. Table structure for `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` text DEFAULT NULL,
  `availability` varchar(255) NOT NULL DEFAULT 'available',
  `years_of_experience` int NOT NULL DEFAULT '0',
  `profile_image_type` varchar(255) DEFAULT NULL,
  `profile_image_path` text DEFAULT NULL,
  `resume_path` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Table structure for `hero_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `headline` varchar(255) NOT NULL,
  `subheadline` varchar(255) DEFAULT NULL,
  `introduction` text DEFAULT NULL,
  `cta_primary_text` varchar(255) DEFAULT NULL,
  `cta_primary_url` text DEFAULT NULL,
  `cta_secondary_text` varchar(255) DEFAULT NULL,
  `cta_secondary_url` text DEFAULT NULL,
  `show_availability` tinyint(1) NOT NULL DEFAULT '1',
  `show_scroll_indicator` tinyint(1) NOT NULL DEFAULT '1',
  `hero_image_type` varchar(255) DEFAULT 'upload',
  `hero_image_path` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hero_settings_user_id_unique` (`user_id`),
  CONSTRAINT `hero_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table structure for `about_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `about_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `content` longtext DEFAULT NULL,
  `philosophy` text DEFAULT NULL,
  `profile_image_type` varchar(255) DEFAULT NULL,
  `profile_image_path` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `about_settings_user_id_unique` (`user_id`),
  CONSTRAINT `about_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table structure for `theme_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `theme_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `active_theme` varchar(255) NOT NULL DEFAULT 'cyber-brutalism',
  `allow_visitor_switching` tinyint(1) NOT NULL DEFAULT '1',
  `custom_overrides` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `theme_settings_user_id_unique` (`user_id`),
  CONSTRAINT `theme_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Table structure for `seo_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `site_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `og_image_type` varchar(255) DEFAULT NULL,
  `og_image_path` text DEFAULT NULL,
  `favicon_path` text DEFAULT NULL,
  `canonical_url` text DEFAULT NULL,
  `robots` varchar(255) NOT NULL DEFAULT 'index, follow',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `seo_settings_user_id_unique` (`user_id`),
  CONSTRAINT `seo_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. Table structure for `site_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `logo_type` varchar(255) NOT NULL DEFAULT 'text',
  `logo_path` text DEFAULT NULL,
  `logo_text` varchar(255) DEFAULT NULL,
  `favicon_type` varchar(255) DEFAULT 'default',
  `favicon_path` text DEFAULT NULL,
  `footer_text` varchar(255) DEFAULT NULL,
  `maintenance_mode` tinyint(1) NOT NULL DEFAULT '0',
  `analytics_id` varchar(255) DEFAULT NULL,
  `custom_css` text DEFAULT NULL,
  `custom_js` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_user_id_unique` (`user_id`),
  CONSTRAINT `site_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. Table structure for `statistics`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `statistics` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `suffix` varchar(255) DEFAULT NULL,
  `numeric_value` int NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `statistics_user_id_index` (`user_id`),
  CONSTRAINT `statistics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. Table structure for `social_links`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_links` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `platform` varchar(255) NOT NULL,
  `url` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `social_links_user_id_index` (`user_id`),
  CONSTRAINT `social_links_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 9. Table structure for `technologies`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `technologies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `technologies_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. Table structure for `skill_categories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `skill_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_categories_user_id_index` (`user_id`),
  UNIQUE KEY `skill_categories_user_id_slug_unique` (`user_id`,`slug`),
  CONSTRAINT `skill_categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 11. Table structure for `skills`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `skills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `skill_category_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `percentage` int NOT NULL DEFAULT '0',
  `experience_years` int DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skills_user_id_skill_category_id_index` (`user_id`,`skill_category_id`),
  KEY `skills_skill_category_id_foreign` (`skill_category_id`),
  CONSTRAINT `skills_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `skills_skill_category_id_foreign` FOREIGN KEY (`skill_category_id`) REFERENCES `skill_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 12. Table structure for `projects`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `thumbnail_type` varchar(255) DEFAULT NULL,
  `thumbnail_path` text DEFAULT NULL,
  `live_url` text DEFAULT NULL,
  `github_url` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`),
  KEY `projects_user_id_index` (`user_id`),
  KEY `projects_status_index` (`status`),
  CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 13. Table structure for `project_technology` (Pivot)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_technology` (
  `project_id` bigint unsigned NOT NULL,
  `technology_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`project_id`,`technology_id`),
  KEY `project_technology_technology_id_foreign` (`technology_id`),
  CONSTRAINT `project_technology_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_technology_technology_id_foreign` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 14. Table structure for `project_images`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `image_type` varchar(255) NOT NULL DEFAULT 'upload',
  `image_path` text NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_images_project_id_index` (`project_id`),
  CONSTRAINT `project_images_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 15. Table structure for `experiences`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `experiences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `company` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `description` text DEFAULT NULL,
  `technologies` json DEFAULT NULL,
  `company_url` text DEFAULT NULL,
  `logo_type` varchar(255) DEFAULT NULL,
  `logo_path` text DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `experiences_user_id_index` (`user_id`),
  CONSTRAINT `experiences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 16. Table structure for `educations`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `educations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `institution` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `field` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo_type` varchar(255) DEFAULT NULL,
  `logo_path` text DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `educations_user_id_index` (`user_id`),
  CONSTRAINT `educations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 17. Table structure for `services`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `price_label` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `services_user_id_index` (`user_id`),
  CONSTRAINT `services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 18. Table structure for `testimonials`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `avatar_type` varchar(255) DEFAULT NULL,
  `avatar_path` text DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `testimonials_user_id_index` (`user_id`),
  CONSTRAINT `testimonials_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 19. Table structure for `contact_messages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_messages_user_id_index` (`user_id`),
  CONSTRAINT `contact_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 20. Table structure for `media`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `size` int unsigned NOT NULL,
  `path` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL DEFAULT 'public',
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_user_id_index` (`user_id`),
  CONSTRAINT `media_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- DATA INSERTION (Portfolio Seeder Data)
-- ========================================================

-- --------------------------------------------------------
-- Dumping data for table `users`
-- Note: Password is 'Qwe123!!' (bcrypt hash)
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `username`, `title`, `bio`, `location`, `phone`, `website`, `availability`, `years_of_experience`, `profile_image_type`, `profile_image_path`, `resume_path`, `created_at`, `updated_at`) VALUES
(1, 'MJR JUYEL', 'mjrcoder7@gmail.com', NULL, '$2y$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'mjr_juyel', 'CREATIVE TECHNOLOGIST & DISTRIBUTED SYSTEMS ARCHITECT', 'Senior software engineer specializing in scalable backend infrastructure, reactive UI architecture, and modern digital web applications.', 'Dhaka, Bangladesh', '+880 1700-000000', 'https://github.com/mjrcoder7', 'available', 9, 'url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `username` = VALUES(`username`),
  `title` = VALUES(`title`),
  `bio` = VALUES(`bio`),
  `location` = VALUES(`location`),
  `phone` = VALUES(`phone`),
  `website` = VALUES(`website`),
  `availability` = VALUES(`availability`),
  `years_of_experience` = VALUES(`years_of_experience`),
  `profile_image_type` = VALUES(`profile_image_type`),
  `profile_image_path` = VALUES(`profile_image_path`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `hero_settings`
-- --------------------------------------------------------
INSERT INTO `hero_settings` (`id`, `user_id`, `headline`, `subheadline`, `introduction`, `cta_primary_text`, `cta_primary_url`, `cta_secondary_text`, `cta_secondary_url`, `show_availability`, `show_scroll_indicator`, `hero_image_type`, `hero_image_path`, `created_at`, `updated_at`) VALUES
(1, 1, 'I BUILD DIGITAL EXPERIENCES FOR THE FUTURE.', 'FULL STACK ARCHITECTURE // EXPERIMENTAL COMPUTATION', 'Bridging the gap between brutalist visual expression and hyper-scalable backend systems. Crafting resilient web applications, distributed APIs, and next-generation interactive interfaces.', 'ACCESS ARCHIVE', '#work', 'TRANSMIT MESSAGE', '#contact', 1, 1, 'url', 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/564662058_4237191889847886_6340259770833506766_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1152&ctp=s2048x1152&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=_ffCaGDVOikQ7kNvwHmpVeS&_nc_oc=AdqYuolu-Jkb4G_E6AlCzzAz0QVVSKZp0uoDYCToHLxe623upbwULw7i3qLGErXmg-Q&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=4J4usKy40yD4CH-mekk-1g&_nc_ss=7b289&oh=00_AQIldVJtY1kwJzn0sAsiIPwkw5qjKtVhz0Haie8JSNFLGQ&oe=6AA4EE90', '2026-09-07 21:25:05', '2026-09-07 21:27:25')
ON DUPLICATE KEY UPDATE
  `headline` = VALUES(`headline`),
  `subheadline` = VALUES(`subheadline`),
  `introduction` = VALUES(`introduction`),
  `cta_primary_text` = VALUES(`cta_primary_text`),
  `cta_primary_url` = VALUES(`cta_primary_url`),
  `cta_secondary_text` = VALUES(`cta_secondary_text`),
  `cta_secondary_url` = VALUES(`cta_secondary_url`),
  `show_availability` = VALUES(`show_availability`),
  `show_scroll_indicator` = VALUES(`show_scroll_indicator`),
  `hero_image_type` = VALUES(`hero_image_type`),
  `hero_image_path` = VALUES(`hero_image_path`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `about_settings`
-- --------------------------------------------------------
INSERT INTO `about_settings` (`id`, `user_id`, `content`, `philosophy`, `profile_image_type`, `profile_image_path`, `created_at`, `updated_at`) VALUES
(1, 1, '<p>I operate at the convergence of <strong>infrastructure engineering</strong> and <strong>high-fidelity interactive design</strong>. Over the past decade, I have architected systems processing billions of events per day while maintaining a relentless commitment to digital brutalism and typographical precision.</p><p>My technical stack is anchored in Laravel\'s robust backend architecture, React\'s reactive state model, Inertia\'s seamless glue, and modern distributed database patterns.</p>', 'Code is architectural scripture. Every byte of unnecessary overhead eliminated is a victory for computational elegance.', 'url', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `content` = VALUES(`content`),
  `philosophy` = VALUES(`philosophy`),
  `profile_image_type` = VALUES(`profile_image_type`),
  `profile_image_path` = VALUES(`profile_image_path`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `theme_settings`
-- --------------------------------------------------------
INSERT INTO `theme_settings` (`id`, `user_id`, `active_theme`, `allow_visitor_switching`, `custom_overrides`, `created_at`, `updated_at`) VALUES
(1, 1, 'cyber-brutalism', 1, NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `active_theme` = VALUES(`active_theme`),
  `allow_visitor_switching` = VALUES(`allow_visitor_switching`),
  `custom_overrides` = VALUES(`custom_overrides`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `seo_settings`
-- --------------------------------------------------------
INSERT INTO `seo_settings` (`id`, `user_id`, `site_title`, `meta_description`, `keywords`, `og_image_type`, `og_image_path`, `favicon_path`, `canonical_url`, `robots`, `created_at`, `updated_at`) VALUES
(1, 1, 'MJR JUYEL // Creative Technologist & Systems Architect', 'Futuristic developer portfolio and case studies showcasing high-throughput systems, creative web engineering, and neo-brutalist digital interfaces.', 'Laravel, React, Inertia, Creative Technologist, Neo-Brutalism, Full Stack Developer, Systems Architect', 'url', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80', NULL, 'https://portfolio.dev', 'index, follow', '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `site_title` = VALUES(`site_title`),
  `meta_description` = VALUES(`meta_description`),
  `keywords` = VALUES(`keywords`),
  `og_image_type` = VALUES(`og_image_type`),
  `og_image_path` = VALUES(`og_image_path`),
  `favicon_path` = VALUES(`favicon_path`),
  `canonical_url` = VALUES(`canonical_url`),
  `robots` = VALUES(`robots`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `site_settings`
-- --------------------------------------------------------
INSERT INTO `site_settings` (`id`, `user_id`, `logo_type`, `logo_path`, `logo_text`, `favicon_type`, `favicon_path`, `footer_text`, `maintenance_mode`, `analytics_id`, `custom_css`, `custom_js`, `created_at`, `updated_at`) VALUES
(1, 1, 'text', NULL, 'MJR.JUYEL // 2030', 'default', NULL, 'TRANSMISSION COMPLETE. SYSTEM OPERATING UNDER LARAVEL 13, INERTIA V3, REACT 19 & TAILWIND V4. ALL RIGHTS RESERVED.', 0, NULL, NULL, NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `logo_type` = VALUES(`logo_type`),
  `logo_path` = VALUES(`logo_path`),
  `logo_text` = VALUES(`logo_text`),
  `favicon_type` = VALUES(`favicon_type`),
  `favicon_path` = VALUES(`favicon_path`),
  `footer_text` = VALUES(`footer_text`),
  `maintenance_mode` = VALUES(`maintenance_mode`),
  `analytics_id` = VALUES(`analytics_id`),
  `custom_css` = VALUES(`custom_css`),
  `custom_js` = VALUES(`custom_js`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `statistics`
-- --------------------------------------------------------
DELETE FROM `statistics` WHERE `user_id` = 1;
INSERT INTO `statistics` (`id`, `user_id`, `label`, `value`, `suffix`, `numeric_value`, `icon`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Years in Production', '09+', '+', 9, NULL, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'Deployed Architectures', '48+', '+', 48, NULL, 2, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'Global Enterprise Clients', '32+', '+', 32, NULL, 3, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 1, 'Core Technologies', '18+', '+', 18, NULL, 4, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `social_links`
-- --------------------------------------------------------
DELETE FROM `social_links` WHERE `user_id` = 1;
INSERT INTO `social_links` (`id`, `user_id`, `platform`, `url`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'github', 'https://github.com', 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'linkedin', 'https://linkedin.com', 1, 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'twitter', 'https://x.com', 1, 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 1, 'youtube', 'https://youtube.com', 1, 4, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(5, 1, 'dribbble', 'https://dribbble.com', 1, 5, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `technologies`
-- --------------------------------------------------------
INSERT INTO `technologies` (`id`, `name`, `slug`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Laravel 13', 'laravel', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 'React 19', 'react', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 'Inertia.js v3', 'inertia', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 'Tailwind CSS v4', 'tailwind', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(5, 'PostgreSQL', 'postgresql', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(6, 'Redis Cache', 'redis', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(7, 'Docker & K8s', 'docker', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(8, 'TypeScript', 'typescript', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(9, 'WebGL / Shaders', 'webgl', NULL, '2026-09-07 21:25:05', '2026-09-07 21:25:05')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `icon` = VALUES(`icon`),
  `updated_at` = VALUES(`updated_at`);

-- --------------------------------------------------------
-- Dumping data for table `skill_categories`
-- --------------------------------------------------------
DELETE FROM `skills` WHERE `user_id` = 1;
DELETE FROM `skill_categories` WHERE `user_id` = 1;
INSERT INTO `skill_categories` (`id`, `user_id`, `name`, `slug`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Frontend Architecture', 'frontend-architecture', 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'Backend & Distributed Systems', 'backend-systems', 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'Cloud & Infrastructure', 'cloud-infrastructure', 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `skills`
-- --------------------------------------------------------
INSERT INTO `skills` (`id`, `user_id`, `skill_category_id`, `name`, `icon`, `percentage`, `experience_years`, `is_featured`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'React 19 / JSX Architecture', NULL, 96, 7, 1, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 1, 'Inertia.js v3 Integration', NULL, 95, 5, 1, 2, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 1, 'Tailwind CSS v4 Design Tokens', NULL, 98, 6, 0, 3, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 1, 1, 'Motion / Interactive Micro-UX', NULL, 90, 5, 1, 4, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(5, 1, 1, 'TypeScript & Clean Typing', NULL, 88, 6, 0, 5, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(6, 1, 2, 'Laravel Framework & Ecosystem', NULL, 98, 9, 1, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(7, 1, 2, 'RESTful & GraphQL API Architecture', NULL, 94, 8, 1, 2, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(8, 1, 2, 'PostgreSQL Schema & Index Optimization', NULL, 91, 7, 0, 3, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(9, 1, 2, 'Redis Pipelines & Message Queues', NULL, 89, 6, 0, 4, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(10, 1, 2, 'High-Concurrency Event Sourcing', NULL, 86, 4, 0, 5, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(11, 1, 3, 'Docker Orchestration & CI/CD', NULL, 90, 6, 1, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(12, 1, 3, 'Kubernetes Cluster Management', NULL, 82, 4, 0, 2, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(13, 1, 3, 'Cloudflare Workers & Edge Compute', NULL, 88, 4, 0, 3, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `projects`
-- --------------------------------------------------------
DELETE FROM `project_technology` WHERE `project_id` IN (SELECT `id` FROM `projects` WHERE `user_id` = 1);
DELETE FROM `projects` WHERE `user_id` = 1;
INSERT INTO `projects` (`id`, `user_id`, `title`, `slug`, `short_description`, `description`, `thumbnail_type`, `thumbnail_path`, `live_url`, `github_url`, `category`, `year`, `client`, `is_featured`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'AETHER SYNAPSE // Autonomous Trading Terminal', 'aether-synapse-terminal', 'Sub-millisecond cryptocurrency liquidity aggregator and algorithmic execution workstation built with Laravel event broadcasting and React WebSockets.', '<p>Aether Synapse was engineered to eliminate execution slippage across 14 decentralized liquidity pools. The system processes over 25,000 price ticks per second through Redis streams and dispatches atomic order batches.</p><h3>Key Architectural Innovations</h3><ul><li>Sub-50ms roundtrip order dispatch pipeline.</li><li>WebGL candle visualization rendering 100k data points at 60 FPS.</li><li>Zero-downtime hot-swappable liquidity routing algorithms.</li></ul>', 'url', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80', 'https://example.com/aether', 'https://github.com/example/aether-synapse', 'Financial Infrastructure', '2026', 'Apex Quant Capital', 1, 'published', 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'NEURAL GRAPH // Distributed Knowledge Engine', 'neural-graph-knowledge', 'Real-time collaborative semantic graph platform visualizing multi-dimensional research nodes with vector similarity clustering.', '<p>Neural Graph provides researchers with an infinite canvas for exploring complex ontology relationships. Built with Laravel backend indexing and an interactive React canvas matrix.</p><h3>System Highlights</h3><ul><li>Vector embeddings mapped across 3D interactive coordinates.</li><li>Real-time collaborative cursor presence via WebSockets.</li><li>Multi-tenant row-level access control.</li></ul>', 'url', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80', 'https://example.com/neural-graph', 'https://github.com/example/neural-graph', 'AI & Knowledge Graph', '2025', 'Cortex Institute', 1, 'published', 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'ORBITAL OS // Web Kernel Workstation', 'orbital-os-workstation', 'A browser-based Unix environment featuring virtual file systems, sandboxed execution, and brutalist command line ergonomics.', '<p>An experimental operating system living entirely in the browser. Powered by WebAssembly and an Inertia/React HUD.</p>', 'url', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80', 'https://example.com/orbital', 'https://github.com/example/orbital-os', 'Experimental Computing', '2025', 'Internal Research R&D', 0, 'published', 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 1, 'CYBER CORE // High-Throughput Payment Switch', 'cyber-core-payment', 'Fault-tolerant multi-rail payment routing engine handling distributed ledger settlements and fiat gateways with 99.999% uptime.', '<p>Mission-critical payment telemetry switch processing recurring subscriptions and instant cross-border transfers.</p>', 'url', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80', 'https://example.com/cyber-core', 'https://github.com/example/cyber-core', 'FinTech Systems', '2024', 'Vanguard Pay', 0, 'published', 4, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `project_technology`
-- --------------------------------------------------------
INSERT INTO `project_technology` (`project_id`, `technology_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(2, 8),
(3, 2),
(3, 4),
(3, 8),
(4, 1),
(4, 5),
(4, 6),
(4, 7);

-- --------------------------------------------------------
-- Dumping data for table `experiences`
-- --------------------------------------------------------
DELETE FROM `experiences` WHERE `user_id` = 1;
INSERT INTO `experiences` (`id`, `user_id`, `company`, `position`, `location`, `start_date`, `end_date`, `is_current`, `description`, `technologies`, `company_url`, `logo_type`, `logo_path`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'QUANTUM LABS', 'Principal Systems Architect', 'Tokyo / Remote', '2023-04-01', NULL, 1, 'Leading platform architecture across distributed multi-region cloud services. Spearheaded migration to event-driven microservices reducing P99 latency by 58%.', NULL, 'https://example.com', NULL, NULL, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'HYPERSCALE CLOUD', 'Staff Full Stack Engineer', 'San Francisco, CA', '2020-08-01', '2023-03-31', 0, 'Architected customer-facing telemetry dashboard deployed to 80,000+ engineers. Engineered core Inertia + React component library still in active production.', NULL, 'https://example.com', NULL, NULL, 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'CYBERKINETICS R&D', 'Senior Backend Developer', 'Austin, TX', '2017-06-01', '2020-07-31', 0, 'Built high-throughput payment ingestion APIs handling $400M+ in annual transactions. Implemented strict automated integration suites.', NULL, 'https://example.com', NULL, NULL, 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `educations`
-- --------------------------------------------------------
DELETE FROM `educations` WHERE `user_id` = 1;
INSERT INTO `educations` (`id`, `user_id`, `institution`, `degree`, `field`, `start_date`, `end_date`, `description`, `logo_type`, `logo_path`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'STANFORD UNIVERSITY', 'Master of Science', 'Distributed Systems & Computer Science', '2015-09-01', '2017-06-01', 'Research focus on distributed consensus algorithms, peer-to-peer gossip protocols, and fault-tolerant storage topologies.', NULL, NULL, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'UC BERKELEY', 'Bachelor of Science', 'Computer Science & Mathematics', '2011-09-01', '2015-05-01', 'Graduated with Magna Cum Laude. Undergraduate research assistant in programming languages and compiler optimizations.', NULL, NULL, 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `services`
-- --------------------------------------------------------
DELETE FROM `services` WHERE `user_id` = 1;
INSERT INTO `services` (`id`, `user_id`, `title`, `description`, `icon`, `price_label`, `is_featured`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Distributed Systems Architecture', 'Designing fault-tolerant backend infrastructure, multi-region event pipelines, and high-throughput data layers designed for 99.999% availability.', 'cpu', 'From $12,000', 1, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'Full Stack Web Platform Engineering', 'End-to-end bespoke development leveraging modern Laravel backend architecture paired with Inertia.js, React, and tailored brutalist design systems.', 'layout', 'From $8,500', 1, 1, 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'High-Performance API & Database Tuning', 'Deep PostgreSQL index optimization, query profiling, Redis caching strategies, and memory footprint reduction for latency-critical systems.', 'database', 'From $5,000', 0, 1, 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(4, 1, 'Creative Tech & Interactive Prototyping', 'Experimental interface engineering, custom WebGL visualizers, interactive 3D web applications, and brutalist design implementations.', 'sparkles', 'From $6,000', 0, 1, 4, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `testimonials`
-- --------------------------------------------------------
DELETE FROM `testimonials` WHERE `user_id` = 1;
INSERT INTO `testimonials` (`id`, `user_id`, `name`, `position`, `company`, `content`, `avatar_type`, `avatar_path`, `rating`, `is_featured`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Dr. Aris Thorne', 'Chief Technology Officer', 'Quantum Labs', 'Kaien operates with unprecedented engineering velocity and surgical precision. One of the rarest minds in modern computation.', 'url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 5, 1, 1, 1, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(2, 1, 'Sarah Chen', 'VP of Product Engineering', 'HyperScale IO', 'The architecture Kaien delivered handled our Black Friday load spike without a millisecond of jitter. Exceptional craftsmanship.', 'url', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', 5, 1, 1, 2, '2026-09-07 21:25:05', '2026-09-07 21:25:05'),
(3, 1, 'David Kova', 'Founder & Managing Partner', 'Apex Quant Capital', 'A true creative technologist. Bold, unapologetic brutalist aesthetic backed by rock-solid enterprise backend engineering.', 'url', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 5, 1, 1, 3, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

-- --------------------------------------------------------
-- Dumping data for table `contact_messages`
-- --------------------------------------------------------
DELETE FROM `contact_messages` WHERE `user_id` = 1;
INSERT INTO `contact_messages` (`id`, `user_id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 1, 'Morgan Vance', 'morgan@frontier-ventures.ai', 'Invitation: Architecture Advisory & Keynote', 'Greetings Kaien. We have been tracking your work on decentralized liquidity aggregates. We would like to discuss an advisory role on our upcoming computational infrastructure fund.', 0, '2026-09-07 21:25:05', '2026-09-07 21:25:05');

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
