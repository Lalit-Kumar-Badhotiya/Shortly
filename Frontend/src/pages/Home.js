import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Lock, BarChart, Globe, CheckCircle } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-blue-200">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-full text-sm mb-6">
              ✨ The new standard for links
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8 text-stone-900 tracking-tight">
              Shorten links.<br/>
              <span className="text-blue-600 underline decoration-4 decoration-blue-200 underline-offset-4">Expand reach.</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-lg">
              A powerful URL shortener built for modern brands. Turn those long, messy links into clear, trackable assets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                >
                  Start for Free <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-2xl font-bold text-lg hover:border-stone-800 hover:text-stone-900 transition-colors">
                  View Demo
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual - Abstract Card Stack */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Background Blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-[3rem] transform rotate-3 scale-105" />
            
            {/* Main Card */}
            <div className="relative bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-2xl shadow-stone-200/50">
              
              {/* Fake UI: Matches your new URLCard.js style */}
              <div className="space-y-6">
                
                {/* 1. Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-stone-100 rounded-xl text-stone-600">
                      <Globe size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Original Source</div>
                      <div className="text-sm font-medium text-stone-600">https://super-long-brand-url.com/2026</div>
                    </div>
                  </div>
                </div>

                {/* 2. Short Link Box */}
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Short Link</div>
                    <div className="flex items-center gap-1 font-bold text-blue-700 text-lg">
                      <span className="opacity-50">short.ly/</span>
                      <span>summer-sale</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white text-blue-600 rounded-xl shadow-sm">
                    <CheckCircle size={20} />
                  </div>
                </div>

                {/* 3. Skeleton Loader Lines */}
                <div className="pt-2 flex gap-3">
                   <div className="h-2 w-full bg-stone-100 rounded-full" />
                   <div className="h-2 w-2/3 bg-stone-100 rounded-full" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* --- BENTO GRID FEATURES --- */}
        <div className="grid md:grid-cols-3 gap-6">
          <BentoCard 
            icon={<Zap size={32} className="text-amber-600" />}
            title="Lightning Fast"
            desc="Redirects that happen in milliseconds. No lag, just speed."
            bg="bg-amber-50"
            delay={0.1}
          />
          
          <BentoCard 
            icon={<Lock size={32} className="text-emerald-600" />}
            title="Secure by Default"
            desc="Enterprise-grade encryption keeps your data safe."
            bg="bg-emerald-50"
            delay={0.2}
          />

          <BentoCard 
            icon={<BarChart size={32} className="text-purple-600" />}
            title="Real-time Data"
            desc="Watch your clicks grow live on your dashboard."
            bg="bg-purple-50"
            delay={0.3}
          />
        </div>
      </main>
    </div>
  );
};

// Reusable Bento Card Component
const BentoCard = ({ icon, title, desc, bg, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
      className={`${bg} p-8 rounded-[2.5rem] border border-stone-200/50 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 cursor-default`}
    >
      <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-stone-800">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed font-medium">
        {desc}
      </p>
    </motion.div>
  );
};

export default Home;