import React, { useState } from 'react';
import { Logo } from '../shared/Logo';

export interface LoginPageProps {
  /** Callback for phone number submission */
  onSubmit?: (phoneNumber: string) => void;
  /** Loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string | null;
  /** Whether dark mode is active */
  darkMode?: boolean;
  /** Company/brand name */
  brandName?: string;
  /** Tagline text */
  tagline?: string;
}

/**
 * LoginPage Component
 * 
 * Authentication page featuring the TalkON logo prominently.
 * Includes phone number input for OTP-based authentication.
 */
export const LoginPage: React.FC<LoginPageProps> = ({
  onSubmit,
  loading = false,
  error = null,
  darkMode = false,
  brandName = 'TalkON',
  tagline = 'Stay connected. Anytime, anywhere.',
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validatePhoneNumber = (value: string) => {
    // Basic phone number validation (adjust as needed)
    const cleaned = value.replace(/\D/g, '');
    setIsValid(cleaned.length >= 10);
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = validatePhoneNumber(value);
    setPhoneNumber(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(phoneNumber);
    }
  };

  return (
    <div
      className="talkon-login-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkMode ? '#1a1a2e' : '#f5f5f7',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: darkMode ? '#242438' : '#ffffff',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: darkMode
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <Logo variant="icon" size="large" dark={darkMode} />
          <div style={{ marginTop: '24px' }}>
            <Logo variant="text" size="medium" dark={darkMode} />
          </div>
          <p
            style={{
              marginTop: '12px',
              fontSize: '16px',
              color: darkMode ? '#8E8E93' : '#6e6e73',
              textAlign: 'center',
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Phone Input */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="phone"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: darkMode ? '#ffffff' : '#1a1a2e',
              }}
            >
              Phone Number
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${error ? '#ff3b30' : darkMode ? '#2d2d44' : '#e5e5e7'}`,
                borderRadius: '12px',
                backgroundColor: darkMode ? '#1a1a2e' : '#f5f5f7',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  padding: '14px 16px',
                  fontSize: '16px',
                  color: darkMode ? '#8E8E93' : '#6e6e73',
                  borderRight: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
                  fontWeight: 500,
                }}
              >
                +1
              </span>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  color: darkMode ? '#ffffff' : '#1a1a2e',
                  outline: 'none',
                }}
              />
            </div>
            {error && (
              <p
                style={{
                  marginTop: '8px',
                  fontSize: '13px',
                  color: '#ff3b30',
                }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            style={{
              width: '100%',
              padding: '16px',
              border: 'none',
              borderRadius: '12px',
              background: isValid && !loading
                ? 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)'
                : darkMode ? '#2d2d44' : '#e5e5e7',
              color: isValid && !loading ? '#ffffff' : darkMode ? '#8E8E93' : '#999999',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isValid && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <style>{`
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                  <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
                Sending code...
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '24px 0',
            color: darkMode ? '#8E8E93' : '#6e6e73',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: darkMode ? '#2d2d44' : '#e5e5e7' }} />
          <span style={{ padding: '0 16px', fontSize: '13px' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: darkMode ? '#2d2d44' : '#e5e5e7' }} />
        </div>

        {/* QR Code Option */}
        <button
          style={{
            width: '100%',
            padding: '14px',
            border: `1px solid ${darkMode ? '#2d2d44' : '#e5e5e7'}`,
            borderRadius: '12px',
            backgroundColor: 'transparent',
            color: darkMode ? '#ffffff' : '#1a1a2e',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = darkMode ? '#2d2d44' : '#f5f5f7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Log in with QR code
        </button>

        {/* Terms */}
        <p
          style={{
            marginTop: '24px',
            fontSize: '12px',
            color: darkMode ? '#8E8E93' : '#6e6e73',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          By continuing, you agree to {brandName}'s{' '}
          <a href="#" style={{ color: '#0066FF', textDecoration: 'none' }}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" style={{ color: '#0066FF', textDecoration: 'none' }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Background Decoration */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #0066FF20 0%, #00D4FF20 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '10%',
          width: '250px',
          height: '250px',
          background: 'linear-gradient(135deg, #00CC8820 0%, #FF950020 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default LoginPage;
