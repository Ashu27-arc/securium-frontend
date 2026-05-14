import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Ticket', path: '/create-ticket', icon: PlusCircle, role: 'user' },
    { name: 'Admin Panel', path: '/admin', icon: ShieldCheck, role: 'admin' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          {links
            .filter(link => !link.role || link.role === user?.role)
            .map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </NavLink>
            ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-2">
            <Settings className="w-3 h-3" />
            Support
          </div>
          <p className="text-xs text-slate-500">
            Need help? Contact our technical team for assistance.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
