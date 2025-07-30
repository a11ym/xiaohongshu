import { StatusBar, StyleSheet, View, } from 'react-native'
import React, { PropsWithChildren, ReactElement } from 'react'
import { useTheme } from '../hooks/useTheme'
import { statusBarHeight } from '../utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}_${Math.random()}`;
};
type Props = PropsWithChildren<{
  children: ReactElement,
  style?: any,
  key?: string
}>
const ThemeView = (props: Props) => {
  const { children, style, key } = props
  const insets = useSafeAreaInsets()
  console.log("🚀 ~ ThemeView ~ style:", style)
  const { isDarkMode, backgroundColor } = useTheme()
  return (
    <View
      {...props}
      key={key ? key : generateKey('ThemeView')}
      style={[{ flex: 1, backgroundColor, paddingTop: insets.top }, style]}>
      {/* <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {children}
    </View>
  )
}

export default ThemeView
