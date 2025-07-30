import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import ThemedText from './ThemedText';

interface NavHeaderProps {
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
  title?: string;
  back?: boolean;
  backgroundColor?: string;
}
const NavHeader = ({
  leftComponent,
  centerComponent,
  rightComponent,
  title,
  back,
  backgroundColor,
}: NavHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { iconColor } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor, paddingTop: insets.top + 10 }]}>
      <View style={styles.headerContainer}>
        {/* 左侧容器 */}
        <View style={styles.leftContainer}>
          {back && <Feather onPress={() => navigation.goBack()} name='chevron-left' size={24} color={iconColor} />}
          {leftComponent && <>{leftComponent}</>}
        </View>
        {/* 中间容器 */}
        <View style={styles.centerContainer}>
          {centerComponent ? <Pressable>{centerComponent}</Pressable> : <ThemedText style={styles.title}>{title}</ThemedText>}
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
    // height: 44,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})