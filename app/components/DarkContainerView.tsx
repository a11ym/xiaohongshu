import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'

const DarkContainerView = (props: any) => {
  const { darkContainerBackgroundColor } = useTheme()
  const { children, style } = props
  return (
    <View {...props} style={[{ backgroundColor: darkContainerBackgroundColor }, style]}>
      {children}
    </View>
  )
}

export default DarkContainerView
