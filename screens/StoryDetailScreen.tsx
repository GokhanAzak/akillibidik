// StoryDetailScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
  storyId: string;
  title: string;
  content: string;
  level: string;
};

const StoryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, content, level } = route.params as RouteParams;

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(level) }]}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
      </View>

      {/* Story Content */}
      <ScrollView 
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.storyContent}>
          <Text style={styles.storyText}>{content}</Text>
        </View>
      </ScrollView>

      {/* Footer - Optional reading controls */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // Buraya hikayeyi favorilere ekleme işlemi eklenebilir
            console.log('Hikaye favorilere eklendi');
          }}
        >
          <Text style={styles.actionButtonText}>⭐ Favorilere Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backButtonText: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD600',
    flex: 1,
    marginRight: 12,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  levelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  storyContent: {
    padding: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E0E0E0',
    textAlign: 'justify',
    letterSpacing: 0.3,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StoryDetailScreen;