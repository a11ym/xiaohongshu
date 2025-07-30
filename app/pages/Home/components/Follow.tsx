import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ContainerView from "../../../components/ContainerView";
import ThemedText from "../../../components/ThemedText";
import { useTheme } from "../../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import Icon from '@react-native-vector-icons/feather'

interface Item {
  id: number;
  title: string;
  content: string;
  image_url: string;
  avatar: string;
}

const Follow = () => {
  const navigation = useNavigation()
  const { darkContainerBackgroundColor } = useTheme()
  const DATA: Item[] = Array.from({ length: 100 }, (_, i) =>
  ({
    id: i,
    title: `Item：${i}${Math.random().toString(36).substring(7) + Math.random().toString(36)}`,
    content: `Content ${i + 1}`,
    image_url: `https://picsum.photos/200/300?random=${i}`,
    avatar: `https://picsum.photos/100/100`
  })
  );

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const handlePress = (item: Item) => {
    console.log("🚀 ~ handlePress ~ item:", item.id)
    navigation.navigate('Detail', { itemId: item.id })
  }
  return (
    <ContainerView style={{ flex: 1 }}>
      <FlashList
        data={DATA}
        masonry
        numColumns={2}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          setTimeout(() => {
            setRefreshing(false)
          }, 2000)
        }}
        renderItem={({ item }) =>
          <Pressable
            onPress={() => handlePress(item)}
            style={[styles.container, { backgroundColor: darkContainerBackgroundColor }]}
            key={item.id} >
            <Image source={{ uri: item?.image_url }} style={styles.image} />
            <View style={styles.contentContainer}>
              <ThemedText style={styles.title}>{item?.title}</ThemedText>
              <ThemedText style={styles.content}>{item?.content}</ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: item?.avatar }} style={{ width: 20, height: 20, borderRadius: 10 }} />
                <ThemedText style={{ marginLeft: 5 }}>User</ThemedText>
                <View style={{ flex: 1 }} />
                <Icon name="heart" size={12} color="#ddd" />
                <ThemedText style={{ marginLeft: 5 }}>12</ThemedText>
              </View>
            </View>
          </Pressable>
        }
        estimatedItemSize={200}
      />
    </ContainerView>
  )
}

export default Follow

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  contentContainer: {
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    fontSize: 14,
    color: '#666'
  }

})