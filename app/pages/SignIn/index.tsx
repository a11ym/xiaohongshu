import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Feather from '@react-native-vector-icons/feather'
import { useTheme } from '../../hooks/useTheme'
// import Modal from 'react-native-modal'
import BottomSheet, {
  BottomSheetView,
} from '@gorhom/bottom-sheet';
const SignIn = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const { iconColor } = useTheme()

  const handleSubmit = () => {
    console.log('登录')
    //模拟登录
    const mockLogin = 'xiaohongshu'

    onLogin(mockLogin)
  }

  // 登录选项数据 - 可动态增减
  const loginOptions = [
    { id: 'phone', title: '手机号登录', icon: '📱' },
    { id: 'email', title: '邮箱登录', icon: '✉️' },
    { id: 'wechat', title: '微信登录', icon: '🇨🇳' },
    { id: 'qq', title: 'QQ登录', icon: '🐧' },
    { id: 'apple', title: 'Apple登录', icon: '🍎' },
    // 可以添加更多选项，弹窗会自动适应高度
  ];

  // ref
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <>
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
        <Pressable onPress={() => handleSnapPress(1)} style={styles.footerContainer}>
          <ThemedText>其他登录方式</ThemedText>
          <Feather name='chevron-right' size={18} color={iconColor} />
        </Pressable>
        <Button title="Close" onPress={() => handleClosePress()} />
      </ThemedView>
      {/* 底部弹窗 */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.sheetTitle}>选择登录方式</Text>
          {loginOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.loginOption}
            // onPress={() => handleLogin(option.id)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </>
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
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  triggerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheet: {
    backgroundColor: 'transparent',
  },
  sheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetHandle: {
    backgroundColor: '#e0e0e0',
    height: 4,
    width: 40,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 2,
  },
  sheetContent: {
    flex: 1,
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})