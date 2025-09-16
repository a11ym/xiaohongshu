import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import ThemedText from '../../components/ThemedText'
import { RouteProp } from '@react-navigation/native'
import { HomeStackParamList } from '../../navigation/HomeStack'
import { Data } from '../../pages/Home/Data'
import Animated from 'react-native-reanimated'
type DetailRouteParam = RouteProp<HomeStackParamList, 'Detail'>

type Props = {
  route: DetailRouteParam
}

const LeftComponent = ({ leftData }: { leftData: Data }) => {
  return (
    <View style={styles.leftContainer}>
      <Image source={{ uri: leftData.avatar }} style={styles.leftAvatar} />
      <ThemedText>{leftData.name}</ThemedText>
    </View>
  )
}

const RightComponent = () => {
  return (
    <View style={styles.rightContainer}>
      <View style={styles.rightItem}>
        <ThemedText style={styles.rightText}>关注</ThemedText>
      </View>
      <ThemedText>Right</ThemedText>
    </View>
  )
}

const Details = ({ route }: Props) => {
  console.log("🚀 ~ Details ~ route:", route)
  const { item } = route.params
  const { width } = useWindowDimensions()
  return (
    <Animated.View style={styles.container}>
      <ContainerView>
        <NavHeader
          back={true}
          leftComponent={<LeftComponent leftData={item} />}
          rightComponent={<RightComponent />}
        />
        <View>
          <Animated.Image
            sharedTransitionTag={item.name}
            source={{ uri: item.image_url }} style={{ width: width, height: width }} />
          <ThemedText>{item.content}</ThemedText>
          <ThemedText>{item.title}</ThemedText>
        </View>
      </ContainerView>
    </Animated.View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  rightText: {
    color: 'red',
  },
  image: {
    width: '100%',
    height: 200,
  }
})