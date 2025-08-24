import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ShortVideoPlayer from '../../components/ShortVideoPlayer'
const Hot = () => {
  return (
    <View style={{ flex: 1 }}>
      <ShortVideoPlayer />
    </View>
    // <ContainerVideo>
    //   <Text style={{ fontSize: 20, color: '#000',position: 'absolute', top: 150, left: 50}} onPress={handle}>切换</Text>
    // </ContainerVideo>
  )
}

export default Hot

const styles = StyleSheet.create({})