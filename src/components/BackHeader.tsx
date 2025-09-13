import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getHeaderTitle } from '@react-navigation/elements';
import Icon from '@react-native-vector-icons/feather';
import ThemedText from './ThemedText';
import { useTheme } from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BackHeader = ({ navigation, route, options, back }: any) => {
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name)
  const { iconColor, containerBackgroundColor, isDarkMode } = useTheme()
  return (
    <View style={[{ backgroundColor: containerBackgroundColor, paddingTop: insets.top }, styles.header]}>
      <View style={styles.container}>
        <View style={styles.back}>
          <Icon onPress={() => navigation.goBack()} name="chevron-left" size={30} color={iconColor} />
          {/* {back && <Text>返回</Text>} */}
        </View>
        <View style={styles.titleContent}>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>
        <View style={styles.rightContent}>
          {/* <Icon name="user-plus" size={24} color="black" />
        <ThemedText onPress={() => navigation.navigate('Search')}>发现群聊</ThemedText> */}
        </View>
      </View>
    </View>
  )
}


export default BackHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10
    // justifyContent: 'space-between',
    // paddingHorizontal: 10,
    // height: 50,
  },
  titleContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})