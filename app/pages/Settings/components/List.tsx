import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from '@react-native-vector-icons/feather'
import ThemedText from '../../../components/ThemedText'
import { useTheme } from '../../../hooks/useTheme'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
const List = ({ onLogout }: { onLogout: () => void }) => {
  const { iconColor, backgroundColor, containerBackgroundColor } = useTheme()
  const navigation = useNavigation()
  const renderListDataPart = [
    {
      title: '账号与安全',
      icon: 'user',
    },
    {
      title: '通用设置',
      icon: 'info',
    },
    {
      title: '通知设置',
      icon: 'help-circle',
    },
    {
      title: '隐私设置',
      icon: 'lock',
    }
  ]
  const renderListDataPart2 = [
    {
      title: '存储空间',
      icon: 'info',
    },
    {
      title: '内容偏好调节',
      icon: 'help-circle',
    },
    {
      title: '收获地址',
      icon: 'lock',
    },
    {
      title: '添加小组件',
      icon: 'lock',
    },
    {
      title: '未成年人模式',
      icon: 'lock',
    }
  ]
  const renderListDataPart3 = [
    {
      title: '帮助与客服',
      icon: 'info',
    },
    {
      title: '关于小红书',
      icon: 'help-circle',
    },
  ]
  const renderListDataPart4 = [
    {
      title: '切换账号',
      icon: ''
    },
    {
      title: '退出登录',
      icon: ''
    }
  ]
  const [isModalVisible, setModalVisible] = useState(false)
  const closeModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);
  const handleOpen = (index) => {
    if (index === 1) {
      setModalVisible(true)
    }
  }
  const handleOpenGeneral = (index) => {
    if (index === 1) {
      navigation.navigate('General')
    }
  }

  // 完全关闭modal后的回调
  const onModalHide = useCallback(() => {
    console.log('Modal完全隐藏');
  }, []);
  
  // 完全显示modal后的回调
  const onModalShow = useCallback(() => {
    console.log('Modal完全显示');
  }, []);



  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart.map((item, index) => {
            return (
              <Pressable
                onPress={() => handleOpenGeneral(index)}
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === renderListDataPart.length - 1 ? 0 : StyleSheet.hairlineWidth }]}>
                      <ThemedText style={styles.text}>{item.title}</ThemedText>
                      <Feather name="chevron-right" size={24} color={iconColor} />
                    </View>
                  </View>
                </View>
              </Pressable>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart2.map((item, index) => {
            return (
              <Pressable
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === renderListDataPart2.length - 1 ? 0 : 0.5 }]}>
                      <ThemedText style={styles.text}>{item.title}</ThemedText>
                      <Feather name="chevron-right" size={24} color={iconColor} />
                    </View>
                  </View>
                </View>
              </Pressable>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart3.map((item, index) => {
            return (
              <Pressable
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === renderListDataPart3.length - 1 ? 0 : 0.5 }]}>
                      <ThemedText style={styles.text}>{item.title}</ThemedText>
                      <Feather name="chevron-right" size={24} color={iconColor} />
                    </View>
                  </View>
                </View>
              </Pressable>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart4.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => { handleOpen(index) }}
                style={({ pressed }) => [styles.loginContent, pressed && { backgroundColor: '#eee' }]}
              >
                <View
                  style={styles.containerItem}
                >
                  <View style={[styles.textContent, { borderBottomWidth: index === renderListDataPart4.length - 1 ? 0 : 0.5 }]}>
                    <ThemedText style={styles.text}>{item.title}</ThemedText>
                  </View>
                </View>
              </Pressable>
            )
          })
        }
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        onModalHide={onModalHide}
        onModalShow={onModalShow}
        useNativeDriver={true}
        // useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.3}
        // animationInTiming={350}
        // animationOutTiming={350}
        // backdropTransitionInTiming={0}
        backdropTransitionOutTiming={1}
        style={styles.modal}
      >
        <View style={[styles.modalContainer, { backgroundColor: containerBackgroundColor }]}>
          <View style={[styles.modalHeader, { backgroundColor }]}>
            <Text style={{ textAlign: 'center' }}>确认退出该账号@BearWu吗？</Text>
          </View>
          <View style={[styles.modalBody, { backgroundColor }]}>
            <Pressable
              style={({ pressed }) => [styles.modalContent, pressed && { backgroundColor: '#eee' }]}
            >
              <View style={[styles.modalItem, { borderBottomWidth: 0.5, borderBottomColor: '#ddd' }]}>
                <ThemedText >切换账号</ThemedText>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.modalContent, pressed && { backgroundColor: '#eee' }]}
              onPress={onLogout}>
              <View style={styles.modalItem}>
                <ThemedText >退出登录</ThemedText>
              </View>
            </Pressable>
          </View>
          <View style={[styles.modalFooter, { backgroundColor }]}>
            <Pressable
              style={({ pressed }) => [styles.modalContent, pressed && { backgroundColor: '#eee' }]}
              onPress={closeModal}>
              <View style={styles.modalItem}>
                <ThemedText >取消</ThemedText>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  containerPart: {
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    gap: 10
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  contentItem: {
    flex: 1,
    paddingRight: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
  },
  loginContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContent: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ddd',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  modalHeader: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  modalBody: {
    // flex: 1,
    // backgroundColor: 'blue',
  },
  modalFooter: {
    marginTop: 10,
    paddingBottom: 40,
  },
})