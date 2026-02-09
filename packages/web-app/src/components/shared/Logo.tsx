import React from 'react';

export interface LogoProps {
  /** Logo variant to display */
  variant?: 'full' | 'icon' | 'text';
  /** Size of the logo */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Use dark mode version */
  dark?: boolean;
  /** Use monochrome version */
  monochrome?: 'black' | 'white' | null;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const sizeMap = {
  small: { width: 80, height: 24 },
  medium: { width: 120, height: 36 },
  large: { width: 200, height: 60 },
  xlarge: { width: 300, height: 90 },
};

const iconSizeMap = {
  small: { width: 32, height: 32 },
  medium: { width: 48, height: 48 },
  large: { width: 80, height: 80 },
  xlarge: { width: 120, height: 120 },
};

/**
 * TalkON Logo Component
 * 
 * Renders the TalkON logo in various configurations.
 * Supports full logo (icon + text), icon only, and text only variants.
 * Includes dark mode and monochrome versions.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'medium',
  dark = false,
  monochrome = null,
  className = '',
  onClick,
}) => {
  const dimensions = variant === 'icon' ? iconSizeMap[size] : sizeMap[size];
  
  const getLogoColor = () => {
    if (monochrome === 'black') return '#1a1a2e';
    if (monochrome === 'white') return '#ffffff';
    return dark ? '#ffffff' : '#1a1a2e';
  };

  const getAccentColor = () => {
    if (monochrome === 'black' || monochrome === 'white') return getLogoColor();
    return dark ? '#00E699' : '#00CC88';
  };

  const getHighlightColor = () => {
    if (monochrome === 'black' || monochrome === 'white') return getLogoColor();
    return dark ? '#FFB84D' : '#FF9500';
  };

  const getBubbleGradient = () => {
    if (monochrome === 'black') return '#1a1a2e';
    if (monochrome === 'white') return '#ffffff';
    return dark ? 'url(#bubbleGradientDark)' : 'url(#bubbleGradient)';
  };

  const getOnlineIndicatorColor = () => {
    if (monochrome === 'black' || monochrome === 'white') return getLogoColor();
    return dark ? '#00E699' : '#00CC88';
  };

  if (variant === 'icon') {
    return (
      <svg
        {...dimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`talkon-logo-icon ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <defs>
          <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
          <linearGradient id="bubbleGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3385FF" />
            <stop offset="100%" stopColor="#4DD9FF" />
          </linearGradient>
        </defs>
        
        {/* Chat Bubble */}
        <g transform="translate(10, 8)">
          <path
            d="M40 0C17.9 0 0 17.9 0 40c0 7.5 2.1 14.5 5.8 20.5L2 72l14.5-3.5C23.5 73.5 31.3 76 40 76c22.1 0 40-17.9 40-40S62.1 0 40 0z"
            fill={getBubbleGradient()}
          />
          <ellipse cx="28" cy="28" rx="12" ry="8" fill="white" opacity={monochrome ? 0 : 0.3} />
          <circle cx="28" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <circle cx="40" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <circle cx="52" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <circle
            cx="70"
            cy="65"
            r="10"
            fill={getOnlineIndicatorColor()}
            stroke={monochrome ? 'none' : 'white'}
            strokeWidth={monochrome ? 0 : 3}
          />
        </g>
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <svg
        {...dimensions}
        viewBox="0 0 300 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`talkon-logo-text ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <text
          x="20"
          y="55"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="56"
          fontWeight="700"
          fill={getLogoColor()}
          letterSpacing="-1"
        >
          Talk
        </text>
        <text
          x="150"
          y="55"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="56"
          fontWeight="800"
          fill={getAccentColor()}
          letterSpacing="-1"
        >
          ON
        </text>
        <circle cx="240" cy="25" r="8" fill={getHighlightColor()} />
      </svg>
    );
  }

  // Full logo (default)
  return (
    <svg
      {...dimensions}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`talkon-logo-full ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <defs>
        <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient id="bubbleGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3385FF" />
          <stop offset="100%" stopColor="#4DD9FF" />
        </linearGradient>
      </defs>

      {/* Icon */}
      <g transform="translate(20, 20)">
        <path
          d="M40 0C17.9 0 0 17.9 0 40c0 7.5 2.1 14.5 5.8 20.5L2 72l14.5-3.5C23.5 73.5 31.3 76 40 76c22.1 0 40-17.9 40-40S62.1 0 40 0z"
          fill={getBubbleGradient()}
        />
        <ellipse cx="28" cy="28" rx="12" ry="8" fill="white" opacity={monochrome ? 0 : 0.3} />
        <circle cx="28" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
        <circle cx="40" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
        <circle cx="52" cy="42" r="4" fill={monochrome ? getLogoColor() : 'white'} />
        <circle
          cx="70"
          cy="65"
          r="10"
          fill={getOnlineIndicatorColor()}
          stroke={monochrome ? 'none' : 'white'}
          strokeWidth={monochrome ? 0 : 3}
        />
      </g>

      {/* Text */}
      <g transform="translate(110, 35)">
        <text
          x="0"
          y="42"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="48"
          fontWeight="700"
          fill={getLogoColor()}
          letterSpacing="-1"
        >
          Talk
        </text>
        <text
          x="115"
          y="42"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="48"
          fontWeight="800"
          fill={getAccentColor()}
          letterSpacing="-1"
        >
          ON
        </text>
        <circle cx="195" cy="18" r="6" fill={getHighlightColor()} />
      </g>
    </svg>
  );
};

export default Logo;
