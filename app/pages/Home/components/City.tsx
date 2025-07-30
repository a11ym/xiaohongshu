import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../../components/ThemedText';
import ContainerView from '../../../components/ContainerView';
const City = () => {
  const navigation = useNavigation();
  return (
    <ContainerView style={styles.container}>
      <Text>Home Screen</Text>
      <Text style={styles.text} onPress={() => navigation.navigate('My' as never)}>Go to My</Text>
      <Text style={styles.text} onPress={() => navigation.navigate('Detail' as never)}>Go to Details</Text>
      <ThemedText style={styles.text} onPress={() => navigation.navigate('Search' as never)}>Go to Search</ThemedText>
    </ContainerView>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20,
    marginTop: 20,
  },
})