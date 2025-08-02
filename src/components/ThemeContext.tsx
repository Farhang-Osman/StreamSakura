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
  const [theme, setTheme] = useState<string>('light');

  const themes: Theme[] = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'blue', label: 'Ocean' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && themes.some((t) => t.name === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    // Remove all existing theme classes
    themes.forEach((t) => html.classList.remove(`theme-${t.name}`));

    // Add current theme class
    html.classList.add(`theme-${theme}`);
    // html.classList.add('theme-transition');

    // Persist to localStorage
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
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
