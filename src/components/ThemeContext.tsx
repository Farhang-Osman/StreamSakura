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

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light');

  const themes: Theme[] = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'blue', label: 'Ocean' },
    { name: 'rose', label: 'Rose' },
    { name: 'emerald', label: 'Emerald' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);
  }, []);

  const changeTheme = (themeName: string) => {
    const htmlClassList = document.documentElement.classList;

    // Remove all theme classes
    Array.from(htmlClassList)
      .filter((className) => className.startsWith('theme-'))
      .forEach((className) => htmlClassList.remove(className));

    // Add new theme class
    htmlClassList.add(`theme-${themeName}`);
    htmlClassList.add('theme-transition');

    setTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
