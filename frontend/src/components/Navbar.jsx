import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// --- SVG ICON COMPONENTS ---
// For better accessibility, decorative icons are hidden from screen readers.

const HomeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

// Icons for the mobile menu toggle button
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- NAVBAR COMPONENT ---

export default function Navbar() {
  // State to manage the mobile menu's open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to apply conditional styles for NavLinks (including focus styles for accessibility)
  const linkClass = ({ isActive }) =>
    isActive
      ? 'flex items-center px-3 py-2 rounded-md text-sm font-semibold bg-primary-500 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-white'
      : 'flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white';

  // Specific classes for the CTA button to add accessible focus styles
  const ctaButtonClass = "flex items-center px-4 py-2 rounded-md text-sm font-bold bg-slate-100 text-slate-800 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white";

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          
          {/* Main Brand/Logo Link */}
          <NavLink
            to="/"
            className="text-xl font-bold hover:text-slate-200 transition-colors duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(false)}
          >
            AutoFlow
          </NavLink>

          {/* Desktop Navigation Links (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" end className={linkClass}>
              <HomeIcon />
              Vehicles
            </NavLink>
            <NavLink to="/add" className={ctaButtonClass}>
              <PlusIcon />
              Add Vehicle
            </NavLink>
          </div>

          {/* Mobile Menu Button (hidden on medium screens and up) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (conditionally rendered) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-start space-y-3">
            <NavLink to="/" end className={linkClass} onClick={() => setIsMenuOpen(false)}>
              <HomeIcon />
              Vehicles
            </NavLink>
            <NavLink to="/add" className={ctaButtonClass} onClick={() => setIsMenuOpen(false)}>
              <PlusIcon />
              Add Vehicle
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}