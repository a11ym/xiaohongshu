import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Shoes = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Shoes</Text>
    </ContainerView>
  )
}

export default Shoes

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