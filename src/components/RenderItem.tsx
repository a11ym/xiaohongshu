import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import ThemedText from './ThemedText'
import Feather from '@react-native-vector-icons/feather'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import { Data } from '../pages/Home/Data';

type Props = {
  item: Data
  index: number
}

const RenderItem = ({ item, index }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const { darkContainerBackgroundColor } = useTheme()
  const viewRef = useRef<View>(null)
  const handlePress = () => {
    //测量
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        const origin = {
          x: pageX,
          y: pageY,
          width,
          height
        }
        // onPress(item,origin)
        navigation.navigate('Detail', { item, origin } as { item: Data; origin: { x: number; y: number; width: number; height: number } })
      })
    }
  }
  // const onPress = (item, origin) => {
  //   navigation.navigate('Detail', { item, origin })
  // }
  return (
    <Animated.View entering={FadeInDown.delay(200 * index)}>
      <Pressable
        ref={viewRef}
        onPress={handlePress}
        style={[styles.container, { backgroundColor: darkContainerBackgroundColor }]}
        key={item.id} >
        <Animated.Image sharedTransitionTag={item.name} source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.contentContainer}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.content}>{item.content}</ThemedText>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <ThemedText>{item.name}</ThemedText>
            <View style={styles.zone} />
            <Feather name="heart" size={16} color="#ddd" />
            <ThemedText>{item.like}</ThemedText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  },
  userInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  zone: {
    flex: 1
  }
})