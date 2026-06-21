import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookMarked, Sparkles } from 'lucide-react';

export function AppHeader() {
  const { pathname } = useLocation();

  const navItems = [
    { to: '/', label: '模板广场', icon: LayoutGrid, exact: true },
    { to: '/my-works', label: '我的作品', icon: BookMarked, exact: false },
  ];

  const isActive = (to: string, exact: boolean) => (exact ? pathname === to : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-lg font-bold text-ink-800 leading-tight">封面工坊</div>
            <div className="text-[10px] text-ink-400 leading-tight">CoverLab Studio</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = isActive(to, exact);
            return (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-md'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
