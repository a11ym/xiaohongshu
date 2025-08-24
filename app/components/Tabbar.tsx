import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabbarButton from './TabbarButton';
// 导入BottomTabBarProps，useLinkBuilder，useTheme，useState，LayoutChangeEvent，StyleSheet，View，useAnimatedStyle，useSharedValue，withSpring，TabbarButton
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // 定义TabBar函数，接收state，descriptors，navigation参数
  // const { colors } = useTheme();
  // // 使用useTheme获取主题颜色
  // const { buildHref } = useLinkBuilder();

  // 使用useLinkBuilder获取buildHref函数
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });
  // 使用useState定义dimensions变量，初始值为{ width: 100, height: 20 }
  const buttonWith = dimensions.width / state.routes.length;
  // 计算按钮宽度
  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }
  // 定义onTabbarLayout函数，接收event参数
  const tabPositionX = useSharedValue(0);
  // 使用useSharedValue定义tabPositionX变量，初始值为0
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  }, [tabPositionX])
  // 使用useAnimatedStyle定义animatedStyle函数，返回transform属性
  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        borderRadius: 50,
        marginHorizontal: 12,
        height: dimensions.height - 15,
        width: buttonWith - 25,
        backgroundColor: '#723FEB',
      }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // 获取当前路由的options
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // 获取当前路由的label
        const isFocused = state.index === index;

        // 判断当前路由是否被选中
        const onPress = () => {
          // 使用withSpring函数将tabPositionX的值设置为buttonWith * index，并设置动画持续时间为1500毫秒
          tabPositionX.value = withSpring(buttonWith * index, { duration: 1500 });
          // 发射一个tabPress事件，目标为route.key，并设置canPreventDefault为true
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          // 发送tabPress事件
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // 定义onPress函数
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // 定义onLongPress函数
        return (
          // <PlatformPressable
          //   key={route.name}
          //   href={buildHref(route.name, route.params)}
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarButtonTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={styles.tabbarItem}
          // >
          //   {icon[route.name]({ color: isFocused ? colors.primary : colors.text })}
          //   <Text style={{ color: isFocused ? colors.primary : colors.text }}>
          //     {label}
          //   </Text>
          // </PlatformPressable>
          <TabbarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            colors={isFocused ? '#fff' : '#000'}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    // flex: 1,
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 50,
    // width: '100%',
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // width: Platform.OS === 'web' ? '100%' : 0,
  },
  // tabbarItem: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   gap: 5,
  // }
})