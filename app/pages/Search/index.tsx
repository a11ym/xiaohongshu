import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Search = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text style={{marginTop: 80}} onPress={() => navigation.goBack()}>返回</Text>
      <Text>Search</Text>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})