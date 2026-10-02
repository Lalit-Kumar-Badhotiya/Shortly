import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Link2, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-[#FDFBF7]/90 border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo - Simple & Bold */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg text-white transform group-hover:rotate-6 transition-transform duration-300 shadow-md">
            <Link2 size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-stone-800 tracking-tight">
            Short<span className="text-blue-600">ly.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated() ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-stone-600 font-medium hover:text-stone-900 transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-stone-600 font-bold hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
              <Link to="/signup">
                <button className="px-6 py-3 bg-stone-900 text-[#FDFBF7] rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300">
                  Get Started Free
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-stone-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Simple Slide Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-stone-100"
          >
            <div className="flex flex-col p-6 gap-4">
              {isAuthenticated() ? (
                <button onClick={handleLogout} className="text-left font-bold text-red-600">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="text-lg font-medium text-stone-600">Log In</Link>
                  <Link to="/signup" className="text-lg font-bold text-blue-600">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    );
};

export default Navbar;