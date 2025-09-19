import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import ThemedText from '../../components/ThemedText'
import { RouteProp } from '@react-navigation/native'
import { HomeStackParamList } from '../../navigation/HomeStack'
import { Data } from '../../pages/Home/Data'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, runOnJS, 
  // clamp
 } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
type DetailRouteParam = RouteProp<HomeStackParamList, 'Detail'>

type Props = {
  route: DetailRouteParam
}

const LeftComponent = ({ leftData }: { leftData: Data }) => {
  return (
    <View style={styles.leftContainer}>
      <Image source={{ uri: leftData.avatar }} style={styles.leftAvatar} />
      <ThemedText>{leftData.name}</ThemedText>
    </View>
  )
}

const RightComponent = () => {
  return (
    <View style={styles.rightContainer}>
      <View style={styles.rightItem}>
        <ThemedText style={styles.rightText}>关注</ThemedText>
      </View>
      <ThemedText>Right</ThemedText>
    </View>
  )
}

const Details = ({ route }: Props) => {
  const [direction, setDirection] = useState('');
  const navigation = useNavigation()
  // console.log("🚀 ~ Details ~ route:", route)
  const { item, origin } = route.params as { item: Data; origin: { x: number; y: number; width: number; height: number } }
  console.log("🚀 ~ Details ~ item:", item)
  console.log("🚀 ~ Details ~ origin:", origin)

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const animationProgress = useSharedValue(0);
  // const translationX = useSharedValue(0);
  // const translationY = useSharedValue(0);
  // const prevTranslationX = useSharedValue(0);
  // const prevTranslationY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    // 插值计算
    const left = interpolate(animationProgress.value, [0, 1], [origin.x, 0]);
    const top = interpolate(
      animationProgress.value,
      [0, 1],
      [origin.y, 0] // 直接从0开始，因为 Safe Area 会处理
    );
    const width = interpolate(
      animationProgress.value,
      [0, 1],
      [origin.width, screenWidth]
    );
    const height = interpolate(
      animationProgress.value,
      [0, 1],
      [origin.height, screenHeight]
    );
    const borderRadius = interpolate(animationProgress.value, [0, 1], [12, 0]);

    // 背景透明度，让列表页在动画开始时可见，结束时隐藏
    const backgroundOpacity = interpolate(
      animationProgress.value,
      [0, 0.1, 1],
      [0, 0, 1]
    );

    return {
      position: 'absolute',
      left,
      top,
      width,
      height,
      borderRadius,
      backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
      // transform: [
      //   { translateX: translationX.value },
      //   { translateY: translationY.value },
      // ],
    };
  },[animationProgress]);

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationProgress.value, [0, 0.5, 1], [0, 0.2, 1]);
    return {
      opacity: opacity,
    };
  },[animationProgress]);


  useEffect(() => {
    // 进入动画
    animationProgress.value = withTiming(1, { duration: 350 });
  }, [animationProgress]);

  const handleGoBack = () => {
    // 退出动画
    animationProgress.value = withTiming(0, { duration: 300 }, (isFinished) => {
      // 在 UI 线程动画结束后，在 JS 线程执行返回操作
      if (isFinished) {
        runOnJS(navigation.goBack)();
      }
    });
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      // 开始拖动时，记录当前位置
      // const { x, y, width, height } = origin;
      // animationProgress.value = withTiming(0.5, { duration: 300 });
      // prevTranslationX.value = translationX.value;
      // prevTranslationY.value = translationY.value;
    })
    .onChange(() => {
      // const { translationX, translationY } = event;
      // // 设置阈值，避免轻微移动误判
      // const threshold = 5;

      // // 判断水平或垂直方向上的位移量
      // if (Math.abs(translationX) > Math.abs(translationY)) {
      //   // 水平方向滑动
      //   if (Math.abs(translationX) < threshold) {
      //     runOnJS(setDirection)('轻微水平移动');
      //     return;
      //   }
      //   // 水平方向
      //   if (translationX > 0) {
      //     runOnJS(setDirection)('右滑中');
      //     runOnJS(handleGoBack)();
      //   } else {
      //     runOnJS(setDirection)('左滑中');
      //   }
      // } else {
      //   // 垂直方向滑动
      //   if (Math.abs(translationY) < threshold) {
      //     runOnJS(setDirection)('轻微垂直移动');
      //     return;
      //   }

      //   if (translationY > 0) {
      //     runOnJS(setDirection)('下滑中');
      //   } else {
      //     runOnJS(setDirection)('上滑中');
      //   }
      // }
    })
    .onUpdate(() => {
      // const { translationX: x, translationY: y } = event
      // const maxTranslateX = screenWidth / 2 - 50;
      // const maxTranslateY = screenHeight / 2 - 50;
      // // 设置阈值，避免轻微移动误判
      // const threshold = 10;
      // // 判断水平或垂直方向上的位移量是否超过阈值
      // if (Math.abs(x) > Math.abs(y)) {
      //   if (Math.abs(x) < threshold) return;
      //   // 水平方向
      //   if (x > 0) {
      //     runOnJS(setDirection)('右')
      //     translationX.value = clamp(
      //       prevTranslationX.value + event.translationX,
      //       -maxTranslateX,
      //       maxTranslateX
      //     );
      //     translationY.value = clamp(
      //       prevTranslationY.value + event.translationY,
      //       -maxTranslateY,
      //       maxTranslateY
      //     );
      //   } else {
      //     runOnJS(setDirection)('左')
      //   }
      // }

    })
    .onEnd((event) => {
      const { translationX, translationY } = event;
      // 设置阈值，避免轻微移动误判
      const threshold = 10;
      // 判断水平或垂直方向上的位移量是否超过阈值
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (Math.abs(translationX) < threshold) return;
        // 水平方向
        if (translationX > 0) {
          runOnJS(setDirection)('右')
          runOnJS(handleGoBack)();
        } else {
          runOnJS(setDirection)('左')
        }
      } else {
        if (Math.abs(translationY) < threshold) return;
        // 垂直方向
        if (translationY > 0) {
          runOnJS(setDirection)('下')
        } else {
          runOnJS(setDirection)('上')
        }
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <ContainerView>
          <NavHeader
            back={true}
            leftComponent={<LeftComponent leftData={item} />}
            rightComponent={<RightComponent />}
            onGobackPress={handleGoBack}
          />
          <Animated.View style={contentAnimatedStyle}>
            <Animated.Image
              sharedTransitionTag={item.name}
              source={{ uri: item.image_url }} style={{ width: screenWidth, height: screenWidth }} />
            <ThemedText>{item.content}</ThemedText>
            <ThemedText>{item.title}</ThemedText>
            <View style={styles.box}>
              <ThemedText>滑动我</ThemedText>
              <ThemedText>方向: {direction}</ThemedText>
            </View>
          </Animated.View>
        </ContainerView>
      </Animated.View>
    </GestureDetector>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  rightItem: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 1,
  },
  rightText: {
    color: 'red',
  },
  image: {
    width: '100%',
    height: 200,
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
})