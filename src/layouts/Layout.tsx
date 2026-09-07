import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Target, 
  Trophy, 
  Users, 
  BarChart2, 
  User, 
  MessageSquare,
  PlayCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'My Plan', path: '/plan', icon: Target },
  { name: 'Track', path: '/activity', icon: PlayCircle },
  { name: 'History', path: '/history', icon: Activity },
  { name: 'Sports', path: '/sports', icon: Trophy },
  { name: 'Challenges', path: '/challenges', icon: Trophy },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Coach', path: '/coach', icon: MessageSquare },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Activity className="w-6 h-6" />
            FitandBeat
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden h-16 flex items-center px-4 bg-white border-b border-gray-200 shrink-0 justify-between">
           <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
            <Activity className="w-5 h-5" />
            FitandBeat
          </div>
        </header>
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0 p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
        {[
          { name: 'Home', path: '/dashboard', icon: Home },
          { name: 'Track', path: '/activity', icon: PlayCircle },
          { name: 'Sports', path: '/sports', icon: Trophy },
          { name: 'Community', path: '/community', icon: Users },
          { name: 'Profile', path: '/profile', icon: User },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-1 p-2 w-16 transition-colors',
              location.pathname === item.path
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-900'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
