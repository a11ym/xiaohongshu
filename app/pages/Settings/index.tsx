import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import List from './components/List'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'
import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const Settings = ({onLogout}:{onLogout:(name:string)=>void}) => {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();
  
  return (
    <ContainerView style={{ flex: 1 }}>
      {/* <Text style={{marginTop:80}} onPress={() => navigation.goBack()}>fanhui</Text> */}
      <NavHeader title="设置" back={true} />
      <Text>{drawerStatus}</Text>
      <List onLogout={onLogout} />
    </ContainerView>

  )
}

export default Settings

const styles = StyleSheet.create({})