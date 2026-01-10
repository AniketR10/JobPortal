import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  LogOut, 
  User as UserIcon,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold flex items-center gap-1 tracking-tight text-slate-900">
            <span className="text-blue-600 text-xl tracking-tighter">•••</span> 
            JobOrbit
          </Link>

          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            {user?.role === 'employer' ? (
              <>
                <Link to="/employer/jobs" className="hover:text-blue-600 transition-colors">
                  My Jobs
                </Link>
                <Link to="/employer/dashboard" className="hover:text-blue-600 transition-colors">
                  Find Talent
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs" className="hover:text-blue-600 transition-colors">
                  Find Jobs
                </Link>
                {user?.role === 'candidate' && (
                  <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                    My Applications
                  </Link>
                )}
              </>
            )}
            <Link to="#" className="hover:text-blue-600 transition-colors">Messages</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          {user ? (
            <>
              <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 overflow-hidden border border-slate-300">
                     <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="hidden md:block text-left">
                     <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                     <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout} 
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-black text-white hover:bg-slate-800 rounded-full px-6 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}