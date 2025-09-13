import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Trending = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Trending</Text>
    </ContainerView>
  )
}

export default Trending

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