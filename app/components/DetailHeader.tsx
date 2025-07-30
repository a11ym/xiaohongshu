import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import Ionicons from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 自定义导航头组件
const DetailHeader = ({ navigation, route, options, back }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      {/* 左侧返回按钮 */}
      {back && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name='chevron-left'
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      )}

      {/* 居中区域 */}
      <View style={styles.centerContainer}>
        {/* 标题 */}
        <Animated.Text
          style={[
            styles.titleText,
          ]}
          numberOfLines={1}
        >
          {route.params?.itemId || '详情'}
        </Animated.Text>
      </View>

      {/* 右侧区域 */}
      <View style={styles.rightContainer}>
        {/* <Text>分享</Text> */}
        <Text>分享</Text>
      </View>
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});