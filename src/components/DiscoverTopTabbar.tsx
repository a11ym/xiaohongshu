import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: screenWidth } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const scrollViewRef = useRef(null);
  // 使用一个 ref 来存储每个 tab 的布局信息 (x, width)
  const tabsLayoutRef = useRef([]);
  const { backgroundColor, tabBarFontColor } = useTheme();
  const insets = useSafeAreaInsets();

  // 当 active tab 改变时，触发滚动
  useEffect(() => {
    const activeTabIndex = state.index;
    const activeTabLayout = tabsLayoutRef.current[activeTabIndex];

    if (activeTabLayout) {
      // 计算目标滚动位置
      // 公式: (tab 的中心点) - (屏幕的中心点)
      const scrollX = activeTabLayout.x + activeTabLayout.width / 2 - screenWidth / 2;

      // 执行滚动
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
      }
    }
  }, [state.index]); // 依赖项是当前选中的 tab index

  return (
    <View style={[styles.container, {
      backgroundColor,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

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

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              // 当 tab 渲染完成后，记录它的布局信息
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                tabsLayoutRef.current[index] = { x, width };
              }}
            >
              <Text style={{
                color: isFocused ? tabBarFontColor.primary : tabBarFontColor.text,
                fontWeight: isFocused ? 'bold' : 'normal'
              }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  scrollViewContent: {
    // 让 tab 在 ScrollView 中可以垂直居中
    alignItems: 'center',
    paddingHorizontal: 10, // 左右留一些间距
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
