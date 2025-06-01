import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchUserData } from './authService';
import { UserData } from './userInfoInterface';

const clientId = import.meta.env.VITE_CLIENT_ID || 'default_client_id';
const redirectUri = import.meta.env.VITE_REDIRECT_URI || 'default_redirect_uri';

const buildAuthUrl = (csrfToken: string): string => {
  const scope = encodeURIComponent('');
  const state = encodeURIComponent(csrfToken);
  const encodedRedirectUri = encodeURIComponent(redirectUri);

  return `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodedRedirectUri}&state=${state}`;
};

type AuthConstextType = {
  isLoggedIn: boolean;
  userData: UserData | null;
  username: string | null;
  login: () => void;
};

const AuthConstext = createContext<AuthConstextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // Add a loading state for auth status

  const username = userData ? userData.name : null;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData(token)
        .then((data) => {
          setUserData(data);
          setIsLoggedIn(true);
          setAuthLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch user data:', err);
          setAuthLoading(false);
        });
    } else {
      setAuthLoading(false);
    }
  }, []);

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

  if (authLoading) {
    return null;
  }

  return (
    <AuthConstext.Provider value={{ isLoggedIn, userData, username, login }}>
      {children}
    </AuthConstext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthConstext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
