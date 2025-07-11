import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz!</Text>
      <Button title="Çıkış Yap" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default MainPage; 