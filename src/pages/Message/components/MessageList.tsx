import { FlatList, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from '../../../components/ThemedText'
import IconText from './IconText'
import { useTheme } from '../../../hooks/useTheme'
import data from '../data'
const MessageList = () => {
  const { backgroundColor } = useTheme()
  return (
    <View style={[styles.container, {
      backgroundColor,
    }]}>
      <IconText />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.content} key={item.id}>
            <Image style={styles.avatar} source={{ uri: item.avatar }}></Image>
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
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