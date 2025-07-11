import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tema</Text>
        <Text style={styles.cardContent}>Sarı & Siyah (Değiştirilemez)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bildirimler</Text>
        <Text style={styles.cardContent}>Tüm bildirimler açık (dummy)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD600',
    marginBottom: 32,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    color: '#FFD600',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  cardContent: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen; 