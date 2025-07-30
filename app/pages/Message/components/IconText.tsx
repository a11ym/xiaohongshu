import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/feather'
import ThemedText from '../../../components/ThemedText'

const IconText = () => {
  return (
    <View style={styles.messageContent}>
      <View style={styles.messageIcon}>
        <Icon name='user' size={24} color="black"></Icon>
        <ThemedText style={styles.messageText}>赞和收藏</ThemedText>
      </View>
      <View style={styles.messageIcon}>
        <Icon name='user' size={24} color="black"></Icon>
        <ThemedText style={styles.messageText}>新增关注</ThemedText>
      </View>
      <View style={styles.messageIcon}>
        <Icon name='user' size={24} color="black"></Icon>
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
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 16
  },
  messageIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
})