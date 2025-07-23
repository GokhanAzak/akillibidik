// StoriesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';
import { FirebaseError } from '@react-native-firebase/app';

type Story = {
  id: string;
  title: string;
  order: number;
  level: string;
  content: string;
};

const StoriesScreen = ({ navigation }: { navigation: any }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      console.log('Hikayeler çekiliyor...');
      setLoading(true);
      setError(null);

      try {
        const db = getFirestore();
        const storiesRef = collection(db, 'stories');
        const querySnapshot = await getDocs(storiesRef);

        console.log(`Toplam ${querySnapshot.size} hikaye bulundu`);

        if (querySnapshot.empty) {
          console.warn('Uyarı: Hikaye koleksiyonu boş!');
          setError('Henüz hiç hikaye eklenmemiş');
          return;
        }

        const fetchedStories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Story, 'id'>
        })).sort((a, b) => a.order - b.order);

        setStories(fetchedStories);

      } catch (error) {
        console.error('Hikayeler çekilirken hata:', error);
        
        let errorMessage = 'Hikayeler yüklenirken bir hata oluştu';
        if (error instanceof FirebaseError) {
          errorMessage = `Firebase Hatası: ${error.code}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        Alert.alert('Hata', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryPress = (story: Story) => {
    navigation.navigate('StoryDetail', {
      storyId: story.id,
      title: story.title,
      content: story.content,
      level: story.level
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hikayeler</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#FFD600" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.storiesContainer}>
          {stories.map(story => (
            <TouchableOpacity
              key={story.id}
              style={[styles.storyButton, { backgroundColor: getLevelColor(story.level) }]}
              onPress={() => handleStoryPress(story)}
            >
              <Text style={styles.storyButtonText}>
                {story.order}. {story.title}
              </Text>
              <Text style={styles.levelBadge}>{story.level}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Seviyelere göre renk döndürür
const getLevelColor = (level: string) => {
  const colors = {
    'A1': '#4CAF50',
    'A2': '#8BC34A',
    'B1': '#FFC107',
    'B2': '#FF9800',
    'C1': '#FF5722',
    'C2': '#F44336'
  };
  return colors[level as keyof typeof colors] || '#607D8B';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD600',
    marginBottom: 20,
    textAlign: 'center',
  },
  storiesContainer: {
    paddingBottom: 20,
  },
  storyButton: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  storyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    flex: 1,
  },
  levelBadge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorContainer: {
    backgroundColor: '#B00020',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default StoriesScreen;