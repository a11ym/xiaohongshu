import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import DrawerView from '../components/DrawerView';
const Drawer = createDrawerNavigator();

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