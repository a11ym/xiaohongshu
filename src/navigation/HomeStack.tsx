import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../pages/Index';
import Detail from '../pages/Detail';
import Search from '../pages/Search';
import Settings from '../pages/Settings'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import General from '../pages/Settings/page/General';
import DarkMode from '../pages/Settings/page/DarkMode';
import WebView from '../pages/WebView';
import TextView from '../pages/TextView';
import Chat from '../pages/Chat';
import { useAuth } from '../contexts/AuthContext';
import { Data } from '../pages/Home/Data';

export type HomeStackParamList = {
  Index: undefined;
  Detail: { item: Data };
  Search: undefined;
  Settings: undefined;
  General: undefined;
  DarkMode: undefined;
  WebView: { url: string };
  TextView: { text: string };
  Chat: undefined;
  SignIn: undefined;
  SignUp: undefined;
}


const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const { isSignedIn, isLoading } = useAuth()
  //如果正在加载，则显示加载指示器
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? 'Index' : 'SignIn'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        isSignedIn ? (
          <>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Detail" component={Detail}
              options={{
                // animation: 'slide_from_right',
                animation: 'none',
                presentation: 'transparentModal'
              }}
            />
            <Stack.Group screenOptions={{ animation: 'none' }}>
              <Stack.Screen name="Search" component={Search} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
              <Stack.Screen name="TextView" component={TextView} />
            </Stack.Group>
            <Stack.Screen name="Settings"
              options={{
                headerTitle: '设置'
              }}
              component={Settings}
            />
            <Stack.Screen name="General" component={General} />
            <Stack.Screen name="DarkMode" component={DarkMode} />
            <Stack.Screen name="WebView" component={WebView} />
            <Stack.Screen name="Chat" component={Chat} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )
      }

    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
