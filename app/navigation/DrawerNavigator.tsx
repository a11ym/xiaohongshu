// navigation/DrawerNavigator.js
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
// import ProfileStack from './ProfileStack';
import DrawerView from '../components/DrawerView';
const Drawer = createDrawerNavigator();
import TopTabbar from '../components/TopTabbar';
import Settings from '../pages/Settings';
import BackHeader from '../components/BackHeader';

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => <DrawerView {...props} />}
      screenOptions={{
        popToTopOnBlur: true, // 返回时回到顶部
        headerShown: false,
        swipeEdgeWidth: 0, //滑动距离
        drawerType: 'front', // 'back', 'front', 'slide', 'permanent'
        drawerStyle: {
          width: '80%',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      {/* <Drawer.Screen
        name="Settings"
        options={{
          headerTitle: '设置'
        }}
        component={Settings} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;