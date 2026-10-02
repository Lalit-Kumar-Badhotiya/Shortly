import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7]">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <p className="mt-4 text-stone-400 font-medium text-sm animate-pulse">
          Verifying access...
        </p>
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;