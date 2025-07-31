import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, themes, changeTheme } = useTheme();

  return (
    <div className='flex flex-wrap gap-2 p-4'>
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => changeTheme(t.name)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            theme === t.name
              ? 'bg-primary text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          aria-label={`Switch to ${t.label} theme`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
