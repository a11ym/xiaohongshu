// import { StyleSheet, Dimensions } from 'react-native'
// import React from 'react'
// import NavHeader from '../../components/NavHeader'
// import ContainerView from '../../components/ContainerView'
// import LottieView from 'lottie-react-native';
// const { width } = Dimensions.get('window')

// const Search = () => {
//   return (
//     <ContainerView>
//       <NavHeader title="搜索" back />
//       <LottieView
//         source={require('../../assets/refresh.json')}
//         autoPlay
//         loop
//         style={styles.lottie}
//       />
//     </ContainerView>
//   )
// }

// export default Search

// const styles = StyleSheet.create({
//   lottie: {
//     width: width,
//     height: width,
//   }
// })

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

const REFRESH_LOTTIE = require('../../assets/Loading.json'); 

const PULL_DISTANCE = 120;
const HEADER_HEIGHT = 80;

const TabScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const lottieRef = useRef<LottieView>(null);

  const translateY = useSharedValue(0);

  // Reanimated v3 推荐将 JS 函数包装一下
  const setIsRefreshingJS = (value:any) => {
    'worklet'; // 标记这个函数可以在UI线程运行
    runOnJS(setIsRefreshing)(value);
  };

  const onRefresh = async () => {
    // 确保这个函数只在JS线程执行
    console.log('Starting refresh...');
    // 保持Lottie动画可见
    translateY.value = withTiming(HEADER_HEIGHT); 
    lottieRef.current?.play();

    await new Promise(resolve => setTimeout(resolve, 2000));

    setData(prev => [`New Item ${Date.now()}`, ...prev]);
    
    // 刷新完成，收起动画
    translateY.value = withTiming(0, {}, (finished) => {
      if (finished) {
        setIsRefreshingJS(false);
        console.log('Refresh finished.');
      }
    });
  };
  
  // 1. 定义只关心垂直下拉的手势
  const verticalPan = Gesture.Pan()
    .onBegin(() => {
        // 只有当列表在顶部时才考虑激活
        // 注意：这需要一个方法来获取FlatList的滚动位置，暂时简化
    })
    .onUpdate(event => {
      if (isRefreshing) return;
      // 我们只关心向下的拖动
      if (event.translationY > 0) {
        const newTranslateY = Math.max(0, event.translationY);
        translateY.value = interpolate(
          newTranslateY,
          [0, PULL_DISTANCE * 2],
          [0, PULL_DISTANCE],
          Extrapolate.CLAMP
        );

        // const progress = interpolate(
        //   translateY.value,
        //   [0, PULL_DISTANCE],
        //   [0, 1],
        //   Extrapolate.CLAMP
        // );
        // lottieRef.current?.setProgress(progress); // 使用 setProgress 避免自动播放
      }
    })
    .onEnd(() => {
      if (isRefreshing) return;
      if (translateY.value >= PULL_DISTANCE) {
        setIsRefreshingJS(true);
        runOnJS(onRefresh)(); // 触发刷新
      } else {
        translateY.value = withTiming(0);
      }
    })
    .minDistance(1)
    // ✅ 关键点 1: 设置严格的激活条件
    .activeOffsetY(10)   // 必须向下拉动至少10px才激活
    .failOffsetX([-5, 5]); // 水平移动超过5px就失败

  // 2. 定义一个“哑”的水平手势
  // 它的唯一作用就是在用户水平滑动时“胜出”，从而让 verticalPan 失败
  const horizontalPan = Gesture.Pan()
    .activeOffsetX(10) // 水平移动超过10px激活
    .failOffsetY([-5, 5]); // 垂直移动超过5px就失败

  // 3. 使用 Gesture.Race 组合它们
  // Race 会让第一个激活的手势胜出，并取消其他所有手势
  const raceGesture = Gesture.Race(horizontalPan, verticalPan);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const lottieContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value - HEADER_HEIGHT }],
  }));

  return (
    <View style={styles.container}>
      {/* 将 GestureDetector 放在最外层，包裹住列表。
        这很重要，因为它需要能够捕获到所有的触摸事件。
      */}
      <GestureDetector gesture={raceGesture}>
        <Animated.View style={styles.flexContainer}>
            <Animated.View style={[styles.lottieContainer, lottieContainerStyle]}>
              <LottieView
                ref={lottieRef}
                source={REFRESH_LOTTIE}
                loop={true}
                style={styles.lottie}
              />
            </Animated.View>

            <Animated.View style={[styles.flexContainer, animatedStyle]}>
              <FlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text>{item}</Text>
                  </View>
                )}
                style={styles.list}
                bounces={false} // 关闭iOS原生的弹性，避免双重弹性效果
              />
            </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flexContainer: {
    flex: 1,
  },
  lottieContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end', // 让lottie动画在底部对齐
    paddingBottom: 10,
  },
  lottie: {
    width: 60,
    height: 60,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TabScreen;

