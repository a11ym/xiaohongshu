import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../hooks/useTheme';
import MessageList from './components/MessageList';
import NavHeader from '../../components/NavHeader';
import Feather from '@react-native-vector-icons/feather';
import ThemedText from '../../components/ThemedText';
import ContainerView from '../../components/ContainerView';
const RightComponent = ({ color }: { color: string }) => (
  <View style={[styles.rightContainer]}>
    <Feather name="users" size={24} color={color} />
    <ThemedText>发现群聊</ThemedText>
  </View>
)

const Message = () => {
  const { iconColor, backgroundColor } = useTheme()
  return (
    <ContainerView>
      <NavHeader
        backgroundColor={backgroundColor}
        title="消息"
        rightComponent={<RightComponent color={iconColor} />}
      />
      <MessageList></MessageList>
    </ContainerView>
  )
}

export default Message

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  }
})
