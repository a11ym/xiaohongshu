import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from '@react-native-vector-icons/feather'
import ThemedText from '../../../components/ThemedText'
import { useTheme } from '../../../hooks/useTheme'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { listData, listData2, listData3, listData4, ListData } from '../data'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../../navigation/HomeStack'
const List = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const { iconColor, backgroundColor, containerBackgroundColor } = useTheme()
  const { logout } = useAuth()
  const [isModalVisible, setModalVisible] = useState(false)


  const closeModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);
  const handleOpen = (index: number) => {
    if (index === 1) {
      setModalVisible(true)
    }
  }
  const handleOpenGeneral = (index: number) => {
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

  const handleLogout = () => {
    console.log('退出登录')
    logout()
  }


  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          listData.map((item: ListData, index: number) => {
            return (
              <Pressable
                onPress={() => handleOpenGeneral(index)}
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={styles.card}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === listData.length - 1 ? 0 : StyleSheet.hairlineWidth }]}>
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
          listData2.map((item: ListData, index: number) => {
            return (
              <Pressable
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={styles.card}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === listData2.length - 1 ? 0 : 0.5 }]}>
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
          listData3.map((item: ListData, index: number) => {
            return (
              <Pressable
                style={({ pressed }) => [styles.containerContent, pressed && { backgroundColor: '#eee' }]}
                key={index}>
                <View style={styles.card}>
                  <Feather name={item.icon} size={24} color={iconColor} />
                  <View style={styles.containerItem}>
                    <View style={[styles.contentItem, { borderBottomWidth: index === listData3.length - 1 ? 0 : 0.5 }]}>
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
          listData4.map((item: ListData, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() => { handleOpen(index) }}
                style={({ pressed }) => [styles.loginContent, pressed && { backgroundColor: '#eee' }]}
              >
                <View
                  style={styles.containerItem}
                >
                  <View style={[styles.textContent, { borderBottomWidth: index === listData4.length - 1 ? 0 : 0.5 }]}>
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
              onPress={handleLogout}>
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
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
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