import React from 'react';
import { Logo } from '../shared/Logo';

export interface HeaderProps {
  /** Current user name */
  userName?: string;
  /** User avatar URL */
  userAvatar?: string;
  /** Whether dark mode is active */
  darkMode?: boolean;
  /** Callback for dark mode toggle */
  onDarkModeToggle?: () => void;
  /** Callback for menu toggle (mobile) */
  onMenuToggle?: () => void;
  /** Callback for profile click */
  onProfileClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Header Component
 * 
 * Main application header with TalkON logo, navigation, and user actions.
 * Responsive design that adapts to mobile and desktop layouts.
 */
export const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatar,
  darkMode = false,
  onDarkModeToggle,
  onMenuToggle,
  onProfileClick,
  className = '',
}) => {
  return (
    <header
      className={`talkon-header ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        backgroundColor: darkMode ? '#1a1a2e' : '#ffffff',
        borderBottom: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section: Menu Button + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: darkMode ? '#ffffff' : '#1a1a2e',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo variant="full" size="small" dark={darkMode} />
        </a>
      </div>

      {/* Center Section: Navigation (desktop only) */}
      <nav
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '32px',
          '@media (min-width: 768px)': {
            display: 'flex',
          },
        } as React.CSSProperties}
      >
        {['Chats', 'Contacts', 'Status', 'Calls'].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            style={{
              textDecoration: 'none',
              color: darkMode ? '#8E8E93' : '#6e6e73',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#1a1a2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#8E8E93' : '#6e6e73';
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right Section: Actions + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Dark Mode Toggle */}
        {onDarkModeToggle && (
          <button
            onClick={onDarkModeToggle}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: darkMode ? '#2d2d44' : '#f5f5f7',
              cursor: 'pointer',
              color: darkMode ? '#ffffff' : '#1a1a2e',
            }}
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        )}

        {/* User Profile */}
        {userName && (
          <button
            onClick={onProfileClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px 6px 6px',
              border: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
              borderRadius: '24px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode ? '#2d2d44' : '#f5f5f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0066FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: darkMode ? '#ffffff' : '#1a1a2e',
              }}
            >
              {userName}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
