import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import ThemedText from '../../components/ThemedText'

interface Item {
  id: number;
  title: string;
  content: string;
  image_url: string;
  avatar: string;
}

const LeftComponent = ({ itemData }: { itemData: Item }) => {
  return (
    <View style={styles.leftContainer}>
      <Image source={{ uri: itemData.avatar }} style={styles.leftAvatar}></Image>
      <ThemedText>{itemData.content}</ThemedText>
    </View>
  )
}

const RightComponent = () => {
  return (
    <View style={styles.rightContainer}>
      <View style={styles.rightItem}>
        <ThemedText style={{ color: 'red' }}>关注</ThemedText>
      </View>
      <ThemedText>Right</ThemedText>
    </View>
  )
}

const Details = ({ route }: { route: any }) => {
  console.log("🚀 ~ Details ~ route:", route)
  return (
    <ContainerView>
      <NavHeader
        // title={route.params.item.id}
        back={true}
        leftComponent={<LeftComponent itemData={route.params.item} />}
        rightComponent={<RightComponent />}
      />
      <View>
        <Image source={{ uri: route.params.item.image_url }} style={{ width: 200, height: 200 }}></Image>
        <ThemedText>{route.params.item.content}</ThemedText>
        <ThemedText>{route.params.item.title}</ThemedText>
      </View>
    </ContainerView>
  )
}

export default Details

const styles = StyleSheet.create({
  leftAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  rightItem: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 1,
  }
})