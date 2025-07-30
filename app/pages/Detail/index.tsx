import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'

const LeftComponent = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Left</Text>
    </View>
  )
}

const Details = ({ route }: { route: any }) => {
  console.log("🚀 ~ Details ~ route:", route)
  return (
    <ContainerView style={{ flex: 1 }}>
      <NavHeader
        title={route.params.itemId}
        back={true}
        leftComponent={<LeftComponent />}
      />
      <View>
        <Text>Details</Text>
      </View>
    </ContainerView>
  )
}

export default Details

const styles = StyleSheet.create({})