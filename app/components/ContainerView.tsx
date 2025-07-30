import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'

const ContainerView = (props: any) => {
  const { containerBackgroundColor } = useTheme()
  const { children, style } = props
  return (
    <View {...props} style={[{ backgroundColor: containerBackgroundColor }, style]}>
      {children}
    </View>
  )
}

export default ContainerView
