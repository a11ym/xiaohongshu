import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Follow from './components/Follow';
import Discover from './components/Discover';
import City from './components/City';
const Tab = createMaterialTopTabNavigator();
import TopTabbar from '../../components/TopTabbar';
const Home = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TopTabbar {...props} />}
    >
      <Tab.Screen name="Follow"
        options={{
          tabBarLabel: '关注', // 设置标签栏的标题
        }}
        component={Follow} />
      <Tab.Screen name="Discover"
        options={{
          tabBarLabel: '发现', // 设置标签栏的标题
        }}
        component={Discover} />
      <Tab.Screen name="City"
        options={{
          tabBarLabel: '同城', // 设置标签栏的标题
        }}
        component={City} />
    </Tab.Navigator>
  );
}

export default Home
