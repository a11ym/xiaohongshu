import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from '@react-native-vector-icons/feather';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: screenWidth } = Dimensions.get('window');


// 自定义标签栏组件
export default function TopTabBar({ state, descriptors, navigation, position }: any) {
  // 计算标签宽度 (三个标签等宽)
  const tabWidth = (screenWidth - 112) / 3; // 112 = 左右按钮宽度(48*2) + 内边距(16)
  // const tabWidth = 30;
  // 使用 Reanimated 共享值
  const indicatorPosition = useSharedValue(0);
  const { backgroundColor, tabBarFontColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  // 更新指示器位置
  useEffect(() => {
    indicatorPosition.value = withTiming(state.index * tabWidth, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [state.index]);

  // 指示器动画样式
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  }, [indicatorPosition]);


  // 打开侧边栏
  const openSidebar = () => {
    console.log('打开侧边栏');
    navigation.openDrawer();
  };

  // 切换搜索
  const toggleSearch = () => {
    navigation.navigate('Search');
  };


  return (
    <>
      <View style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
        {/* 顶部导航栏 */}
        <View style={styles.tabBarContainer}>
          {/* 左侧菜单按钮 */}
          <TouchableOpacity
            style={styles.sideButton}
            onPress={openSidebar}
          >
            <Ionicons name="menu" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>

          {/* 三个居中标签 */}
          <View style={styles.tabsContainer}>
            {state.routes.map((route: any, index: number) => {
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
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  style={[styles.tabItem, { width: tabWidth }]}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: isFocused ? tabBarFontColor.primary : tabBarFontColor.text }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* 指示器 - 使用 Reanimated */}
            <Animated.View
              style={[
                styles.indicator,
                indicatorStyle,
                { width: tabWidth }
              ]}
            />
          </View>

          {/* 右侧搜索按钮 */}
          <TouchableOpacity
            style={styles.sideButton}
            onPress={toggleSearch}
          >
            <Ionicons
              name="search"
              size={24}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'red',
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  tabItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabLabel: {
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FF5777',
    borderRadius: 2,
  },
  searchContainer: {
    flex: 1,
    position: 'absolute',
    top: 56,
    left: 0,
    backgroundColor: 'red',
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: '#333',
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