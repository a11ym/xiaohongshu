/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { useTheme } from './src/hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import BootSplash from 'react-native-bootsplash';
import React from 'react';
const linking = {
  prefixes: [],
  config: {
    screens: {
    },
  },
}
export default function App() {
  const navigationRef = useNavigationContainerRef();
  // console.log("🚀 ~ App ~ navigationRef:", navigationRef)
  const { isDarkMode } = useTheme();
  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await BootSplash.hide({ fade: true });
  //     console.log("BootSplash has been hidden successfully");
  //   });
  // }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}
          ref={navigationRef}
          linking={linking}>
          <AuthProvider>
            <DrawerNavigator />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


