import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const user = auth().currentUser;

const ProfileScreen = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Çıkış Hatası', 'Çıkış yapılamadı.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Kullanıcı Adı:</Text>
        <Text style={styles.value}>{user?.displayName || '-'}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || '-'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD600',
    marginBottom: 32,
    letterSpacing: 1,
  },
  infoBox: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    width: '100%',
    maxWidth: 350,
  },
  label: {
    color: '#FFD600',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FFD600',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default ProfileScreen; 