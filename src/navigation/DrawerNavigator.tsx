import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import DrawerView from '../components/DrawerView';

type DrawerStackParamList = {
  Home: undefined;
  Settings: undefined;
}

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => <DrawerView {...props} />}
      screenOptions={{
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