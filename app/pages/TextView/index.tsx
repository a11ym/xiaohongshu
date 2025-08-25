import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import NavHeader from '../../components/NavHeader'
import Ionicons from '@react-native-vector-icons/feather';

const LeftComponent = ({ navigation }: { navigation: any }) => (
  <Pressable onPress={() => navigation.goBack()}>
    <Ionicons name="x" size={24} color="black" />
  </Pressable>
)

const RightComponent = ({ text }: { text: string }) => {
  const nextStep = () => {
    if (text) {

    }
  }
  return (
    (
      <Pressable
        disabled={!text}
        onPress={nextStep}
        style={styles.rightContainer}
      >
        <View style={[
          styles.stepButton,
          {
            backgroundColor: text ? '#007AFF' : '#ccc',
          }]}>
          <Text>下一步</Text>
        </View>
      </Pressable>
    )
  )
}

const TextView = ({ navigation }: { navigation: any }) => {
  const [text, setText] = useState('');
  return (
    <View>
      <NavHeader
        title="写文字"
        back={true}
        leftComponent={<LeftComponent navigation={navigation} />}
        rightComponent={<RightComponent text={text} />}
      />
      <View style={styles.inputContainer}>
        <Text>输入文字</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入文字"
          placeholderTextColor="#999"
          multiline={true}
          maxLength={100}
          caretHidden={true}
          numberOfLines={10}
          onChangeText={(text) => setText(text)}
          value={text}
        />
      </View>
    </View>
  )
}

export default TextView

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stepButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  inputContainer: {
    margin: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
})