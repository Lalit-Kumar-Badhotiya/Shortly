import React, { useState } from 'react';
import { deleteUrl, updateUrl } from '../services/urlService';
import { API_BASE_URL } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Trash2, 
  Edit2, 
  ExternalLink, 
  Check, 
  X, 
  Save, 
  Globe 
} from 'lucide-react';

const URLCard = ({ url, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    shortCode: url.shortCode || '',
    target: url.target || '',
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortUrl = `${API_BASE_URL}/${url.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    
    setLoading(true);
    try {
      await deleteUrl(url.id);
      if (onDelete) onDelete(url.id);
    } catch (error) {
      alert('Failed to delete URL');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const result = await updateUrl(url.id, editData);
      if (onUpdate) onUpdate(result.data);
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, shadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm transition-all duration-300 group"
      data-testid="url-card"
    >
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div 
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header: Icon + Original URL */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 bg-stone-100 rounded-xl text-stone-600">
                  <Globe size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">Original Source</p>
                  <a 
                    href={url.target} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-stone-600 font-medium truncate hover:text-blue-600 transition-colors"
                    data-testid="original-url"
                  >
                    {url.target}
                  </a>
                </div>
              </div>
              
              {/* External Link Button */}
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Main Content: Short URL */}
            <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between group-hover:border-blue-200 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Short Link</p>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 text-sm">{API_BASE_URL.replace(/^https?:\/\//, '')}/</span>
                  <span className="font-bold text-blue-700 text-lg truncate">{url.shortCode}</span>
                </div>
              </div>
              
              <button
                onClick={handleCopy}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  copied 
                    ? 'bg-green-100 text-green-700 shadow-inner' 
                    : 'bg-white text-stone-500 hover:text-blue-600 hover:shadow-md shadow-sm'
                }`}
                data-testid="copy-button"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div className="text-xs text-stone-400 font-medium">
                 {/* You could add a timestamp here later */}
                 ID: {url.shortCode}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  data-testid="edit-button"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                  data-testid="delete-button"
                >
                  <Trash2 size={16} />
                  {loading ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- EDIT MODE --- */
          <motion.div 
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-800">Edit Link</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-md hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Short Code</label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-stone-100 border border-r-0 border-stone-200 rounded-l-xl text-stone-500 text-sm font-mono">/</span>
                  <input
                    type="text"
                    value={editData.shortCode}
                    onChange={(e) => setEditData({ ...editData, shortCode: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 text-stone-900 rounded-r-xl border border-stone-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-medium"
                    data-testid="edit-shortcode-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Destination URL</label>
                <input
                  type="url"
                  value={editData.target}
                  onChange={(e) => setEditData({ ...editData, target: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 text-stone-900 rounded-xl border border-stone-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  data-testid="edit-target-input"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all disabled:opacity-70"
                data-testid="save-button"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 bg-white border border-stone-200 text-stone-600 rounded-xl font-bold text-sm hover:bg-stone-50 hover:text-stone-900 transition-colors"
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default URLCard;