import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import { OpenAI } from 'openai';
import Sound from 'react-native-sound';

const AiTalk = () => {
  const [isListening, setIsListening] = useState(false);
  const [userText, setUserText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([]);
  
  // OpenAI konfigürasyonu
  const openai = new OpenAI({
    apiKey: 'OPENAI_API_KEY', // Kendi API anahtarınızı ekleyin
    dangerouslyAllowBrowser: true // React Native için gerekli
  });

  // Ses tanıma başlatma
  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
      setUserText('');
    } catch (error) {
      console.error('Ses tanıma hatası:', error);
    }
  };

  // Ses tanımayı durdurma
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      processUserInput();
    } catch (error) {
      console.error('Durdurma hatası:', error);
    }
  };

  // AI'dan yanıt alma
  const getAIResponse = async (text: string) => {
    setIsProcessing(true);
    
    try {
      const updatedConversation = [
        ...conversation,
        { role: 'user', content: text }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful English tutor. Respond in English and keep responses under 2 sentences.' },
          ...updatedConversation
        ],
        max_tokens: 100,
      });

      const response = completion.choices[0]?.message?.content || "I didn't understand that.";
      setAiResponse(response);
      
      // AI yanıtını seslendirme
      textToSpeech(response);
      
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: response }
      ]);
    } catch (error) {
      console.error('AI hatası:', error);
      Alert.alert('Error', 'Failed to get AI response');
    } finally {
      setIsProcessing(false);
    }
  };

  // Metni sese çevirme
  const textToSpeech = (text: string) => {
    // Bu kısımda bir TTS API'si kullanılabilir (Google TTS, Azure Speech, vb.)
    // Örnek olarak:
    console.log("Playing:", text);
    // Gerçek implementasyon için bir TTS servisi entegre edilmeli
  };

  // Kullanıcı girdisini işleme
  const processUserInput = () => {
    if (userText.trim().length > 0) {
      getAIResponse(userText);
    }
  };

  // Ses tanıma event handler'ları
  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      setUserText(e.value?.[0] || '');
    };

    Voice.onSpeechError = (e) => {
      console.error('Ses hatası:', e.error);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI English Tutor</Text>
      
      <View style={styles.conversationContainer}>
        {conversation.map((msg, index) => (
          <View key={index} style={msg.role === 'user' ? styles.userBubble : styles.aiBubble}>
            <Text style={msg.role === 'user' ? styles.userText : styles.aiText}>
              {msg.content}
            </Text>
          </View>
        ))}
      </View>

      {isProcessing && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.inputContainer}>
        <Text style={styles.userInput}>{userText}</Text>
        
        <TouchableOpacity
          style={[styles.button, isListening && styles.listeningButton]}
          onPress={isListening ? stopListening : startListening}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>
            {isListening ? 'Stop Speaking' : 'Start Speaking'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 20,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf8cb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  userText: {
    color: '#333',
  },
  aiText: {
    color: '#333',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginTop: 20,
  },
  userInput: {
    minHeight: 40,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  listeningButton: {
    backgroundColor: '#db4437',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AiTalk;