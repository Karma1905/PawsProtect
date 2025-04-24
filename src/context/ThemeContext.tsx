import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark';  // Only support dark theme

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set default theme to dark
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('paws_protect_theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Default to dark theme
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('paws_protect_theme', theme);
    
    // Apply dark class on document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  // Listen for system theme changes, but only apply dark theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (!localStorage.getItem('paws_protect_theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'dark');  // Only keep dark
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Only toggle to dark theme (no light theme support)
  const toggleTheme = () => {
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
