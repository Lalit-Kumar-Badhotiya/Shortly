import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Link2, CheckCircle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleUrlCreated = (result) => {
    setSuccessMessage(`Success! Short code created: ${result.shortCode}`);
    setTimeout(() => setSuccessMessage(''), 5000);
    // Trigger URL list refresh
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-blue-200">
      <Navbar />

      {/* --- Floating Success Toast --- */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-stone-900 text-white rounded-2xl shadow-2xl shadow-stone-900/20"
          >
            <div className="p-1 bg-green-500 rounded-full text-stone-900">
              <CheckCircle size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-sm tracking-wide">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
        
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-stone-500 font-medium max-w-2xl">
            Manage your links and track your performance.
          </p>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column: Create Form (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <URLForm onUrlCreated={handleUrlCreated} />
          </div>

          {/* Right Column: Analytics Widget (Spans 1 column) */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2rem] border border-stone-200 h-full shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                    <Activity size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900">Quick Stats</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Links</span>
                      <Link2 size={16} className="text-stone-300" />
                    </div>
                    {/* Note: This is a placeholder. To make it real, you'd lift state from URLList */}
                    <div className="text-3xl font-black text-stone-900">
                      --
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Active</span>
                      <TrendingUp size={16} className="text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-green-700">
                      100%
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                <p className="text-xs text-stone-400 font-medium">
                  Analytics update in real-time
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Bottom Section: URL List --- */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/50">
          <URLList refreshTrigger={refreshTrigger} />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;