import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@react-native-vector-icons/feather'
import ThemeText from '../../../components/ThemeText'
import { useTheme } from '../../../hooks/useTheme'
const List = ({onLogout}:{onLogout:()=>void}) => {
  const { iconColor, backgroundColor,containerBackgroundColor } = useTheme()
  const renderListDataPart = [
    {
      title: '账号与安全',
      icon: 'user',
    },
    {
      title: '通用设置',
      icon: 'info',
    },
    {
      title: '通知设置',
      icon: 'help-circle',
    },
    {
      title: '隐私设置',
      icon: 'lock',
    }
  ]
  const renderListDataPart2 = [
    {
      title: '存储空间',
      icon: 'info',
    },
    {
      title: '内容偏好调节',
      icon: 'help-circle',
    },
    {
      title: '收获地址',
      icon: 'lock',
    },
    {
      title: '添加小组件',
      icon: 'lock',
    },
    {
      title: '未成年人模式',
      icon: 'lock',
    }
  ]
  const renderListDataPart3 = [
    {
      title: '帮助与客服',
      icon: 'info',
    },
    {
      title: '关于小红书',
      icon: 'help-circle',
    },
  ]
  const renderListDataPart4 = [
    {
      title: '切换账号',
      icon: ''
    },
    {
      title: '退出登录',
      icon: ''
    }
  ]
  return (
    <ScrollView style={[styles.container,{backgroundColor: containerBackgroundColor}]}>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart.map((item, index) => {
            return (
              <View style={[styles.containerContent]} key={index}>
                <Feather name={item.icon} size={24} color={iconColor} />
                <View style={[styles.containerItem, { borderBottomWidth: index === renderListDataPart.length - 1 ? 0 : 1 }]}>
                  <ThemeText style={styles.text}>{item.title}</ThemeText>
                  <Feather name="chevron-right" size={24} color={iconColor} />
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart2.map((item, index) => {
            return (
              <View style={[styles.containerContent]} key={index}>
                <Feather name={item.icon} size={24} color={iconColor} />
                <View style={[styles.containerItem, { borderBottomWidth: index === renderListDataPart2.length - 1 ? 0 : 1 }]}>
                  <ThemeText style={styles.text}>{item.title}</ThemeText>
                  <Feather name="chevron-right" size={24} color={iconColor} />
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart3.map((item, index) => {
            return (
              <View style={[styles.containerContent]} key={index}>
                <Feather name={item.icon} size={24} color={iconColor} />
                <View style={[styles.containerItem, { borderBottomWidth: index === renderListDataPart3.length - 1 ? 0 : 1 }]}>
                  <ThemeText style={styles.text}>{item.title}</ThemeText>
                  <Feather name="chevron-right" size={24} color={iconColor} />
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={[styles.containerPart, { backgroundColor }]}>
        {
          renderListDataPart4.map((item, index) => {
            return (
              <View style={[styles.containerContent]} key={index}>
                <Pressable
                onPress={onLogout}
                 style={[styles.containerItem, { justifyContent: 'center', borderBottomWidth: index === renderListDataPart4.length - 1 ? 0 : 1 }]}>
                  <ThemeText style={styles.text}>{item.title}</ThemeText>
                </Pressable>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  containerPart: {
    borderRadius: 20,
    marginTop: 20,
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerItem: {
    marginLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    // fontWeight: 'bold',
  }
})