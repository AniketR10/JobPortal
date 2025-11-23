import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
        JobBoard<span className="text-slate-800">.io</span>
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/jobs">
          <Button variant="ghost">Browse Jobs</Button>
        </Link>

        {user ? (
          <>
            {user.role === 'candidate' && (
              <Link to="/dashboard">
                <Button variant="outline">My Applications</Button>
              </Link>
            )}

            {user.role === 'employer' && (
              <Link to="/employer/dashboard">
                <Button variant="outline">Employer Dashboard</Button>
              </Link>
            )}

            <div className="flex items-center gap-4 ml-2">
              <span className="text-sm text-gray-500 hidden md:inline">
                {user.name} ({user.role})
              </span>
              <Button variant="destructive" size="sm" onClick={() => { logout(); navigate('/login'); }}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/register"><Button>Get Started</Button></Link>
          </div>
        )}
      </div>
    </nav>
  );
}