import React, { useEffect, useState } from 'react';
import { getAllUrls } from '../services/urlService';
import URLCard from './URLCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, AlertCircle, Loader2, Library } from 'lucide-react';

const URLList = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, [refreshTrigger]);

  const fetchUrls = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllUrls();
      setUrls(response.codes || []);
    } catch (err) {
      setError(err.error || 'Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  const handleUpdate = (updatedUrl) => {
    setUrls(urls.map((url) => (url.id === updatedUrl.id ? updatedUrl : url)));
  };

  // Animation Variants for Stagger Effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-stone-400 font-medium text-sm animate-pulse">Loading your archive...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col items-center text-center" data-testid="error-message">
        <div className="p-3 bg-red-100 rounded-full text-red-600 mb-3">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-red-900 font-bold mb-1">Unable to load links</h3>
        <p className="text-red-500 text-sm">{error}</p>
        <button 
          onClick={fetchUrls}
          className="mt-4 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6 border-2 border-dashed border-stone-200 rounded-[2rem] bg-stone-50/50"
      >
        <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-4">
          <Ghost size={32} className="text-stone-300" />
        </div>
        <h3 className="text-xl font-bold text-stone-800 mb-2">It's quiet in here...</h3>
        <p className="text-stone-500 max-w-xs mx-auto mb-6">
          You haven't shortened any links yet. Use the magic wand above to create your first one!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6" data-testid="url-list">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
          <Library size={20} />
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">Your Archive</h2>
        <span className="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold rounded-full ml-auto">
          {urls.length} Links
        </span>
      </div>

      {/* List Container */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4"
      >
        <AnimatePresence mode="popLayout">
          {urls.map((url) => (
            <motion.div key={url.id} variants={item} layout>
              <URLCard
                url={url}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default URLList;