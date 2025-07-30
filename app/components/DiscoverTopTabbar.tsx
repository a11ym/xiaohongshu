// import React, { useRef } from 'react'
// import { StyleSheet, Animated, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
// import { useLinkBuilder } from '@react-navigation/native';
// import { useTheme } from '../hooks/useTheme';
// const DiscoverTopTabbar = ({ state, descriptors, navigation, position }: any) => {
//   const { color, backgroundColor,darkContainerBackgroundColor, tabBarFontColor } = useTheme();
//   const { buildHref } = useLinkBuilder();
//   const scrollViewRef = useRef(null);
//   return (
//     // <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: backgroundColor, }}>
//     <View style={[styles.tabBarContainer, { backgroundColor: backgroundColor }]}>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.tabScrollContent}
//       >
//         {state.routes.map((route: { key: string | number; name: any; params: any; }, index: React.Key | null | undefined) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//                 ? options.title
//                 : route.name;

//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name, route.params);
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };

//           const inputRange = state.routes.map((_: any, i: any) => i);
//           const opacity = position.interpolate({
//             inputRange,
//             outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.6)),
//           });

//           return (
//             <TouchableOpacity
//               // href={buildHref(route.name, route.params)}
//               accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarButtonTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               key={index}
//               style={{ flex: 1, alignItems: 'center' }}
//             >
//               <Animated.Text style={{ opacity, color: color, alignItems: 'center', paddingRight: 100 }}>
//                 {label}
//               </Animated.Text>
//             </TouchableOpacity>
//           );

//         })}
//       </ScrollView>
//     </View>
//   )
// }

// export default DiscoverTopTabbar

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     elevation: 4, // for android

//   },
//   tabScrollContent: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
// })


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput, LayoutChangeEvent } from 'react-native';
import Ionicons from '@react-native-vector-icons/feather';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';


// 自定义标签栏组件
const DiscoverTopTabbar = ({ state, descriptors, navigation, position }:any) => {
  const [tabWidths, setTabWidths] = useState({});
  const scrollViewRef = useRef(null);
  // const [isSearchActive, setIsSearchActive] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  
  // 使用 Reanimated 共享值
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  // const searchOpacity = useSharedValue(0);
  // const searchWidth = useSharedValue(0);
  
  // 初始化时计算指示器位置
  useEffect(() => {
    if (state.index === 0) {
      indicatorPosition.value = 0;
      indicatorWidth.value = tabWidths[state.routes[0].key] || 0;
    }
  }, [tabWidths]);
  
  // 监听标签变化
  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < state.index; i++) {
      offset += tabWidths[state.routes[i].key] || 0;
    }
    
    const newWidth = tabWidths[state.routes[state.index].key] || 0;
    
    indicatorPosition.value = withTiming(offset, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    
    indicatorWidth.value = withTiming(newWidth, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [state.index, tabWidths]);
  
  // 搜索动画
  // useEffect(() => {
  //   if (isSearchActive) {
  //     searchOpacity.value = withTiming(1, { duration: 300 });
  //     searchWidth.value = withTiming(200, { duration: 300 });
  //   } else {
  //     searchOpacity.value = withTiming(0, { duration: 300 });
  //     searchWidth.value = withTiming(0, { duration: 300 });
  //     setSearchQuery('');
  //   }
  // }, [isSearchActive]);
  
  // 测量标签宽度
  const handleTabLayout = (event: LayoutChangeEvent, routeKey: any) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths(prev => ({ ...prev, [routeKey]: width }));
  };
  
  // // 打开侧边栏
  // const openSidebar = () => {
  //   console.log('打开侧边栏');
  // };
  
  // // 打开搜索
  // const toggleSearch = () => {
  //   setIsSearchActive(!isSearchActive);
  // };
  
  // // 处理搜索提交
  // const handleSearchSubmit = () => {
  //   console.log('搜索:', searchQuery);
  // };

  // // 指示器动画样式
  // const indicatorStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: indicatorPosition.value }],
  //     width: indicatorWidth.value,
  //   };
  // });
  
  // // 搜索框动画样式
  // const searchStyle = useAnimatedStyle(() => {
  //   return {
  //     width: searchWidth.value,
  //     opacity: searchOpacity.value,
  //   };
  // });

  return (
    <View style={styles.tabBarContainer}>
      {/* 左侧菜单按钮 */}
      {/* <TouchableOpacity 
        style={styles.sideButton} 
        onPress={openSidebar}
      >
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity> */}
      
      {/* 中间标签区域 */}
      <View style={styles.tabsContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {state.routes.map((route: any, index:any) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            const isFocused = state.index === index;
            
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
              
              // 滚动到可见区域
              scrollViewRef.current?.scrollTo({
                x: tabWidths[route.key] * index,
                animated: true
              });
            };
            
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                onLayout={(e) => handleTabLayout(e, route.key)}
                style={styles.tabItem}
              >
                <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          {/* 指示器 - 使用 Reanimated */}
          {/* <Animated.View 
            style={[
              styles.indicator, 
              indicatorStyle
            ]} 
          /> */}
        </Animated.ScrollView>
      </View>
      
      {/* 右侧区域 - 搜索按钮或搜索框 */}
      {/* <View style={styles.rightContainer}>
        <Animated.View style={[styles.searchContainer, searchStyle]}>
          <TextInput
            style={styles.searchInput}
            placeholder="搜索内容..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </Animated.View>
        
        <TouchableOpacity 
          style={styles.sideButton} 
          onPress={toggleSearch}
        >
          <Ionicons 
            name={isSearchActive ? "x" : "search"} 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DiscoverTopTabbar


const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // height: 56,
    paddingHorizontal: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sideButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  tabsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  tabScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 8,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeTabLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#2196f3',
    borderRadius: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
    minWidth: 100,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});