/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import ThemeView from './app/components/ThemeView'
import DrawerNavigator from './app/navigation/DrawerNavigator';
import { StatusBar } from 'react-native';
import { useTheme } from './app/hooks/useTheme';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
function App() {
  const navigationRef = useNavigationContainerRef();
  const { isDarkMode } = useTheme();
  

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaProvider>
  );
}

export default App;
