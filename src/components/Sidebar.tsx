import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShareIcon,
  Users,
  FileText,
  Calendar,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  Calculator,
  FileSpreadsheet,
  Building2,
  ExternalLink,
  Book,
  Home,
  Info,
  Star,
  ShoppingCart,
  Mail
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  path: string;
  restricted: boolean;
  external?: boolean;
  url?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuth();
  const isLoggedIn = !!state.memberData;
  const isMobile = useIsMobile();
  const memberData = state.memberData;
  const memberStatusCode = state.memberData?.MemberStatusCode || '';

  // Allowed member status codes for restricted features
  const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];
  const hasRestrictedAccess = !allowedCodes.includes(memberStatusCode);

  const memberName = memberData ? `${memberData.FirstNames} ${memberData.Surname}` : '';
  const memberStatus = memberData ? memberData.MemberStatusDescription : 'Subscriber';

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isLoggedIn, setIsOpen]);

  const loggedInNavItems: SidebarItem[] = [
    { icon: ShareIcon, label: 'Referrals', id: 'referrals', path: '/referrals', restricted: true },
    { icon: Users, label: 'Club Units', id: 'club-units', path: '/club-units', restricted: true },
    { icon: FileText, label: 'Invoice', id: 'invoice-transactions', path: '/invoices', restricted: true },
    { icon: Calendar, label: 'Events', id: 'calendar-events', path: '/events', restricted: false },
    { icon: SettingsIcon, label: 'Settings', id: 'settings', path: '/settings', restricted: false }
  ];

  const educationItems: SidebarItem[] = [
    {
      icon: Book,
      label: 'Online Courses',
      id: 'online-courses',
      path: '/education',
      restricted: false
    }
  ];

  const toolItems: SidebarItem[] = [
    {
      icon: Building2,
      label: 'LC System',
      id: 'lc-system',
      path: '',
      external: true,
      url: 'https://www.thelcsystem.com/',
      restricted: false
    },
    {
      icon: FileSpreadsheet,
      label: 'Investor Software',
      id: 'investor-software',
      path: '',
      external: true,
      url: 'https://www.treocinvestor.com',
      restricted: false
    },
    {
      icon: Calculator,
      label: 'Affordability Calculator',
      id: 'affordability-calculator',
      path: '/calculator',
      restricted: true
    },
    {
      icon: FileText,
      label: 'Financial Questionnaire',
      id: 'financial-questionnaire',
      path: '/questionnaire',
      restricted: true
    },
  ];

  const loggedOutNavItems: SidebarItem[] = [
    { icon: Home, label: 'Home', id: 'home', path: '/', restricted: false },
    { icon: Info, label: 'About Us', id: 'about_us', path: '/about-us', restricted: false },
    { icon: Calendar, label: 'Events', id: 'events', path: '/events', restricted: false },
    { icon: Users, label: 'Membership', id: 'membership', path: '/membership', restricted: false },
    { icon: ShoppingCart, label: 'Shop', id: 'shop', path: '/shop', restricted: false },
    { icon: Star, label: 'Testimonials', id: 'testimonials', path: '/testimonials', restricted: false },
    { icon: Mail, label: 'Contact Us', id: 'contact', path: '/contact-us', restricted: false }
  ];

  const handleNavClick = (item: SidebarItem) => {
    if (item.restricted && hasRestrictedAccess) {
      return; // Don't navigate if access is restricted
    }

    if (item.external && item.url) {
      window.open(item.url, '_blank');
    } else {
      navigate(item.path);
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-all duration-300 z-40',
          isOpen ? 'w-64' : 'w-16',
          !isOpen && 'md:translate-x-0 -translate-x-full',
          isOpen && 'translate-x-0'
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-4 bg-gray-900 rounded-full p-1 hidden md:block"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4 text-white" />
          ) : (
            <ChevronRight className="h-4 w-4 text-white" />
          )}
        </button>

        <div className="h-full flex flex-col">
          {isLoggedIn ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src="https://backoffice.treoc.com/data/archive/images/portal-profile.png"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                {isOpen && (
                  <div>
                    <h3 className="font-medium">{memberName}</h3>
                    <p className="text-sm text-gray-400">{memberStatus}</p>
                  </div>
                )}
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    if (isMobile) {
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    isCurrentPath('/dashboard') ? 'bg-blue-600' : 'hover:bg-gray-800'
                  )}
                >
                  <Menu className="h-5 w-5" />
                  {isOpen && <span>Dashboard</span>}
                </button>

                {loggedInNavItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      id={item.id}
                      onClick={() => handleNavClick(item)}
                      disabled={item.restricted && hasRestrictedAccess}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                        isCurrentPath(item.path) ? 'bg-blue-600' : 'hover:bg-gray-800',
                        item.restricted && hasRestrictedAccess && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                    {isOpen && item.restricted && hasRestrictedAccess && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        Restricted Access: Upgrade membership to use this feature
                      </div>
                    )}
                  </div>
                ))}

                {isOpen && (
                  <div className="pt-4 mt-4 border-t border-gray-700">
                    <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Education
                    </h4>
                  </div>
                )}
                {educationItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item)}
                      disabled={item.restricted && hasRestrictedAccess}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                        isCurrentPath(item.path) ? 'bg-blue-600' : 'hover:bg-gray-800',
                        item.restricted && hasRestrictedAccess && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {isOpen && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.label}</span>
                        </div>
                      )}
                    </button>
                    {isOpen && item.restricted && hasRestrictedAccess && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        Restricted Access: Upgrade membership to use this feature
                      </div>
                    )}
                  </div>
                ))}

                {isOpen && (
                  <div className="pt-4 mt-4 border-t border-gray-700">
                    <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tools
                    </h4>
                  </div>
                )}
                {toolItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item)}
                      disabled={item.restricted && hasRestrictedAccess}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                        isCurrentPath(item.path) ? 'bg-blue-600' : 'hover:bg-gray-800',
                        item.restricted && hasRestrictedAccess && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {isOpen && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.label}</span>
                          {item.external && <ExternalLink className="h-4 w-4" />}
                        </div>
                      )}
                    </button>
                    {isOpen && item.restricted && hasRestrictedAccess && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        Restricted Access: Upgrade membership to use this feature
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-2">
                {loggedOutNavItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer',
                        isCurrentPath(item.path) ? 'bg-blue-600' : 'hover:bg-gray-800'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
