import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    let route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth?: {
            user?: {
                id: number;
                name: string;
                email: string;
                email_verified_at?: string;
                username?: string;
                avatar?: string;
                location?: string;
                availability?: string;
            } | null;
        };
        activeTheme?: string;
        allowVisitorSwitching?: boolean;
        siteSettings?: {
            id?: number;
            user_id?: number;
            logo_type?: string;
            logo_path?: string;
            logo_url?: string;
            logo_text?: string;
            favicon_type?: string;
            favicon_path?: string;
            favicon_url?: string;
            site_title?: string;
            footer_text?: string;
            maintenance_mode?: boolean;
            analytics_id?: string;
            custom_css?: string;
            custom_js?: string;
        };
        flash?: {
            success?: string | null;
            error?: string | null;
        };
        [key: string]: any;
    }
}
