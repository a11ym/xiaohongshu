import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Live = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Live</Text>
    </ContainerView>
  )
}

export default Live

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