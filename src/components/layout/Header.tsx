import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Wheat } from 'lucide-react';
import type { FarmerProfile } from '../../types';

interface HeaderProps {
  isLoggedIn: boolean;
  farmerProfile: FarmerProfile | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ isLoggedIn, farmerProfile, onLoginClick, onLogout }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/mandis', label: 'Mandis' },
    { to: '/analyzer', label: 'Smart Analyzer' },
    { to: '/admin', label: 'Mandi Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-green-700 font-bold text-xl">
            <Wheat size={28} className="text-green-600" />
            <span>सही Mandi</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn && farmerProfile ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 text-green-700 font-medium text-sm hover:bg-green-100 transition-colors"
                >
                  <User size={16} />
                  <span>{farmerProfile.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                    <button
                      onClick={() => { navigate('/dashboard'); setUserDropdown(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { onLogout(); setUserDropdown(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-5 py-2 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-colors shadow-sm"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100">
            {isLoggedIn && farmerProfile ? (
              <div className="space-y-1">
                <button
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </button>
                <button
                  onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false); }}
                className="w-full px-4 py-2.5 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-700"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
