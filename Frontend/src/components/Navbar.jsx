import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tight">
            TeamTracker
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {user.name} ({user.role})
                </span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-indigo-200 transition font-medium">
                    Admin Panel
                  </Link>
                )}
                {user.role === 'user' && (
                  <Link to="/dashboard" className="hover:text-indigo-200 transition font-medium">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </div>

          {user && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>

        {user && isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-white/20 pt-4">
            <p className="text-sm bg-white/20 px-3 py-2 rounded">
              {user.name} ({user.role})
            </p>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 hover:bg-white/20 rounded transition"
              >
                Admin Panel
              </Link>
            )}
            {user.role === 'user' && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 hover:bg-white/20 rounded transition"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg font-semibold transition text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}