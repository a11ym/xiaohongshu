import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscoverTopTabbar from '../../../components/DiscoverTopTabbar';
import Trending from './pages/Trending';
import Live from './pages/Live';
import MenMakeup from './pages/MenMakeup';
import Recommend from './pages/Recommend';
import Dressing from './pages/Dressing';
import Shoes from './pages/Shoes';
import Music from './pages/Music';
const Tab = createMaterialTopTabNavigator();

const Discover = () => {
  const colorScheme = useColorScheme() // 'light' or 'dark'
  return (
    <Tab.Navigator
      tabBar={props => <DiscoverTopTabbar {...props} />}
    >
      <Tab.Screen name="Recommend"
        options={{
          tabBarLabel: '推荐', // 设置标签栏的标题
        }}
        component={Recommend} />
      <Tab.Screen name="Trending"
        options={{
          tabBarLabel: '趋势',
        }}
        component={Trending} />
      <Tab.Screen name="Live"
        options={{
          tabBarLabel: '直播',
        }
        }
        component={Live} />
      <Tab.Screen name="MenMakeup"
        options={{
          tabBarLabel: '男士发容',
        }
        }
        component={MenMakeup} />
      <Tab.Screen name="Dressing"
        options={{
          tabBarLabel: '穿搭',
        }}
        component={Dressing} />
      <Tab.Screen name="Shoes"
        options={{
          tabBarLabel: '潮鞋',
        }}
        component={Shoes} />
      <Tab.Screen name="Music"
        options={{
          tabBarLabel: '音乐',
        }}
        component={Music} />
    </Tab.Navigator>
  )
}

export default Discover

const styles = StyleSheet.create({})