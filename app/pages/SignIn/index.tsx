import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
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
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText>小红书</ThemedText>
        <ThemedText>你的生活兴趣社区</ThemedText>
      </View>
      <Pressable onPress={handleSubmit} style={styles.sginInButton}>
        {/* 登录按钮 */}
        <ThemedText>一键登录</ThemedText>
      </Pressable>
      <View style={styles.textContainer}>
        <ThemedText>我已阅读并同意</ThemedText>
        <ThemedText>《用户协议》</ThemedText>
        <ThemedText>《隐私政策》</ThemedText>
        <ThemedText>《未成年人个人信息保护规则》</ThemedText>
      </View>
      <Pressable onPress={handle} style={styles.footerContainer}>
        <ThemedText>其他登录方式</ThemedText>
        <Feather name='chevron-right' size={18} color={iconColor} />
      </Pressable>
    </ThemedView>
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