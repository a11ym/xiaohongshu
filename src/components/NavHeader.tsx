import { Pressable, StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import ThemedText from './ThemedText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';

type NavHeaderProps = {
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
  title?: string;
  back?: boolean;
  backgroundColor?: string;
  onGobackPress?: () => void;
}
const NavHeader = ({
  leftComponent,
  centerComponent,
  rightComponent,
  title,
  back,
  backgroundColor,
  onGobackPress,
}: NavHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const { iconColor } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor,
      // paddingLeft: insets.left + 10,
      // paddingRight: insets.right + 10,
      paddingTop: insets.top
    }]}>
      <View style={styles.headerContainer}>
        {/* 左侧容器 */}
        <View style={styles.leftContainer}>
          {back && <Pressable style={styles.icon} onPress={() => onGobackPress ? onGobackPress() : navigation.goBack()}><Feather name='chevron-left' size={30} color={iconColor} /></Pressable>}
          {leftComponent && <>{leftComponent}</>}
        </View>
        {/* 中间容器 */}
        <View style={styles.centerContainer}>
          {centerComponent ? <Pressable>{centerComponent}</Pressable> : <ThemedText numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</ThemedText>}
        </View>
        {/* 右侧容器 */}
        <View style={styles.rightContainer}>
          {rightComponent && <Pressable>{rightComponent}</Pressable>}
        </View>
      </View>
    </View>
  )
}

export default NavHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
  },
  icon: {
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})