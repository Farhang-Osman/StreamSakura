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
  const [theme, setTheme] = useState<string>(() => {
    // Initialize theme from localStorage or use default
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme || 'light';
    }
    return 'light';
  });

  const themes: Theme[] = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'blue', label: 'Ocean' },
    { name: 'rose', label: 'Rose' },
    { name: 'emerald', label: 'Emerald' },
  ];

  useEffect(() => {
    // Apply the theme class on initial load and when theme changes
    const htmlClassList = document.documentElement.classList;

    // Remove all theme classes
    themes.forEach((t) => {
      htmlClassList.remove(`theme-${t.name}`);
    });

    // Add current theme class
    htmlClassList.add(`theme-${theme}`);
    // htmlClassList.add('theme-transition');

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
