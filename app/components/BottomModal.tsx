import { StyleSheet, View, Platform } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import { useTheme } from '../hooks/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
interface BottomModalProps {
  isVisible: boolean
  onBackdropPress: () => void
  onModalHide: () => void
  onModalShow: () => void
  children: React.ReactNode
}
const BottomModal = ({ isVisible, onBackdropPress, onModalHide, onModalShow, children }: BottomModalProps) => {
  const { backgroundColor } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      useNativeDriver={Platform.OS !== 'web' && true}
      hideModalContentWhileAnimating={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={1}
      backdropOpacity={0.3}
      style={styles.modal}
    >
      <View style={[styles.modalContainer, { backgroundColor, paddingBottom: insets.bottom + 20 }]}>
        {children}
      </View>
    </ReactNativeModal>
  )
}

export default BottomModal

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
})
