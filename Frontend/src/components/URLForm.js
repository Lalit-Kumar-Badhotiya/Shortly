import React, { useState } from 'react';
import { shortenUrl } from '../services/urlService';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Wand2, ArrowRight, AlertCircle, Globe } from 'lucide-react';

const URLForm = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { url };
      if (code) {
        payload.code = code;
      }

      const result = await shortenUrl(payload);
      
      // Clear form
      setUrl('');
      setCode('');
      
      // Notify parent component
      if (onUrlCreated) {
        onUrlCreated(result);
      }
    } catch (err) {
      setError(err.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2rem] shadow-xl shadow-stone-200/40 border border-stone-100 relative overflow-hidden" 
      data-testid="url-form"
    >
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
            <Wand2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Create New Link</h2>
            <p className="text-stone-500 font-medium">Paste your long URL below</p>
          </div>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600"
              data-testid="error-message"
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="font-bold text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">
              Destination URL <span className="text-blue-600">*</span>
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-blue-600 transition-colors">
                <Globe size={20} />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://super-long-website.com/article/2026..."
                required
                className="w-full pl-12 pr-4 py-4 bg-stone-50 text-stone-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-medium placeholder:text-stone-400"
                data-testid="url-input"
              />
            </div>
          </div>

          {/* Custom Code Input */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">
                Custom Alias
              </label>
              <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 text-stone-500 rounded-md uppercase tracking-wide">
                Optional
              </span>
            </div>
            
            <div className="relative flex items-stretch group">
              <div className="flex items-center px-4 bg-stone-100 border-2 border-transparent rounded-l-2xl text-stone-500 font-bold text-sm border-r-stone-200">
                /
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="summer-sale-2026"
                className="flex-1 px-4 py-4 bg-stone-50 text-stone-900 rounded-r-2xl border-2 border-transparent focus:bg-white focus:border-stone-900 focus:ring-4 focus:ring-stone-900/10 outline-none transition-all font-bold placeholder:text-stone-300 font-mono"
                data-testid="custom-code-input"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none group-focus-within:text-stone-900 transition-colors">
                <Link2 size={20} />
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2 ml-1 font-medium">
              Leave empty to generate a random string
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-stone-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-xl shadow-stone-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            data-testid="shorten-button"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                Shorten URL <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default URLForm;