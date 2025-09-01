import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ContainerView from '../../../../components/ContainerView'

const MenMakeup = () => {
  return (
    <ContainerView>
      <Text style={styles.text}>MenMakeup</Text>
    </ContainerView>
  )
}

export default MenMakeup

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