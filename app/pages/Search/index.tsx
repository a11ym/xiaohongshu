import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'

const Search = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <NavHeader title="搜索" back />
      <Text style={{marginTop: 80}} onPress={() => navigation.goBack()}>返回</Text>
      <Text>Search</Text>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})