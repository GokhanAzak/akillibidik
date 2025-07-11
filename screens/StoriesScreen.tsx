import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const stories = [
  {
    title: 'Yapay Zeka ile Oluşturulan Hikaye 1',
    content: 'Bir zamanlar sarı bir şehirde, geceleri yıldızlar kadar parlak hayaller kuran bir çocuk yaşardı...'
  },
  {
    title: 'Yapay Zeka ile Oluşturulan Hikaye 2',
    content: 'Karanlık bir ormanda, cesur bir robot yeni dostluklar arıyordu...'
  },
  {
    title: 'Yapay Zeka ile Oluşturulan Hikaye 3',
    content: 'Geleceğin dünyasında, insanlar ve makineler birlikte barış içinde yaşardı...'
  },
];

const StoriesScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Hikayeler</Text>
      {stories.map((story, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardTitle}>{story.title}</Text>
          <Text style={styles.cardContent}>{story.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
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

export default StoriesScreen; 