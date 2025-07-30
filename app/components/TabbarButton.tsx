import { icon } from '../constants/icon'
import { PlatformPressable } from '@react-navigation/elements'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const TabbarButton = ({ onPress, onLongPress, routeName, label, isFocused }: any) => {
  const scale = useSharedValue(0)
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 })
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [0, 9])
    return { transform: [{ scale: scaleValue }], top }
  })
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return { opacity }
  })
  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icon[routeName]({ color: isFocused ? '#fff' : '#000' })}
      </Animated.View>
      {/* {icon[routeName]({ color: isFocused ? '#673AB7' : '#000' })} */}
      {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
        {label}
      </Text> */}
      <Animated.Text style={[{ color: isFocused ? '#673AB7' : '#000', fontSize: 12 }, animatedTextStyle]}>{label}</Animated.Text>
    </PlatformPressable>
  )
}

export default TabbarButton

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  }
})