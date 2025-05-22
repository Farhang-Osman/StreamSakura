import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';

const clientId = import.meta.env.VITE_CLIENT_ID || 'default_client_id';
const redirectUri = import.meta.env.VITE_REDIRECT_URI || 'default_redirect_uri';

const buildAuthUrl = (csrfToken: string): string => {
  const scope = encodeURIComponent('');
  const state = encodeURIComponent(csrfToken);
  const encodedRedirectUri = encodeURIComponent(redirectUri);

  return `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodedRedirectUri}&state=${state}`;
};

type AuthConstextType = {
  login: () => void;
};

const AuthConstext = createContext<AuthConstextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const login = async () => {
    try {
      const response = await axios.get('/get-csrf-token');
      const csrfToken = response.data.csrfToken;
      const authUrl = buildAuthUrl(csrfToken);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error fetching CSRF token or building auth URL:', error);
    }
  };

  return (
    <AuthConstext.Provider value={{ login }}>{children}</AuthConstext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthConstext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
