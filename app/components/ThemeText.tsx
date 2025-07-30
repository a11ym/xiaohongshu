import { Text } from 'react-native'
import React, { PropsWithChildren, ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'
const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}_${Math.random()}`;
};
const ThemeText = (props: any) => {
  const { children, style } = props
  const { isDarkMode } = useTheme()
  return (
    <Text
      {...props}
      key={generateKey('text')
      } // 修复React Native Text组件在Android上无法更新的问题
      style={[{
        color: isDarkMode ? '#fff' : '#000',
      }, style]}>
      {children}
    </Text>
  )
}

export default ThemeText
