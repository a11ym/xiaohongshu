import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscoverTopTabbar from '../../../components/DiscoverTopTabbar';
const Tab = createMaterialTopTabNavigator();
import FlashListView from '../components/pages/FlashListView'
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const tabs = [
  { name: 'Recommend', label: '推荐' },
  { name: 'Trending', label: '趋势' },
  { name: 'Live', label: '直播' },
  { name: 'MenMakeup', label: '男士发容' },
  { name: 'Dressing', label: '穿搭' },
  { name: 'Shoes', label: '潮鞋' },
  { name: 'Music', label: '音乐' },
]

const Discover = () => {
  return (
    <Tab.Navigator
      initialLayout={{ width: width }}
      tabBar={props => <DiscoverTopTabbar {...props} />}>
      {
        tabs.map(tab => (
          <Tab.Screen key={tab.name} name={tab.name} options={{ tabBarLabel: tab.label }} >
            {/* {props => <Item {...props} name={tab.name} label={tab.label} />} */}
            {() => <FlashListView />}
          </Tab.Screen>
        ))
      }
    </Tab.Navigator>
  )
}

export default Discover