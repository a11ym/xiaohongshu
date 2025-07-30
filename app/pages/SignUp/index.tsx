import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@react-navigation/elements'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const signIn = ({ username, password }: { username: string; password: string }) => {
    
  }
  return (
    <View>
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
      <Button onPress={() => signIn({ username, password })}>Sign in</Button>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})