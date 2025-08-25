import { Image, ScrollView, StyleSheet, View } from 'react-native'
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
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <IconText></IconText>
      <View style={styles.container}>
        {
          messageList.map(item => {
            return (
              <View style={styles.content} key={item.id}>
                <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={require('../../../assets/1.png')}></Image>
                <View style={styles.contentText}>
                  <ThemedText>{item.title}</ThemedText>
                  <ThemedText>{item.content}</ThemedText>
                </View>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default MessageList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 0.5,
  },
  contentText: {
    marginLeft: 10,
  }
})