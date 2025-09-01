import { FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedText from '../../../components/ThemedText'
import messageData from '../data.json'
import IconText from './IconText'
import { useTheme } from '../../../hooks/useTheme'
type Message = {
  id: number,
  title: string,
  content: string,
  date: string,
  image: string
}
const MessageList = () => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const { backgroundColor } = useTheme()
  useEffect(() => {
    setMessageList(messageData)
  }, [])
  return (
    <View style={[styles.container, {
      backgroundColor,
    }]}>
      <IconText />
      <FlatList
        data={messageList}
        renderItem={({ item }) => (
          <View style={styles.content} key={item.id}>
            <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: item.image }}></Image>
            <View style={styles.contentText}>
              <ThemedText>{item.title}</ThemedText>
              <ThemedText>{item.content}</ThemedText>
            </View>
          </View>
        )} />
    </View>
  )
}

export default MessageList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  contentText: {
    flex: 1,
    gap: 5,
  },
})