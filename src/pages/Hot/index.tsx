import { StyleSheet, View ,FlatList, Dimensions } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import VideoItem from '../../components/VideoItem'
const { height } = Dimensions.get('window');
import videoData, { VideoData } from './Data'
type Props = {
  item: VideoData;
  index: number;
}

const Hot = () => {
  const [focusedIndex, setFocusedIndex] = useState(0); // 记录当前聚焦的视频索引
  const isScreenFocused = useIsFocused();
  const insets = useSafeAreaInsets()
  const renderItem = ({ item, index }: Props) => {
    // console.log('🚀 ~ renderItem ~ item:', item)
    // console.log('🚀 ~ renderItem ~ index:', index)
    const isFocused = index === focusedIndex && isScreenFocused;
    console.log("🚀 ~ renderItem ~ isFocused:", isFocused)
    return (
      <VideoItem 
        item={item}
        isFocused={isFocused} 
      />
    );
  };

  // onViewableItemsChanged 的回调函数
  // 使用 useCallback 进行性能优化，防止不必要地重新创建函数
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      // viewableItems 是一个数组，包含了当前所有可见的项
      // 我们取第一个作为当前聚焦的视频
      const newFocusedIndex = viewableItems[0].index;
      setFocusedIndex(newFocusedIndex);
    }
  }, []);

  // viewabilityConfig 配置项
  // itemVisiblePercentThreshold: 50 表示当一个视频的50%或更多进入屏幕时，
  // 它被认为是“可见”的。这可以防止在快速滑动时视频频繁地播放和暂停。
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // 使用 useRef 存储配置，避免每次渲染都重新创建对象
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  return (
    <View style={[styles.container]}>
      {/* <ShortVideoPlayer /> */}
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled // 启用分页效果
        showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
        getItemLayout={(data, index) => ({
          length: height - 50 - insets.bottom,
          offset: (height - 50 - insets.bottom) * index,
          index,
        })} 
        // 优化性能，直接告诉 FlatList 每项的高度
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        initialNumToRender={1} // 初始渲染一项
        maxToRenderPerBatch={1} // 每次批处理渲染一项
        windowSize={2} // 维护前后总共2个窗口的渲染
      />
    </View>
  )
}

export default Hot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})




// // App.js
// import React, { useState, useRef, useCallback } from 'react';
// import { SafeAreaView, FlatList, StyleSheet, Dimensions } from 'react-native';
// import VideoItem from './VideoItem';
// import { videos } from './videoData'; // 导入视频数据

// const { height } = Dimensions.get('window');

// const App = () => {
//   const [focusedIndex, setFocusedIndex] = useState(0);

//   // onViewableItemsChanged 的回调函数
//   // 使用 useCallback 进行性能优化，防止不必要地重新创建函数
//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       // viewableItems 是一个数组，包含了当前所有可见的项
//       // 我们取第一个作为当前聚焦的视频
//       const newFocusedIndex = viewableItems[0].index;
//       setFocusedIndex(newFocusedIndex);
//     }
//   }, []);

//   // viewabilityConfig 配置项
//   // itemVisiblePercentThreshold: 50 表示当一个视频的50%或更多进入屏幕时，
//   // 它被认为是“可见”的。这可以防止在快速滑动时视频频繁地播放和暂停。
//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//   };

//   // 使用 useRef 存储配置，避免每次渲染都重新创建对象
//   const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

//   const renderItem = ({ item, index }) => {
//     return (
//       <VideoItem 
//         item={item} 
//         isFocused={index === focusedIndex} 
//       />
//     );
//   };
  
//   const keyExtractor = (item) => item.id;

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={videos}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         pagingEnabled // 启用分页效果
//         showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
//         getItemLayout={(data, index) => ({
//           length: height,
//           offset: height * index,
//           index,
//         })} // 优化性能，直接告诉 FlatList 每项的高度
//         viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
//         initialNumToRender={1} // 初始渲染一项
//         maxToRenderPerBatch={1} // 每次批处理渲染一项
//         windowSize={2} // 维护前后总共2个窗口的渲染
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
// });

// export default App;



// App.js
// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { SafeAreaView, FlatList, StyleSheet, Dimensions, AppState } from 'react-native';
// import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import VideoItem from './VideoItem';
// import { videos } from './videoData';

// const { height } = Dimensions.get('window');
// const Tab = createBottomTabNavigator();

// // --- 短视频Feed屏幕 ---
// const FeedScreen = () => {
//   const [focusedIndex, setFocusedIndex] = useState(0);
//   const appState = useRef(AppState.currentState);

//   // 关键：使用 useIsFocused hook
//   const isScreenFocused = useIsFocused(); 

//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const newFocusedIndex = viewableItems[0].index;
//       setFocusedIndex(newFocusedIndex);
//     }
//   }, []);

//   const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
//   const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

//   const renderItem = ({ item, index }) => {
//     // 传递一个新的 isActuallyPlaying 属性
//     // 它同时考虑了 item 是否在屏幕中央 (index === focusedIndex) 
//     // 和整个 FeedScreen 是否是当前 Tab (isScreenFocused)
//     const isFocused = index === focusedIndex && isScreenFocused;
    
//     return (
//       <VideoItem 
//         item={item} 
//         isFocused={isFocused}
//       />
//     );
//   };

//   return (
//     <FlatList
//       data={videos}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       pagingEnabled
//       showsVerticalScrollIndicator={false}
//       getItemLayout={(data, index) => ({
//         length: height,
//         offset: height * index,
//         index,
//       })}
//       viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
//       initialNumToRender={1}
//       maxToRenderPerBatch={1}
//       windowSize={2}
//     />
//   );
// };

// // --- 其他屏幕（占位）---
// const HomeScreen = () => <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home Screen</Text></SafeAreaView>;
// const ProfileScreen = () => <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile Screen</Text></SafeAreaView>;


// // --- App 主入口 ---
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
