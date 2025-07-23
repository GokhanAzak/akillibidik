// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAuth, signInWithCredential, GoogleAuthProvider } from '@react-native-firebase/auth'; // auth ve GoogleAuthProvider'ı import et

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Yeni bir state ekleyelim

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '236863152841-qqipoe2s8nu6nbr52o6932aa9qkbl1gm.apps.googleusercontent.com', // Kendi Web client ID'nizi girin
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth(); // auth nesnesini al
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      let message = 'Bilinmeyen bir hata oluştu.';
      if (error && typeof error === 'object') {
        if (error.message) {
          message = error.message;
        } else if (typeof error.toString === 'function') {
          message = error.toString();
        }
      }
      Alert.alert('Giriş Hatası', message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true); // Yüklenme durumunu başlat
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      // idToken'ı getTokens ile al
      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken) throw new Error('Google kimlik belirteci alınamadı.');
      const googleCredential = GoogleAuthProvider.credential(idToken); // auth.GoogleAuthProvider yerine doğrudan GoogleAuthProvider kullan
      await signInWithCredential(getAuth(), googleCredential);

      
      
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      let message = 'Google ile giriş başarısız.';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        message = 'Google girişi iptal edildi.';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        message = 'Google girişi zaten devam ediyor.';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        message = 'Google Play Hizmetleri kullanılamıyor veya güncel değil.';
        message = 'Geçersiz hesap türü.'; // Bu hata bazen SHA-1 uyuşmazlığından da kaynaklanabilir.
      } else if (error && typeof error === 'object') {
        if (error.message) {
          message = error.message;
        } else if (error.code) {
          message = error.code;
        } else if (typeof error.toString === 'function') {
          message = error.toString();
        }
      }
      Alert.alert('Google Giriş Hatası', message);
    } finally {
      setGoogleLoading(false); // Yüklenme durumunu bitir
    }
  };

  return (
    <LinearGradient colors={['#232526', '#FFD600']} style={styles.gradient}>
      <View style={styles.container}>
        <Icon name="account-circle" size={64} color="#FFD600" style={styles.logoIcon} />
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Icon name="login" size={22} color="#111" style={{marginRight: 8}} />
              <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleLogin}
          disabled={googleLoading}
          activeOpacity={0.8}
        >
          {googleLoading ? (
            <ActivityIndicator color="#FFD600" />
          ) : (
            <View style={styles.buttonContent}>
              <Icon name="google" size={22} color="#EA4335" style={{marginRight: 8}} />
              <Text style={[styles.buttonText, { color: '#111' }]}>Google ile Giriş Yap</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
          <Text style={styles.linkText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoIcon: {
    marginBottom: 16,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD600',
    marginBottom: 32,
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'rgba(34,34,34,0.95)',
    color: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFD600',
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFD600',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFD600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  linkContainer: {
    marginTop: 8,
  },
  linkText: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default LoginScreen;