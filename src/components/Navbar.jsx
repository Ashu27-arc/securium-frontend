import { Link } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center gap-2 group">
        <div className="bg-primary-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Securium</span>
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-slate-700">{user.name}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              {user.role}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-5 h-5" />
          </div>
          <button 
            onClick={logout}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
