import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Animated, { interpolateColor, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const getStyle = (type: string) => {
  switch (type) {
    case 'wrapper':
      return {
        width: 50,
        height: 28,
        padding: 2,
      }
    default:
      return {
        width: 45,
        height: 15,
        padding: 0,
      }
  }
}


type Props = {
  value: boolean
  disabled?: boolean
  handleSwitch: (newValue: boolean) => void,
  activeTrackStyle?: string,
  inactiveTrackStyle?: string,
  thumbColor?: string,
  status?: 'default' | 'wrapper'
}

const Switch = ({ value, disabled = false, handleSwitch, activeTrackStyle = 'green', inactiveTrackStyle = 'gray', thumbColor = 'white', status = 'default' }: Props) => {

  const mainStyle = getStyle(status)

  const handlePress = () => {
    if (disabled) {
      return
    }
    handleSwitch(!value)
  }


  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      value ? 22 : 0,
      [0, 22],
      [inactiveTrackStyle, activeTrackStyle],
    )
    if (disabled) {
      return {
        backgroundColor,
        opacity: 0.5,
      }
    }
    return {
      backgroundColor,
      opacity: 1,
    }
  },[value, disabled, activeTrackStyle, inactiveTrackStyle])

  const thumbStyle = useAnimatedStyle(() => {

    return {
      backgroundColor: thumbColor,
      transform: [{
        translateX: withSpring(value ? 22 : 0, {
          stiffness: 120,
          damping: 15,
          mass: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.001,
          restSpeedThreshold: 0.001,
        })
      }],
    }
  },[value, thumbColor])

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      disabled={disabled}
    >
      <Animated.View
        needsOffscreenAlphaCompositing
        style={[styles.switch, trackStyle, mainStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Switch

const styles = StyleSheet.create({
  switch: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    width: 50,
    height: 28,
    borderRadius: 30,
    padding: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'green',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    elevation: 5,
  },
})