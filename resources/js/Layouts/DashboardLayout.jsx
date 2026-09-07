import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/Utils/cn';
import { Head } from '@inertiajs/react';
import { 
  Home, User, Sparkles, Info, Zap, Folder, Briefcase, 
  GraduationCap, Settings, MessageSquare, BarChart3, Share2, 
  Mail, Image as ImageIcon, Palette, Search, Settings2, 
  Eye, ExternalLink, Menu, X, Bell, LogOut, ChevronDown
} from 'lucide-react';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import ThemeSwitcher from '@/Components/Portfolio/ThemeSwitcher';
import { ToastProvider } from '@/Components/UI/Toast';
import MJRLogo from '@/Components/MJRLogo';
import ShareModal from '@/Components/Dashboard/ShareModal';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, exact: true },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Hero', href: '/dashboard/hero', icon: Sparkles },
  { name: 'About', href: '/dashboard/about', icon: Info },
  { name: 'Skills', href: '/dashboard/skills', icon: Zap },
  { name: 'Projects', href: '/dashboard/projects', icon: Folder },
  { name: 'Experience', href: '/dashboard/experiences', icon: Briefcase },
  { name: 'Education', href: '/dashboard/educations', icon: GraduationCap },
  { name: 'Services', href: '/dashboard/services', icon: Settings },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
  { name: 'Statistics', href: '/dashboard/statistics', icon: BarChart3 },
  { name: 'Social Links', href: '/dashboard/social-links', icon: Share2 },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail, badge: true },
  { name: 'Media', href: '/dashboard/media', icon: ImageIcon },
  { name: 'Theme', href: '/dashboard/theme', icon: Palette },
  { name: 'SEO', href: '/dashboard/seo', icon: Search },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings2 },
];

export default function DashboardLayout({ children, title }) {
  const { url, props } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  const unreadMessagesCount = props.unreadMessagesCount || 0;
  const user = props.auth?.user;
  const siteSettings = props.siteSettings;

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
          <Head title={title ? `${title} - Dashboard` : 'Dashboard'}>
            <link rel="icon" type="image/svg+xml" href={siteSettings?.favicon_url || '/favicon.svg'} />
          </Head>
          
          {/* Sidebar Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/80 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={cn(
            "fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 lg:translate-x-0 flex flex-col",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="h-16 flex items-center px-6 border-b border-zinc-800 bg-zinc-950 shrink-0">
              <Link href="/dashboard" className="font-bold text-lg tracking-tight text-white flex items-center gap-3">
                {siteSettings?.logo_url ? (
                  <img src={siteSettings.logo_url} alt="Logo" className="w-8 h-8 object-contain rounded" />
                ) : (
                  <MJRLogo className="w-8 h-8 text-primary shrink-0" />
                )}
                <span className="truncate font-mono uppercase text-sm font-black tracking-tight">
                  {siteSettings?.logo_text || 'MJR // CMS'}
                </span>
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              <nav className="space-y-1 px-3">
                {navItems.map((item) => {
                  const isActive = item.exact ? url === item.href : url.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-zinc-800 text-white border-l-2 border-white" 
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={isActive ? "text-white" : "text-zinc-500"} />
                        {item.name}
                      </div>
                      {item.badge && unreadMessagesCount > 0 && (
                        <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {unreadMessagesCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
                
                <div className="my-4 border-t border-zinc-800" />
                
                <a
                  href="/dashboard/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-zinc-800/50 transition-colors"
                >
                  <Eye size={18} />
                  Live Preview
                </a>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
                >
                  <ExternalLink size={18} className="text-zinc-500" />
                  View Live Site
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:pl-64 flex flex-col min-h-screen">
            {/* Header */}
            <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-zinc-400 hover:text-white cursor-pointer"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-white hidden sm:block">{title}</h1>
              </div>
              
              <div className="flex items-center gap-3 lg:gap-5">
                {/* Dashboard Theme Switcher */}
                <div className="flex items-center gap-2 pr-2 border-r border-zinc-800">
                  <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">THEME:</span>
                  <ThemeSwitcher />
                </div>

                {/* Share Option */}
                <button 
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700/80 hover:border-primary text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm group"
                  title="Share Portfolio Link"
                >
                  <Share2 size={15} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider">
                    Share
                  </span>
                </button>

                <button className="text-zinc-400 hover:text-white transition-colors relative cursor-pointer">
                  <Bell size={20} />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-zinc-950"></span>
                  )}
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-zinc-900 py-1 px-2 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-sm font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown size={16} className="text-zinc-500" />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl py-1 z-50">
                      <div className="px-4 py-2 border-b border-zinc-800 mb-1">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email || 'admin@example.com'}</p>
                      </div>
                      <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">
                        <User size={16} /> Profile
                      </Link>
                      <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 text-left cursor-pointer">
                        <LogOut size={16} /> Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-4 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>

          {/* Share Modal Dialog */}
          <ShareModal 
            open={shareModalOpen} 
            onClose={() => setShareModalOpen(false)} 
            siteSettings={siteSettings} 
            user={user} 
          />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

