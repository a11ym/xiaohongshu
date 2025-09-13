import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';

// 定义常量
const REFRESH_THRESHOLD = 80; // 触发刷新的下拉距离
const INDICATOR_HEIGHT = 60; // 指示器的高度

// 自定义刷新指示器 UI 组件
const CustomRefreshIndicator = ({ pullDistance, isRefreshing }: { pullDistance: SharedValue<number>, isRefreshing: SharedValue<boolean> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    // 根据下拉距离，计算透明度和旋转角度
    const opacity = interpolate(
      pullDistance.value,
      [0, REFRESH_THRESHOLD * 0.8, REFRESH_THRESHOLD],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );

    const rotation = interpolate(
      pullDistance.value,
      [0, REFRESH_THRESHOLD],
      [0, 180],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      // 只有在非刷新状态下才旋转图标，刷新时显示加载圈
      transform: isRefreshing.value ? [] : [{ rotate: `${rotation}deg` }],
    };
  }, [pullDistance, isRefreshing]);

  return (
    <View style={styles.indicatorContainer}>
      {isRefreshing.value ? (
        <ActivityIndicator color="#333" size="small" />
      ) : (
        <Animated.View style={animatedStyle}>
          {/* 您可以用任何图标库或自定义视图替代这里的文字 */}
          <Text style={styles.arrow}>↓</Text>
        </Animated.View>
      )}
    </View>
  );
};


// 使用 forwardRef 以便父组件可以获取到 FlashList 的引用
export const CustomRefreshFlashList = ({props, ref}) => {
  const { onRefresh, refreshing, ...rest } = props;

  const scrollY = useSharedValue(0);//滚动距离
  const pullDistance = useSharedValue(0);//下拉距离
  const isRefreshing = useSharedValue(false);//是否刷新中

  // 监听外部 refreshing prop 的变化，来控制刷新动画的结束
  useEffect(() => {
    if (!refreshing) {
      // 当外部状态变为 false 时，平滑地收起组件
      isRefreshing.value = false;
      pullDistance.value = withTiming(0, { duration: 300 });
    }
  }, [refreshing]);

  // 监听列表滚动，只有在顶部时才允许手势
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // 定义核心的下拉手势
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // 只有当列表在最顶部 (scrollY <= 0) 且不在刷新中时，手势才生效
      if (scrollY.value > 0 || isRefreshing.value) {
        return;
      }
    })
    .onUpdate((event) => {
      // 避免向上滑动时触发
      if (event.translationY < 0 || isRefreshing.value) {
        return;
      }
      // 使用插值增加阻尼感，让下拉感觉更真实
      const dampenedDistance = interpolate(
        event.translationY,
        [0, 200],
        [0, 100],
        Extrapolate.CLAMP
      );
      pullDistance.value = dampenedDistance;
    })
    .onEnd(() => {
      if (pullDistance.value >= REFRESH_THRESHOLD) {
        // 如果下拉距离足够，触发刷新
        isRefreshing.value = true;
        // 使用 runOnJS 在 JS 线程执行 onRefresh 回调
        if (onRefresh) {
          runOnJS(onRefresh)();
        }
        // 将列表和指示器固定在刷新高度
        pullDistance.value = withTiming(INDICATOR_HEIGHT, { duration: 200 });
      } else {
        // 否则，弹回原位
        pullDistance.value = withTiming(0, { duration: 200 });
      }
    })
    // .withExclusive젓(true) // 确保手势的独占性
    .enabled(!isRefreshing.value && scrollY.value <= 0); // 动态启用手势

  // 定义列表和指示器的动画样式
  const animatedListStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: pullDistance.value }],
    };
  }, [pullDistance]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    // 指示器也跟随下拉移动
    return {
      transform: [{ translateY: pullDistance.value - INDICATOR_HEIGHT }],
    };
  }, [pullDistance]);


  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.indicatorWrapper, animatedIndicatorStyle]}>
          <CustomRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />
        </Animated.View>
        <Animated.View style={animatedListStyle}>
          <FlashList
            ref={ref}
            onScroll={scrollHandler}
            // 重要：禁用 FlashList 自带的 RefreshControl
            refreshing={false}
            {...rest}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: INDICATOR_HEIGHT,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#666',
  }
});
