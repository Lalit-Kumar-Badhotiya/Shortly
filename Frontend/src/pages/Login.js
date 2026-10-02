import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginService(formData);
      login(response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-blue-200">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          {/* Card Container */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-stone-900 tracking-tight mb-2">
                Welcome Back
              </h2>
              <p className="text-stone-500 font-medium">
                Enter your details to access your workspace.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 overflow-hidden"
                  data-testid="error-message"
                >
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <span className="font-bold text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 text-stone-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-medium placeholder:text-stone-300"
                    data-testid="email-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 text-stone-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-medium placeholder:text-stone-300"
                    data-testid="password-input"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 bg-stone-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-lg shadow-stone-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                data-testid="login-submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-stone-500 font-medium">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 font-bold hover:text-blue-700 hover:underline decoration-2 underline-offset-4 transition-all"
                  data-testid="signup-link"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;