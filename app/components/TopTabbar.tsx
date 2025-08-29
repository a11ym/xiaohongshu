import { View, TouchableOpacity, Platform, StyleSheet, Pressable } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/feather';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
export default function TopTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  const [width, setWidth] = useState(0);
  const { buildHref } = useLinkBuilder();
  const { backgroundColor, tabBarFontColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const getLayout = (e) => {
    setWidth(e.nativeEvent.layout.width)
    console.log(e.nativeEvent.layout);
  };
  console.log(Platform.OS)

  useEffect(() => {
    getLayout
  }, [width])
  const openDrawer = () => {
      navigation.dispatch({ type: 'OPEN_DRAWER' });
  }

  return (
    <View style={[styles.TopTabBarContainer, { backgroundColor, paddingTop: insets.top }]}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Pressable
            onPress={openDrawer}
          >
            <Ionicons name="menu" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </Pressable>
        </View>


        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              onLayout={getLayout}
              href={buildHref(route.name, route.params)}
              accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.centerContainer}
            >
              <Animated.Text style={[styles.Text, { color: isFocused ? tabBarFontColor.primary : tabBarFontColor.text }]}>
                {label}
              </Animated.Text>

              {isFocused && (
                <View style={styles.indicator} />
              )}
            </TouchableOpacity>
          );
        })}
        <View style={styles.searchContainer}>

          <Pressable
            onPress={() => {
              navigation.navigate('Search');
            }}
          >
            <Ionicons name="search" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopTabBarContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 8
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  centerContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    height: 2,
    width: 20,
    backgroundColor: '#ff2e4d',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});