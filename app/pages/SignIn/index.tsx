import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeView from '../../components/ThemeView'
import ThemeText from '../../components/ThemeText'
import Feather from '@react-native-vector-icons/feather'
import { useTheme } from '../../hooks/useTheme'
const SignIn = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const { iconColor } = useTheme()
  const handleSubmit = () => {
    console.log('登录')
    //模拟登录
    const mockLogin = 'xiaohongshu'

    onLogin(mockLogin)
  }
  const handle = () => {
    console.log('其他登录方式')
  }
  return (
    <ThemeView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemeText>小红书</ThemeText>
          <ThemeText>你的生活兴趣社区</ThemeText>
        </View>
        <Pressable onPress={handleSubmit} style={styles.sginInButton}>
          {/* 登录按钮 */}
          <ThemeText>一键登录</ThemeText>
        </Pressable>
        <View style={styles.textContainer}>
          <ThemeText>我已阅读并同意</ThemeText>
          <ThemeText>《用户协议》</ThemeText>
          <ThemeText>《隐私政策》</ThemeText>
          <ThemeText>《未成年人个人信息保护规则》</ThemeText>
        </View>
        <Pressable onPress={handle} style={styles.footerContainer}>
          <ThemeText>其他登录方式</ThemeText>
          <Feather name='chevron-right' size={18} color={iconColor} />
        </Pressable>
      </View>
    </ThemeView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
  },
  sginInButton: {
    width: 300,
    height: 50,
    backgroundColor: '#ff5777',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  }
})