import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  Stop,
  Path,
  Text as SvgText,
  Defs,
} from 'react-native-svg';

export interface LogoProps {
  /** Logo variant to display */
  variant?: 'full' | 'icon' | 'text';
  /** Size of the logo */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Use dark mode version */
  dark?: boolean;
  /** Use monochrome version */
  monochrome?: 'black' | 'white' | null;
  /** Additional styles */
  style?: any;
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
 * TalkON Logo Component for React Native
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
  style,
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

  const getOnlineIndicatorColor = () => {
    if (monochrome === 'black' || monochrome === 'white') return getLogoColor();
    return dark ? '#00E699' : '#00CC88';
  };

  if (variant === 'icon') {
    return (
      <View style={[{ width: dimensions.width, height: dimensions.height }, style]}>
        <Svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 100 100"
        >
          <Defs>
            <LinearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#0066FF" />
              <Stop offset="100%" stopColor="#00D4FF" />
            </LinearGradient>
            <LinearGradient id="bubbleGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#3385FF" />
              <Stop offset="100%" stopColor="#4DD9FF" />
            </LinearGradient>
          </Defs>

          {/* Chat Bubble */}
          <G>
            <Path
              d="M40 0C17.9 0 0 17.9 0 40c0 7.5 2.1 14.5 5.8 20.5L2 72l14.5-3.5C23.5 73.5 31.3 76 40 76c22.1 0 40-17.9 40-40S62.1 0 40 0z"
              fill={monochrome ? getLogoColor() : dark ? 'url(#bubbleGradientDark)' : 'url(#bubbleGradient)'}
              x="10"
              y="8"
            />
            <Ellipse cx="38" cy="36" rx="12" ry="8" fill="white" opacity={monochrome ? 0 : 0.3} />
            <Circle cx="38" cy="50" r="4" fill={monochrome ? getLogoColor() : 'white'} />
            <Circle cx="50" cy="50" r="4" fill={monochrome ? getLogoColor() : 'white'} />
            <Circle cx="62" cy="50" r="4" fill={monochrome ? getLogoColor() : 'white'} />
            <Circle
              cx="80"
              cy="73"
              r="10"
              fill={getOnlineIndicatorColor()}
              stroke={monochrome ? 'none' : 'white'}
              strokeWidth={monochrome ? 0 : 3}
            />
          </G>
        </Svg>
      </View>
    );
  }

  if (variant === 'text') {
    return (
      <View style={[{ width: dimensions.width, height: dimensions.height }, style]}>
        <Svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 300 80"
        >
          <SvgText
            x="20"
            y="55"
            fontFamily="System"
            fontSize="56"
            fontWeight="700"
            fill={getLogoColor()}
          >
            Talk
          </SvgText>
          <SvgText
            x="150"
            y="55"
            fontFamily="System"
            fontSize="56"
            fontWeight="800"
            fill={getAccentColor()}
          >
            ON
          </SvgText>
          <Circle cx="240" cy="25" r="8" fill={getHighlightColor()} />
        </Svg>
      </View>
    );
  }

  // Full logo (default)
  return (
    <View style={[{ width: dimensions.width, height: dimensions.height }, style]}>
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 400 120"
      >
        <Defs>
          <LinearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0066FF" />
            <Stop offset="100%" stopColor="#00D4FF" />
          </LinearGradient>
          <LinearGradient id="bubbleGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3385FF" />
            <Stop offset="100%" stopColor="#4DD9FF" />
          </LinearGradient>
        </Defs>

        {/* Icon */}
        <G>
          <Path
            d="M40 0C17.9 0 0 17.9 0 40c0 7.5 2.1 14.5 5.8 20.5L2 72l14.5-3.5C23.5 73.5 31.3 76 40 76c22.1 0 40-17.9 40-40S62.1 0 40 0z"
            fill={monochrome ? getLogoColor() : dark ? 'url(#bubbleGradientDark)' : 'url(#bubbleGradient)'}
            x="20"
            y="20"
          />
          <Ellipse cx="48" cy="48" rx="12" ry="8" fill="white" opacity={monochrome ? 0 : 0.3} />
          <Circle cx="48" cy="62" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <Circle cx="60" cy="62" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <Circle cx="72" cy="62" r="4" fill={monochrome ? getLogoColor() : 'white'} />
          <Circle
            cx="90"
            cy="85"
            r="10"
            fill={getOnlineIndicatorColor()}
            stroke={monochrome ? 'none' : 'white'}
            strokeWidth={monochrome ? 0 : 3}
          />
        </G>

        {/* Text */}
        <G>
          <SvgText
            x="110"
            y="77"
            fontFamily="System"
            fontSize="48"
            fontWeight="700"
            fill={getLogoColor()}
          >
            Talk
          </SvgText>
          <SvgText
            x="225"
            y="77"
            fontFamily="System"
            fontSize="48"
            fontWeight="800"
            fill={getAccentColor()}
          >
            ON
          </SvgText>
          <Circle cx="305" cy="53" r="6" fill={getHighlightColor()} />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logo;
