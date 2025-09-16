import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Drawer = () => {
  return (
    <View style={styles.container}>
      <Text>Drawer</Text>
    </View>
  )
}

export default Drawer

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
    zIndex: -99,
  }
})