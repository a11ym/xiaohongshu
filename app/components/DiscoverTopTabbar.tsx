import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar = ({ state, navigation, descriptors }: any) => {
  // 状态管理
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);
  const [contentWidth, setContentWidth] = useState(0);

  // Reanimated 值
  const translateX = useSharedValue(0);
  const containerWidth = useRef(SCREEN_WIDTH);

  // 当前激活的 Tab 索引
  const activeIndex = state.index;

  // 处理 Tab 布局变化
  const onTabLayout = (index: number, event: any) => {
    const { layout } = event.nativeEvent;
    setTabLayouts(prev => {
      const newLayouts = [...prev];
      newLayouts[index] = { x: layout.x, width: layout.width };
      return newLayouts;
    });
  };

  // 处理内容容器布局
  const onContentLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContentWidth(width);
  };

  // 滚动到激活的 Tab（居中效果）
  const scrollToActiveTab = (animated = true) => {
    if (activeIndex < 0 || activeIndex >= tabLayouts.length || !tabLayouts[activeIndex]) return;

    const { x, width } = tabLayouts[activeIndex];
    const tabCenter = x + width / 2;
    const targetOffset = tabCenter - containerWidth.current / 2;

    // 计算最大可滚动距离
    const maxScroll = Math.max(0, contentWidth - containerWidth.current);
    const clampedOffset = Math.max(0, Math.min(targetOffset, maxScroll));

    // 执行动画
    if (animated) {
      translateX.value = withTiming(-clampedOffset, { duration: 300 });
    } else {
      translateX.value = -clampedOffset;
    }
  };

  // 当激活索引或布局变化时滚动
  useEffect(() => {
    if (tabLayouts.length > 0 && contentWidth > 0) {
      scrollToActiveTab();
    }
  }, [activeIndex, tabLayouts, contentWidth]);

  // 处理容器尺寸变化（如旋转）
  const onContainerLayout = (event: any) => {
    containerWidth.current = event.nativeEvent.layout.width;
    scrollToActiveTab(false);
  };

  // 处理 Tab 点击
  const handleTabPress = (route: any, index: number) => {
    const isFocused = state.index === index;

    if (!isFocused) {
      navigation.navigate(route.name);
    }

    // 如果布局信息尚未准备好，稍后滚动
    if (!tabLayouts[index] || contentWidth === 0) {
      requestAnimationFrame(() => runOnJS(scrollToActiveTab)());
    }
  };

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }), [translateX]);

  return (
    <View
      style={styles.container}
      onLayout={onContainerLayout}
    >
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // scrollEnabled={false} // 禁用原生滚动
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[styles.tabsContainer, animatedStyle]}
          onLayout={onContentLayout}
        >
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            const isFocused = state.index === index;

            return (
              <Pressable
                key={route.key}
                onPress={() => handleTabPress(route, index)}
                onLayout={(e) => onTabLayout(index, e)}
              >
                <View style={[
                  styles.tabItem,
                  // isFocused && styles.activeTab
                ]}>
                  <Text style={[
                    styles.tabText,
                    isFocused && styles.activeText
                  ]}>
                    {label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 48,
    // backgroundColor: '#FFFFFF',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#E0E0E0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#616161',
    fontWeight: '500',
  },
  activeText: {
    color:'#000',
    fontWeight: '600',
  },
});

export default CustomTabBar;






// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import {
//   useSharedValue,
//   useAnimatedScrollHandler,
//   withSpring,
//   useAnimatedStyle,
// } from 'react-native-reanimated';

// const { width: screenWidth } = Dimensions.get('window');

// // 自定义顶部 TabBar
// const CustomTabBar = ({ navigation, state }) => {
//   const scrollX = useSharedValue(0);
//   const flatListRef = useRef(null);

//   // 每个 tab 的固定宽度
//   const tabWidth = 120;

//   // 点击 tab 时滚动到对应位置
//   const handleTabPress = (index) => {
//     const centerOffset = tabWidth * index + tabWidth / 2;
//     const scrollToX = centerOffset - screenWidth / 2;
//     scrollX.value = withSpring(scrollToX);
//     if (flatListRef.current) {
//       flatListRef.current.scrollToOffset({ offset: scrollToX, animated: true });
//     }
//     navigation.navigate(state.routes[index].name);
//   };

//   // 监听滚动，更新当前 tab 索引
//   const onScroll = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       const currentCenter = event.contentOffset.x + screenWidth / 2;
//       const currentIndex = Math.round((currentCenter - tabWidth / 2) / tabWidth);
//       if (currentIndex >= 0 && currentIndex < state.routes.length && currentIndex !== state.index) {
//         navigation.navigate(state.routes[currentIndex].name);
//       }
//     },
//   });

//   // 动画样式：缩放当前 tab
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: withSpring(state.index === 0 ? 1.2 : 1) }],
//     };
//   });

//   return (
//     <View style={{ height: 50 }}>
//       <FlatList
//         ref={flatListRef}
//         data={state.routes}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onScroll={onScroll}
//         getItemLayout={(data, index) => ({
//           length: tabWidth,
//           offset: tabWidth * index,
//           index,
//         })}
//         renderItem={({ item, index }) => {
//           const isActive = index === state.index;

//           return (
//             <TouchableOpacity
//               style={{
//                 width: tabWidth,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingHorizontal: 16,
//               }}
//               onPress={() => handleTabPress(index)}
//             >
//               <Text style={isActive ? { fontWeight: 'bold' } : {}}>
//                 {item.name}
//               </Text>
//             </TouchableOpacity>
//           );
//         }}
//         keyExtractor={(item) => item.name}
//       />
//     </View>
//   );
// };

// export default CustomTabBar;