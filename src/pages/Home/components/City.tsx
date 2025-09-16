import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../../components/ThemedText';
import ContainerView from '../../../components/ContainerView';
import Switch from '../../../components/Switch';
const City = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(false)
  return (
    <ContainerView style={styles.container}>
      <Text>Home Screen</Text>
      <Text style={styles.text} onPress={() => navigation.navigate('My' as never)}>Go to My</Text>
      <Text style={styles.text} onPress={() => navigation.navigate('Detail' as never)}>Go to Details</Text>
      <ThemedText style={styles.text} onPress={() => navigation.navigate('Search' as never)}>Go to Search</ThemedText>
      <ThemedText style={styles.text} onPress={() => navigation.navigate('WebView' as never)}>Go to WebView</ThemedText>
      <ThemedText style={styles.text} onPress={() => navigation.navigate('Chat' as never)}>Go to Chat</ThemedText>
      <ThemedText style={styles.text} onPress={() => navigation.navigate('WebView' as never)}>Go to WebView2</ThemedText>
      <Switch value={value} handleSwitch={value => setValue(value)} />
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