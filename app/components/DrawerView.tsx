// components/CustomDrawerContent.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem, useDrawerStatus } from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/feather';
import ThemeText from './ThemeText';
import { useTheme } from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// 自定义侧边栏内容
const DrawerView = (props: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();
  console.log("🚀 ~ DrawerView ~ drawerStatus:", drawerStatus)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // props.navigation.openDrawer()
  //     return () => {
  //       console.log('Settings页面卸载')
  //       if (props.navigation && drawerStatus !== 'open') {
  //         setTimeout(() => {
  //           // props.navigation.openDrawer()
  //         }, 50)
  //       }
  //     }
  //   }, [navigation, drawerStatus])
  // )
  const { backgroundColor, containerBackgroundColor, isDarkMode, drawerContentScrollView } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: containerBackgroundColor }}>
      <DrawerContentScrollView style={[styles.container]} {...props}>
        <DrawerItem
          label={() => <ThemeText>设置</ThemeText>}
          icon={() => <Ionicons name="home" size={22} color={isDarkMode ? "#fff" : "#000"} />}
          onPress={() => { props.navigation.jumpTo('Home', { screen: 'Search' }) }}
        >
        </DrawerItem>
        {/* <ThemeText>{drawerStatus}</ThemeText> */}
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>发现好友</ThemeText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>小红书兴趣季</ThemeText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>创作者中心</ThemeText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>我的草稿</ThemeText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>我的评论</ThemeText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>浏览记录</ThemeText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>订单</ThemeText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>购物车</ThemeText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>钱包</ThemeText>
          </TouchableOpacity>
        </View>

        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>小程序</ThemeText>
          </TouchableOpacity>
        </View>

        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemeText style={styles.customItemText}>社区公约</ThemeText>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemeText style={styles.bottomItemText}>扫一扫</ThemeText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemeText style={styles.bottomItemText}>帮助与客服</ThemeText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}
          onPress={() => props.navigation.navigate('Home', { screen: 'Settings' })}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemeText style={styles.bottomItemText}>设置</ThemeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItem: {
    borderRadius: 8,
    marginBottom: 10,
  },
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  customItemText: {
    marginLeft: 16,
    fontSize: 16,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 32,
  },
  bottomItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomItemText: {
    fontSize: 12,
    marginTop: 6,
  }
});

export default DrawerView;