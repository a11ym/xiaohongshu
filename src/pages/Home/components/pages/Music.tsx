import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Music = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Music</Text>
    </ContainerView>
  )
}

export default Music

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  }
})