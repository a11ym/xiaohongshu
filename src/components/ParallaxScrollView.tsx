import type { PropsWithChildren, ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';

import ThemedView from './ThemedView';
// import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
// import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_MAX_HEIGHT = 250;
// const HEADER_MIN_HEIGHT = 100;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEADER_NAV_HEIGHT = 50;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const navigation = useNavigation();
  // const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const insets = useSafeAreaInsets();
  // const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT],
            [-HEADER_MAX_HEIGHT / 2, 0, HEADER_MAX_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  }, [scrollOffset]);

  const openSidebar = () => {
    console.log('openSidebar');
    navigation.dispatch({ type: 'OPEN_DRAWER' });
  };
  const openScan = () => {
    console.log('openScan');
  };
  const toggleModal = () => {
    console.log('toggleModal');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.topNavContainer, {
        paddingTop: insets.top,
        left: insets.left,
        right: insets.right,
        height: HEADER_NAV_HEIGHT + insets.top,
      }]}>
        <Animated.View style={[styles.topNav]} >
          <Pressable style={styles.backButton}>
            <Ionicons onPress={openSidebar} name="menu" size={24} color="white" />
          </Pressable>
          <View style={styles.menuButtonContainer}>
            {
              Platform.OS !== 'web' && <Pressable
                onPress={openScan}>
                <Ionicons name="camera" size={24} color="white" />
              </Pressable>
            }
            <Pressable
              onPress={toggleModal}>
              <Ionicons name="share-2" size={24} color="white" />
            </Pressable>
          </View>

        </Animated.View>
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
      // scrollIndicatorInsets={{ bottom }}
      // contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor['dark'] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  header: {
    height: HEADER_MAX_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'gray'
  },

  topNavContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    // backgroundColor: 'red'
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
    // paddingVertical: 8,
    // backgroundColor: 'yellow'
  },

  backButton: {
    flex: 1,
    // backgroundColor: 'green'
  },
  menuButtonContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
});
