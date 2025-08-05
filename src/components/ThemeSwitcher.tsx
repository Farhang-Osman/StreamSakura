import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, themes, changeTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => changeTheme(e.target.value)}
      className='text-center cursor-pointer text2 bg2 label'
    >
      {themes.map((t) => (
        <option value={t.name} key={t.name}>
          {t.label}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
