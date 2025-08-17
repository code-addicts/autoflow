import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook

// --- (Your SVG Icon Components Here) ---
const HomeIcon = () => ( <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> );
const PlusIcon = () => ( <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> );
const LogoutIcon = () => ( <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> );
const MenuIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg> );
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // 2. Use the hook to get auth status and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from our context
    navigate('/login');
    setIsMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'flex items-center px-3 py-2 rounded-md text-sm font-semibold bg-primary-500 text-white shadow-inner'
      : 'flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white';

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold hover:text-slate-200">
            AutoFlow
          </NavLink>

          {/* --- DESKTOP VIEW --- */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // --- Logged-In User Links ---
              <>
                <NavLink to="/" end className={linkClass}> <HomeIcon /> Vehicles </NavLink>
                <NavLink to="/add" className={linkClass}> <PlusIcon /> Add Vehicle </NavLink>
                <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white">
                  <LogoutIcon /> Logout
                </button>
              </>
            ) : (
              // --- Logged-Out Visitor Links ---
              <>
                <NavLink to="/login" className={linkClass}> Login </NavLink>
                <NavLink to="/register" className="px-4 py-2 rounded-md text-sm font-bold bg-primary-500 hover:bg-primary-600 shadow-md">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU (conditionally rendered) --- */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-start space-y-3">
            {isAuthenticated ? (
               <>
                <NavLink to="/" end className={linkClass} onClick={() => setIsMenuOpen(false)}> <HomeIcon /> Vehicles </NavLink>
                <NavLink to="/add" className={linkClass} onClick={() => setIsMenuOpen(false)}> <PlusIcon /> Add Vehicle </NavLink>
                <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white">
                  <LogoutIcon /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setIsMenuOpen(false)}> Login </NavLink>
                <NavLink to="/register" className="px-4 py-2 rounded-md text-sm font-bold bg-primary-500 hover:bg-primary-600" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}