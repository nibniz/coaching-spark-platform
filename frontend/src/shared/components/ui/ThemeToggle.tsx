import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Button } from './button';

interface ThemeToggleProps {
  variant?: 'default' | 'icon-only' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'default',
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === 'icon-only') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={`w-10 h-10 ${className}`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className={`gap-2 ${className}`}
      >
        {theme === 'light' ? (
          <>
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={`gap-2 ${className}`}
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-5 w-5" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span>Light Mode</span>
        </>
      )}
    </Button>
  );
};

// Switch-style toggle component
export const ThemeSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
      } ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
}; 