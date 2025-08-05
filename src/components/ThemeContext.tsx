import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Theme = {
  name: string;
  label: string;
};

type ThemeContextType = {
  theme: string;
  themes: Theme[];
  changeTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with a function to check localStorage safely
  const [theme, setTheme] = useState<string>(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme || 'dark'; // Default to 'dark' if no saved theme
    }
    return 'dark'; // Server-side fallback
  });

  const themes: Theme[] = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'sakura', label: 'Sakura' },
  ];

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const html = document.documentElement;

    // 1. Remove all existing theme classes
    themes.forEach((t) => {
      html.classList.remove(`theme-${t.name}`);
    });

    // 2. Add current theme class
    html.classList.add(`theme-${theme}`);
    // html.classList.add('theme-transition');

    // 3. Persist to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }
  }, [theme]); // Only re-run when theme changes

  const changeTheme = (themeName: string) => {
    // Validate the theme exists before setting
    if (themes.some((t) => t.name === themeName)) {
      setTheme(themeName);
    } else {
      console.warn(`Attempted to set invalid theme: ${themeName}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
