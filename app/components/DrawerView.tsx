// components/CustomDrawerContent.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/feather';
import ThemedText from './ThemedText';
import { useTheme } from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// 自定义侧边栏内容
const DrawerView = (props: any) => {
  const insets = useSafeAreaInsets();
  const { backgroundColor, containerBackgroundColor, isDarkMode } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: containerBackgroundColor }}>
      {/* <View style={{ height: insets.top }} /> */}
      <DrawerContentScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]} {...props}>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>发现好友</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>小红书兴趣季</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>创作者中心</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>我的草稿</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>我的评论</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>浏览记录</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>订单</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>购物车</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>钱包</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>小程序</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={[styles.menuItem, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity style={[styles.customItem]}
            onPress={() => { props.navigation.navigate('Home', { screen: 'Settings' }) }}>
            <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <ThemedText style={styles.customItemText}>社区公约</ThemedText>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemedText style={styles.bottomItemText}>扫一扫</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemedText style={styles.bottomItemText}>帮助与客服</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}
          onPress={() => props.navigation.navigate('Home', { screen: 'Settings' })}>
          <Ionicons name="settings" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <ThemedText style={styles.bottomItemText}>设置</ThemedText>
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