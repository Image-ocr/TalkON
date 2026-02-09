import React from 'react';
import { Logo } from '../shared/Logo';

export interface SidebarProps {
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Whether dark mode is active */
  darkMode?: boolean;
  /** Currently active item */
  activeItem?: string;
  /** Callback when item is clicked */
  onItemClick?: (item: string) => void;
  /** Callback for collapse toggle */
  onCollapseToggle?: () => void;
  /** Additional CSS classes */
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'chats',
    label: 'Chats',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'status',
    label: 'Status',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'calls',
    label: 'Calls',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m4.22-12.22l4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1m20.24 4.24l-4.24-4.24M6.34 6.34L2.1 2.1" />
      </svg>
    ),
  },
];

/**
 * Sidebar Component
 * 
 * Navigation sidebar with TalkON branding and main navigation items.
 * Supports collapsed state for space-constrained views.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  darkMode = false,
  activeItem = 'chats',
  onItemClick,
  onCollapseToggle,
  className = '',
}) => {
  return (
    <aside
      className={`talkon-sidebar ${className}`}
      style={{
        width: collapsed ? '72px' : '260px',
        height: '100vh',
        backgroundColor: darkMode ? '#1a1a2e' : '#ffffff',
        borderRight: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: collapsed ? '20px 16px' : '20px 24px',
          borderBottom: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        {collapsed ? (
          <Logo variant="icon" size="small" dark={darkMode} />
        ) : (
          <Logo variant="full" size="small" dark={darkMode} />
        )}
      </div>

      {/* Navigation Items */}
      <nav
        style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '12px' : '12px 16px',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: isActive
                  ? darkMode
                    ? 'rgba(0, 102, 255, 0.2)'
                    : 'rgba(0, 102, 255, 0.1)'
                  : 'transparent',
                color: isActive
                  ? darkMode
                    ? '#4DD9FF'
                    : '#0066FF'
                  : darkMode
                  ? '#8E8E93'
                  : '#6e6e73',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = darkMode ? '#2d2d44' : '#f5f5f7';
                  e.currentTarget.style.color = darkMode ? '#ffffff' : '#1a1a2e';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = darkMode ? '#8E8E93' : '#6e6e73';
                }
              }}
            >
              {item.icon}
              {!collapsed && (
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        style={{
          padding: '16px',
          borderTop: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
        }}
      >
        <button
          onClick={onCollapseToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            border: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
            borderRadius: '8px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            color: darkMode ? '#8E8E93' : '#6e6e73',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
          {!collapsed && <span style={{ fontSize: '13px', fontWeight: 500 }}>Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
