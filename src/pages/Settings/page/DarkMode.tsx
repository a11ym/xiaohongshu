import { Appearance, StyleSheet, Switch, Text, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import NavHeader from '../../../components/NavHeader'
import ContainerView from '../../../components/ContainerView'
import ThemedText from '../../../components/ThemedText'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemeManager from '../../../utils/ThemeManager'
const DarkMode = () => {
  const {
    isDarkMode,
    followSystemTheme,
    toggleFollowSystem,
    toggleDarkMode,
  } = ThemeManager();

  return (
    <ContainerView>
      <NavHeader title="深色模式" back={true} />
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <ThemedText>深色模式</ThemedText>
          </View>
          <View style={styles.itemRight}>
            <Switch 
            // disabled={followSystemTheme} 
            value={isDarkMode} onValueChange={toggleDarkMode}></Switch>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <ThemedText>跟随系统</ThemedText>
          </View>
          <View style={styles.itemRight}>
            <Switch value={followSystemTheme} onValueChange={toggleFollowSystem} />
          </View>
        </View>
      </View>
    </ContainerView>
  )
}

export default DarkMode

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})