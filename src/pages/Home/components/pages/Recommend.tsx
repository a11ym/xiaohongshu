import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Recommend = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Recommend</Text>
    </ContainerView>
  )
}

export default Recommend

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