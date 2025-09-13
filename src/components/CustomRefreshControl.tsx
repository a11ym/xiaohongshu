import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const REFRESH_AREA_HEIGHT = 80; // 下拉刷新区域的高度
const REFRESH_TRIGGER_HEIGHT = 60; // 触发刷新的高度
const MAX_PULL_DOWN_HEIGHT = 150; // 最大下拉高度

type CustomRefreshControlProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
};

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({
  isRefreshing,
  onRefresh,
  children,
}) => {
  const navigation = useNavigation();
  const translationY = useSharedValue(0);
  const isGestureActive = useSharedValue(false);
  const progress = useSharedValue(0);
  const canRefresh = useSharedValue(false);
  const lottieAnimation = useRef<LottieView>(null);

  //检查是否在顶部
  // const isAtTop = () => {
  //   // 这里需要根据你的具体实现来判断是否在顶部
  //   return true;
  // };
  const panGesture = Gesture.Pan()
    .enabled(true)
    .minDistance(1)
    .onBegin((event) => {
      console.log("🚀 ~ onBegin ~ event:", event)
      // 手势开始
      if (isRefreshing) return;
      // const atTop = runOnJS(isAtTop)();
      // if (!atTop) return;
      isGestureActive.value = true;
    })
    .onStart((event) => {
      console.log("🚀 ~ onStart ~ event:", event)
      // isGestureActive.value = true;
    })
    .onUpdate((event) => {
      console.log("🚀 ~ onUpdate ~ event:", event)
      if (isRefreshing && !isGestureActive.value) return;
      // 检查是否是主要垂直方向的手势
      const isVerticalGesture = Math.abs(event.translationY) > Math.abs(event.translationX);

      // 如果是水平手势，取消我们的手势处理（让React Navigation处理）
      if (!isVerticalGesture && event.translationX !== 0) {
        isGestureActive.value = false;
        return;
      }
      //处理下拉手势
      if (event.translationY > 0 && isVerticalGesture) {
        //计算下拉距离
        const pullDistance = Math.min(event.translationY * 0.5, MAX_PULL_DOWN_HEIGHT);
        translationY.value = pullDistance;
        //计算进度
        progress.value = Math.min(pullDistance / REFRESH_AREA_HEIGHT, 1);
        //判断是否可以刷新
        canRefresh.value = pullDistance >= REFRESH_TRIGGER_HEIGHT;
      }
    })
    .onEnd(() => {
      if (!isGestureActive.value) return;
      //根据下拉距离决定是否触发刷新
      if (canRefresh.value) {
        runOnJS(onRefresh)();
      } else {
        translationY.value = withTiming(0);
        progress.value = 0;
      }
      isGestureActive.value = false;
    })
    .onFinalize(() => {
      isGestureActive.value = false;
      canRefresh.value = false;
    })
    //与外部手势同时识别
    .simultaneousWithExternalGesture(
      ...(navigation.getState()?.routes || []).map(() => Gesture.Pan())
    );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
    };
  });

  const lottieContainerStyle = useAnimatedStyle(() => {
    return {
      height: translationY.value,
      top: -translationY.value,
      opacity: translationY.value > 0 ? 1 : 0,
    };
  });

  useEffect(() => {
    if (isRefreshing) {
      lottieAnimation.current?.play();
      translationY.value = withSpring(REFRESH_AREA_HEIGHT);
    } else {
      lottieAnimation.current?.reset();
      translationY.value = withTiming(0);
    }
  }, [isRefreshing, translationY]);

  return (
    <GestureDetector gesture={panGesture} touchAction="pan-y">
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.lottieContainer, lottieContainerStyle]}>
          <LottieView
            ref={lottieAnimation}
            source={require('../assets/Loading.json')} // Lottie 动画文件
            loop
            style={styles.lottie}
          />
        </Animated.View>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  lottie: {
    width: 50,
    height: 50,
  },
});

export default CustomRefreshControl;