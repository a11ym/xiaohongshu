import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const Dressing = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>Dressing</Text>
    </ContainerView>
  )
}

export default Dressing

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
