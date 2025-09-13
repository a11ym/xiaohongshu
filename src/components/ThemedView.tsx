import { View, type ViewProps } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'

interface ThemedViewProps extends ViewProps {
  style?: ViewProps['style'],
  children?: React.ReactNode
}

const ThemedView = (props: ThemedViewProps) => {
  const { children, style } = props
  const { backgroundColor } = useTheme()
  return (
    <View {...props} style={[{ backgroundColor }, style]} >
      {children}
    </View>
  )
}

export default ThemedView
