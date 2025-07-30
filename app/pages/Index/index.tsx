import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Home';
import Message from '../Message';
import My from '../My';
import Hot from '../Hot';
// import { TabBar } from '../../components/Tabbar';
import TextTabbar from '../../components/TextTabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../hooks/useTheme';
import Add from '../Add';
import NavHeader from '../../components/NavHeader';

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // 隐藏导航栏
        tabBarIcon: () => null
      }}
      // tabBar={(props) => <TabBar {...props} />}
      tabBar={(props) => <TextTabbar {...props} />}
    >
      <Tab.Screen name="Home"
        options={{
          tabBarLabel: '首页',
        }}
        component={Home} />
      <Tab.Screen name="Hot"
        options={{
          tabBarLabel: '热门',
        }}
        component={Hot} />
      <Tab.Screen name="Add"
        options={{
          tabBarLabel: '',
        }}
        component={Add} />
      <Tab.Screen name="Message"
        options={{
          // headerShown: true,
          // header: (props) => <MessageHeader {...props} />,
          tabBarLabel: '消息',
          headerTitle: '消息',
        }}
        component={Message} />
      <Tab.Screen name="My"
        options={{
          tabBarLabel: '我',
          headerTitleAlign: 'center',
        }}
        component={My} />
    </Tab.Navigator>
  )
}

export default Index

const styles = StyleSheet.create({})