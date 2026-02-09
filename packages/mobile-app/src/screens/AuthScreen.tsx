import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Logo } from '../components/Logo';

export interface AuthScreenProps {
  /** Callback when phone number is submitted */
  onSubmitPhone?: (phoneNumber: string) => void;
  /** Callback for QR code login */
  onQRLogin?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Theme - 'light' or 'dark' */
  theme?: 'light' | 'dark';
}

/**
 * AuthScreen Component
 *
 * Mobile authentication screen with TalkON branding.
 * Features phone number input for OTP-based authentication.
 */
export const AuthScreen: React.FC<AuthScreenProps> = ({
  onSubmitPhone,
  onQRLogin,
  loading = false,
  error = null,
  theme = 'light',
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const isDark = theme === 'dark';

  const validatePhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setIsValid(cleaned.length >= 10);
    return cleaned;
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = validatePhoneNumber(text);
    setPhoneNumber(cleaned);
  };

  const handleSubmit = () => {
    if (isValid && onSubmitPhone) {
      onSubmitPhone(phoneNumber);
    }
  };

  const formatPhoneDisplay = (value: string) => {
    if (value.length === 0) return '';
    if (value.length <= 3) return `(${value}`;
    if (value.length <= 6) return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1a1a2e' : '#f5f5f7' },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Logo variant="icon" size="xlarge" dark={isDark} />
            <View style={styles.textLogoContainer}>
              <Logo variant="text" size="medium" dark={isDark} />
            </View>
            <Text
              style={[
                styles.tagline,
                { color: isDark ? '#8E8E93' : '#6e6e73' },
              ]}
            >
              Stay connected. Anytime, anywhere.
            </Text>
          </View>

          {/* Form Section */}
          <View
            style={[
              styles.formContainer,
              {
                backgroundColor: isDark ? '#242438' : '#ffffff',
                shadowColor: isDark ? '#000000' : '#000000',
              },
            ]}
          >
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: isDark ? '#ffffff' : '#1a1a2e' },
                ]}
              >
                Phone Number
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderColor: error
                      ? '#ff3b30'
                      : isDark
                      ? '#2d2d44'
                      : '#e5e5e7',
                    backgroundColor: isDark ? '#1a1a2e' : '#f5f5f7',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countryCode,
                    { color: isDark ? '#8E8E93' : '#6e6e73' },
                  ]}
                >
                  +1
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: isDark ? '#ffffff' : '#1a1a2e' },
                  ]}
                  value={formatPhoneDisplay(phoneNumber)}
                  onChangeText={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  placeholderTextColor={isDark ? '#8E8E93' : '#999999'}
                  keyboardType="phone-pad"
                  maxLength={14}
                  editable={!loading}
                />
              </View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor:
                    isValid && !loading
                      ? '#0066FF'
                      : isDark
                      ? '#2d2d44'
                      : '#e5e5e7',
                },
              ]}
              onPress={handleSubmit}
              disabled={!isValid || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  style={[
                    styles.submitButtonText,
                    {
                      color:
                        isValid && !loading
                          ? '#ffffff'
                          : isDark
                          ? '#8E8E93'
                          : '#999999',
                    },
                  ]}
                >
                  Continue
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? '#2d2d44' : '#e5e5e7' },
                ]}
              />
              <Text
                style={[
                  styles.dividerText,
                  { color: isDark ? '#8E8E93' : '#6e6e73' },
                ]}
              >
                or
              </Text>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? '#2d2d44' : '#e5e5e7' },
                ]}
              />
            </View>

            {/* QR Code Button */}
            <TouchableOpacity
              style={[
                styles.qrButton,
                {
                  borderColor: isDark ? '#2d2d44' : '#e5e5e7',
                },
              ]}
              onPress={onQRLogin}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.qrButtonText,
                  { color: isDark ? '#ffffff' : '#1a1a2e' },
                ]}
              >
                Log in with QR code
              </Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text
              style={[
                styles.termsText,
                { color: isDark ? '#8E8E93' : '#6e6e73' },
              ]}
            >
              By continuing, you agree to TalkON's{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textLogoContainer: {
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 24,
    padding: 32,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 13,
    marginTop: 8,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
  },
  qrButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  qrButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: '#0066FF',
  },
});

export default AuthScreen;
