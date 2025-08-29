import { StyleSheet, View } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/feather'
import ThemedText from '../../../components/ThemedText'

const IconText = () => {
  return (
    <View style={styles.messageContent}>
      <View style={styles.messageIcon}>
        <Icon name='thumbs-up' size={24} color="black"></Icon>
        <ThemedText style={styles.messageText}>赞和收藏</ThemedText>
      </View>
      <View style={styles.messageIcon}>
        <Icon name='plus' size={24} color="black"></Icon>
        <ThemedText style={styles.messageText}>新增关注</ThemedText>
      </View>
      <View style={styles.messageIcon}>
        <Icon name='message-circle' size={24} color="black"></Icon>
        <ThemedText style={styles.messageText}>评论和@</ThemedText>
      </View>
    </View>
  )
}

export default IconText

const styles = StyleSheet.create({
  // 消息顶部
  messageContent: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  messageIcon: {
    flex: 1,
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})