/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import DrawerNavigator from './app/navigation/DrawerNavigator';
import { StatusBar } from 'react-native';
import { useTheme } from './app/hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { AuthProvider } from './app/contexts/AuthContext';
function App() {
  const navigationRef = useNavigationContainerRef();
  const { isDarkMode } = useTheme();

  return (
    <AuthProvider>

      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <DrawerNavigator />
        </NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
