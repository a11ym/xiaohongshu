import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@react-navigation/elements'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={() => { }}>Sign in</Button>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
})