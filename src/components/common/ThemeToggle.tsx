import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { ThemeToggleButton, useThemeTransition } from '@/components/ui/theme-toggle-button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : (theme as 'light' | 'dark');

  return (
    <ThemeToggleButton
      theme={currentTheme}
      onClick={handleThemeToggle}
      variant="polygon"
      start="center"
    />
  );
};

