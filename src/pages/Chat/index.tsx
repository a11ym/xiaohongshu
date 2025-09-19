import { PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../../components/Header'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSpring,
  interpolate, Extrapolation,
  useAnimatedScrollHandler
} from 'react-native-reanimated'
import Overlay from '../../components/Overlay'
import Drawer from '../../components/Drawer'
import { data } from './data' 
import LottieView from 'lottie-react-native'


const Chat = () => {
  const active = useSharedValue(false)
  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0)
  })

  const scrollPosition = useSharedValue(0)
  const pullDownPosition = useSharedValue(0)
  const isReadyTopRefresh = useSharedValue(false)
  const [refreshing, setRefreshing] = useState(false)
  const isLoaderActive = useSharedValue(false)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y
    }
  })
  const onRefresh = (onRefreshComplete: () => void) => {
    setRefreshing(true)
    isLoaderActive.value = true
    setTimeout(() => {
      setRefreshing(false)
      isLoaderActive.value = false
      onRefreshComplete()
    }, 5000)
  }

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyTopRefresh.value ? 120 : 0, {
      duration: 300
    })
    if (isReadyTopRefresh.value) {
      isReadyTopRefresh.value;
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {
          duration: 300
        })
      }
      onRefresh(onRefreshComplete)

    }
  }
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (event, gestureState) => {
        const maxPullDistance = 200
        pullDownPosition.value = Math.max(Math.min(maxPullDistance, gestureState.dy), 0)
        if (pullDownPosition.value >= maxPullDistance / 2 && isReadyTopRefresh.value === false) {
          isReadyTopRefresh.value = true
        }
        if (pullDownPosition.value < maxPullDistance / 2 && isReadyTopRefresh.value === true) {
          isReadyTopRefresh.value = false
        }
      },
      onPanResponderRelease: onPanRelease,
      // onPanResponderTerminate: onPanRelease
    })
  )

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 1],
      [0, -30],
      Extrapolation.CLAMP
    )
    return {
      transform: [
        { perspective: 1000 }, // 添加透视效果，增强3D感
        {
          scale: active.value ? withTiming(0.8) : withTiming(1),
        },
        {
          translateX: active.value ? withSpring(200) : withTiming(0),
        },
        {
          rotateY: `${rotateY}deg`,
        },
      ],
      borderRadius: active.value ? withTiming(20) : withTiming(0),
    }
  },[progress])

  const pullDownAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(pullDownPosition.value),
        },
      ],
    }
  },[pullDownPosition])

  const refreshLoaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isLoaderActive.value ? 1 : 0),
      height: pullDownPosition.value,
      top: pullDownPosition.value - 20,
    }
  },[pullDownPosition])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
        <Text>{item.time}</Text>
        <Text>{item.content}</Text>
      </View>
    )
  }

  return (
    <>
      <Drawer />
      <Animated.View style={[styles.container, animatedStyle]} pointerEvents={refreshing ? 'none' : 'auto'}>
        <Header active={active} />
        <Animated.View style={[styles.refreshContainer, refreshLoaderAnimatedStyle]} >
          <LottieView
            source={require('../../assets/Loading.json')}
            autoPlay
            loop
            style={styles.loader}
          />
        </Animated.View>
        <Animated.View style={[styles.flatListContainer, pullDownAnimatedStyle]}
          {...panResponder.current.panHandlers}
        >
          <Animated.FlatList
            data={data}
            onScroll={scrollHandler}
            renderItem={renderItem}
            scrollEventThrottle={16}
            ItemSeparatorComponent={
              () => (<View style={styles.itemSeparaorStyle} />)
            }
            keyExtractor={(item) => item.id.toString()}
          />
        </Animated.View>
        <Overlay active={active} />
      </Animated.View>
    </>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    // zIndex: 999,
    // overflow: 'hidden'
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  refreshContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'gray',
    zIndex: -1
  },
  loader: {
    width: 50,
    height: 50,
  },

  item: {
    padding: 20,
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  itemSeparaorStyle: {
    height: 10,
    // backgroundColor: 'yellow',
  }

})