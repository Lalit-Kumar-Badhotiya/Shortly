import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleAuth } from '../services/authService';
import { GOOGLE_CLIENT_ID } from '../utils/constants';
import { Loader2 } from 'lucide-react';

// Renders the official "Continue with Google" button (Google Identity Services).
// Works for both sign-in and sign-up: the backend creates the account
// if the Google user doesn't exist yet.
const GoogleAuthButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // The credential callback lives in a ref so the GIS init effect
  // below can run exactly once without restart loops
  const handleCredentialResponseRef = useRef(null);
  handleCredentialResponseRef.current = async (response) => {
    setError('');
    setIsSigningIn(true);

    try {
      // credential is a Google ID token (JWT), verified on the backend
      const data = await googleAuth(response.credential);
      login(data.token, data.user || null);
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Google sign-in failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    let isCancelled = false;

    const renderButton = () => {
      if (!window.google?.accounts?.id) return false;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => handleCredentialResponseRef.current(response),
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: 320,
      });
      return true;
    };

    // The GIS script is loaded with `async defer`, so poll until it is ready
    let attempts = 0;
    const intervalId = setInterval(() => {
      if (isCancelled) return clearInterval(intervalId);

      if (renderButton()) {
        clearInterval(intervalId);
      } else if (++attempts > 40) {
        clearInterval(intervalId);
        console.warn('Google Identity Services failed to load');
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  // Don't render anything when Google sign-in isn't configured
  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div className="mt-8">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <span className="flex-1 h-px bg-stone-200" />
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          or
        </span>
        <span className="flex-1 h-px bg-stone-200" />
      </div>

      <div className="relative flex justify-center" data-testid="google-auth-button">
        <div ref={buttonRef} />

        {isSigningIn && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 size={20} className="text-blue-600 animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <p
          className="mt-4 text-center text-sm font-bold text-red-600"
          data-testid="google-error-message"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default GoogleAuthButton;
