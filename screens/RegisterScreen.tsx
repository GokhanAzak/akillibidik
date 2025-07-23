import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '236863152841-qqipoe2s8nu6nbr52o6932aa9qkbl1gm.apps.googleusercontent.com', // <-- Buraya kendi Web client ID'ni yaz!
    });
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Başarılı', 'Kayıt başarılı! Giriş yapabilirsiniz.');
      navigation.navigate('Login');
    } catch (error: any) {
      let message = 'Bilinmeyen bir hata oluştu.';
      if (error && typeof error === 'object') {
        if (error.message) {
          message = error.message;
        } else if (typeof error.toString === 'function') {
          message = error.toString();
        }
      }
      Alert.alert('Kayıt Hatası', message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken) {
        throw new Error('Google kimlik belirteci alınamadı.');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      let message = 'Google ile giriş başarısız.';
      if (error && typeof error === 'object') {
        if (error.message) {
          message = error.message;
        } else if (error.code) {
          message = error.code;
        } else if (typeof error.toString === 'function') {
          message = error.toString();
        }
      }
      Alert.alert('Google Giriş Hatası', message);
    }
  };

  return (
    <LinearGradient colors={['#232526', '#FFD600']} style={styles.gradient}>
    <View style={styles.container}>
        <Icon name="account-plus" size={64} color="#FFD600" style={styles.logoIcon} />
      <Text style={styles.title}>Kayıt Ol</Text>
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
        onPress={handleRegister}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
            <View style={styles.buttonContent}>
              <Icon name="account-plus" size={22} color="#111" style={{marginRight: 8}} />
          <Text style={styles.buttonText}>KAYIT OL</Text>
            </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.linkText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.button, styles.googleButton]}
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
      >
          <View style={styles.buttonContent}>
            <Icon name="google" size={22} color="#EA4335" style={{marginRight: 8}} />
        <Text style={[styles.buttonText, { color: '#111' }]}>Google ile Giriş Yap</Text>
          </View>
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

export default RegisterScreen; 