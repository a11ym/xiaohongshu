import { Pressable, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import NavHeader from '../../../components/NavHeader'
import ContainerView from '../../../components/ContainerView'
import ThemedText from '../../../components/ThemedText'
import Feather from '@react-native-vector-icons/feather'
import { useNavigation } from '@react-navigation/native'
const General = () => {
  const navigation = useNavigation()
  const handleOpen = () => {
    navigation.navigate('DarkMode' as never)
  }

  return (
    <ContainerView style={{ flex: 1 }}>
      <NavHeader title="通用设置" back={true} />
      <View style={styles.container}>
        <ThemedText>显示</ThemedText>
        <Pressable onPress={handleOpen} style={styles.item}>
          <View style={styles.itemTitle}>
            <ThemedText>深色模式</ThemedText>
          </View>
          <View style={styles.itemRight}>
            <Feather name="chevron-right" size={24} color="gray" />
          </View>
        </Pressable>
      </View>
    </ContainerView>
  )
}

export default General

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})