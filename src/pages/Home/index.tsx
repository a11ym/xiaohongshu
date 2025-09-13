import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Follow from './components/Follow';
import Discover from './components/Discover';
import City from './components/City';
const TabTop = createMaterialTopTabNavigator();
import TopTabbar from '../../components/TopTabbar';
const Home = () => {
  return (
    <TabTop.Navigator
      tabBar={props => <TopTabbar {...props} />}
    >
      <TabTop.Screen name="Follow"
        options={{
          tabBarLabel: '关注', // 设置标签栏的标题
        }}
        component={Follow} />
      <TabTop.Screen name="Discover"
        options={{
          tabBarLabel: '发现', // 设置标签栏的标题
        }}
        component={Discover} />
      <TabTop.Screen name="City"
        options={{
          tabBarLabel: '同城', // 设置标签栏的标题
        }}
        component={City} />
    </TabTop.Navigator>
  );
}

export default Home
