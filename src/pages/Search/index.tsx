import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import LottieView from 'lottie-react-native';
const { width } = Dimensions.get('window')

const Search = () => {
  return (
    <ContainerView>
      <NavHeader title="搜索" back />
      <LottieView
        source={require('../../assets/refresh.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </ContainerView>
  )
}

export default Search

const styles = StyleSheet.create({
  lottie: {
    width: width,
    height: width,
  }
})