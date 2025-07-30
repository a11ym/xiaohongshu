import { Text, type TextProps } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
interface ThemeTextProps extends TextProps {
  style?: TextProps['style'],
  children: React.ReactNode
}
const ThemedText = (props: ThemeTextProps) => {
  const { children, style } = props
  const { isDarkMode } = useTheme()
  return (
    <Text  {...props} style={[{ color: isDarkMode ? '#fff' : '#000' }, style]}>
      {children}
    </Text>
  )
}

export default ThemedText
