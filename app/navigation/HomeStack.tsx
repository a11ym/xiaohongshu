import { ActivityIndicator, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../pages/Index';
import Detail from '../pages/Detail';
import Search from '../pages/Search';
import Settings from '../pages/Settings'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ScanScreen from '../pages/My/components/ScanScreen';
import General from '../pages/Settings/page/General';
import DarkMode from '../pages/Settings/page/DarkMode';
import WebView from '../pages/WebView';
import TextView from '../pages/TextView';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoding, setIsLoading] = useState(true)
  //检查用户是否登录
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token')
        if (token) {
          setIsSignedIn(!!token)//!!token将token转换为布尔值
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    checkSignInStatus()
  }, [])

  //如果正在加载，则显示加载指示器
  if (isLoding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  //处理登录
  const handleLogin = async (token: string) => {
    try {
      await AsyncStorage.setItem('auth_token', token)
      setTimeout(() => {
        setIsSignedIn(true)

      }, 1000)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  //处理登出
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token')
      setIsSignedIn(false)
    } catch (error) {
      console.log(error)
    }
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
            <Stack.Screen
              name="Index"
              options={{ headerShown: false }}
              component={Index} />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                // headerShown: true,
                // header: (props) => <NavHeader {...props} />
              }}
            />
            {
              Platform.OS !== 'web' &&  <Stack.Screen name="ScanScreen" component={ScanScreen} />
            }
            
            {/* <Stack.Screen name="Search" component={Search} /> */}
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
              <Stack.Screen name="Search" component={Search} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
              <Stack.Screen name="TextView" component={TextView} />
            </Stack.Group>

            <Stack.Screen
              name="Settings"
              options={{
                // headerShown: true,
                // header: (props) => <BackHeader {...props} />,
                headerTitle: '设置'
              }}
            >
              {() => <Settings onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="General" component={General} />
            <Stack.Screen name="DarkMode" component={DarkMode} />
            <Stack.Screen name="WebView" component={WebView} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn">
              {() => <SignIn onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} ></Stack.Screen>
          </>
        )
      }

    </Stack.Navigator>
  )
}

export default HomeStack