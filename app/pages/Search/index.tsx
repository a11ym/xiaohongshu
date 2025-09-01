import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'

const Search = ({navigation}: {navigation: any}) => {
  return (
    <ContainerView>
      <NavHeader title="搜索" back />
      <Text style={{marginTop: 80}} onPress={() => navigation.goBack()}>返回</Text>
      <Text>Search</Text>
    </ContainerView>
  )
}

export default Search

const styles = StyleSheet.create({})