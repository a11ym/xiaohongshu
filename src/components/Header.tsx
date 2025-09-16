import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from '@react-native-vector-icons/feather'
type Props = {
  active: SharedValue<boolean>
}

const Header = ({ active }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable
        style={styles.ham}
        onPress={() => {
          active.value = true
        }}
      >
        <Feather name="menu" size={24} color="#333" />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#666',
  },
  ham: {
    width: 24,
    height: 24,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: 'red'
  }
})