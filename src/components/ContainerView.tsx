import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ContainerView = (props: any) => {
  const insets = useSafeAreaInsets()
  const { containerBackgroundColor } = useTheme()
  const { children, style } = props
  return (
    <View {...props} style={[styles.container, {
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor: containerBackgroundColor
      }, style]}>
      {children}
    </View>
  )
}

export default ContainerView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
