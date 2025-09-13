import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import LottieView from 'lottie-react-native';

const Search = ({navigation}: {navigation: any}) => {
  return (
    <ContainerView>
      <NavHeader title="搜索" back />
      <LottieView
        source={require('../../assets/refresh.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </ContainerView>
  )
}

export default Search

const styles = StyleSheet.create({})