/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StoriesScreen from './screens/StoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#FFD600',
      tabBarInactiveTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#111',
        borderTopColor: '#FFD600',
        borderTopWidth: 1,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName = 'home';
        if (route.name === 'Stories') iconName = 'book-open-page-variant';
        else if (route.name === 'Profile') iconName = 'account-circle';
        else if (route.name === 'Settings') iconName = 'cog';
        return <Icon name={iconName} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen name="Stories" component={StoriesScreen} options={{ title: 'Hikayeler' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user: User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
