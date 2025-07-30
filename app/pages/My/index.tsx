import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  withTiming,
  useScrollViewOffset,
} from 'react-native-reanimated';
import FontAwesome from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
const My = () => {
  const navigation = useNavigation();
  const openSidebar = () => {
    console.log('打开侧边栏');
    navigation.openDrawer();
  };

  const listData = Array.from({ length: 60 }, (_, i) => ({ id: i + 1, title: `Item ${i + 1}` }));
  const [sticky, setSticky] = useState(false); // 是否吸顶
  const scrollViewRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const stickyOffset = 100; // 滚动到距离顶部100px时固定

  const insets = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // 动画值
  const headerHeight = useSharedValue(350); // 顶部区域初始高度
  const navHeight = useSharedValue(50); // 顶部导航栏高度
  const scrollOffset = useScrollViewOffset(scrollRef); // 滚动偏移量
  console.log("🚀 ~ My ~ scrollOffset:", scrollOffset)
  const titleOpacity = useSharedValue(0); // 顶部标题透明度
  const topNavOpacity = useSharedValue(0); // 顶部导航栏透明度
  const avatarOpacity = useSharedValue(0); // 头像透明度
  const avatarSize = useSharedValue(30); // 头像大小
  const avatarY = useSharedValue(30); // 头像Y坐标
  const avatarX = useSharedValue(width / 2); // 头像X坐标
  const tabBarOpacity = useSharedValue(0); // 标签栏透明度
  const backgroundOpacity = useSharedValue(1); // 背景图透明度
  const navBackgroundColor = useSharedValue('transparent'); // 背景颜色

  // useEffect(() => {
  //   // 获取sticky元素的位置信息
  //   if (stickyHeaderRef.current) {
  //     stickyHeaderRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       console.log('Sticky element position:', pageY);
  //     });
  //   }
  // }, []);

  // 滚动事件处理
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      console.log("🚀 ~ My ~ y:", y)
      // setSticky(y > stickyOffset); // 滚动距离超过stickyOffset时固定

      //限制滚动值范围
      // const newScrollOffset = Math.max(0, Math.min(y, headerHeight.value));
      // scrollOffset.value = withSpring(newScrollOffset);
      // 根据滚动位置调整动画值
      navBackgroundColor.value = withSpring(y > 100 ? '#f12' : 'transparent');
      avatarOpacity.value = withSpring(y > 100 ? 1 : 0);
    },
  });

  // 顶部区域样式动画
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value + insets.top,
    }
  });
  //
  const headerStylePaddingTop = useAnimatedStyle(() => {
    return {
      paddingTop: insets.top + navHeight.value,
    }
  })

  // 顶部导航栏样式动画
  const topNavStyle = useAnimatedStyle(() => {
    return {
      paddingTop: insets.top,
      height: navHeight.value + insets.top,
      backgroundColor: navBackgroundColor.value,
    }
  })



  // 头像样式动画
  const avatarStyle = useAnimatedStyle(() => ({
    width: avatarSize.value,
    height: avatarSize.value,
    borderRadius: avatarSize.value / 2,
    opacity: avatarOpacity.value,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 5,
    // transform: [
    //   {
    //     translateY: avatarY.value,
    //   },
    // ]
  }));

  // 背景图样式动画
  // const backgroundStyle = useAnimatedStyle(() => ({
  //   opacity: backgroundOpacity.value,
  // }));

  // 标签栏样式动画
  // const tabBarStyle = useAnimatedStyle(() => ({
  //   opacity: tabBarOpacity.value,
  //   transform: [
  //     {
  //       translateY: interpolate(headerHeight.value, [160, 300], [0, 20], Extrapolate.CLAMP)
  //     },
  //   ],
  // }));

  return (
    <Animated.View style={styles.container}>
      {/* 顶部导航栏 */}
      <Animated.View style={[styles.topNav, topNavStyle]}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome onPress={openSidebar} name="menu" size={24} color="white" />
        </TouchableOpacity>
        {/* 头像 */}
        <Animated.Image
          source={{ uri: 'https://picsum.photos/200/200' }}
          style={[avatarStyle]}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="share-2" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      {/* 内容区域 */}
      <Animated.ScrollView
        ref={scrollRef}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        style={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* 顶部区域 */}
        <Animated.View style={[styles.header]}>
          {/* 背景图 */}
          <Animated.Image
            source={{ uri: 'https://picsum.photos/800/400' }}
            style={[styles.headerBackground, headerStyle]}
            resizeMode="cover"
          />
          {/* 头像 */}
          <Animated.View style={[styles.avatarContainer, headerStylePaddingTop]}>
            <Animated.View style={styles.userInfo}>
              <Animated.View>
                <Animated.Image
                  source={{ uri: 'https://picsum.photos/200/200' }}
                  style={[styles.avatar]}
                // resizeMode="cover"
                />
              </Animated.View>
              <Animated.View style={styles.userCardId}>
                <Animated.Text style={styles.userName} onPress={() => console.log('点击这里，填写简介')}>小红书用户</Animated.Text>
                <Animated.View style={styles.userDescContent}>
                  <Animated.Text style={[styles.userDesc]} onPress={() => console.log('点击这里，填写简介')}>小红书号：</Animated.Text>
                  <Animated.Text style={[styles.userDesc]} onPress={() => console.log('点击这里，填写简介2')}>12345678</Animated.Text>
                  <FontAwesome name="square" size={12} color="white" />
                </Animated.View>
              </Animated.View>
            </Animated.View>

            <Animated.View style={styles.introduction}>
              <Animated.Text style={styles.introductionText} onPress={() => console.log('点击这里，填写简介')}>点击这里，填写简介</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.conste}>
              <Animated.View style={styles.consteContainer}>
                <FontAwesome name="square" size={10} color="white" />
                <Animated.Text style={styles.consteText}>星座</Animated.Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>

          {/* 数据 */}
          <Animated.View style={styles.dataContainer}>
            <Animated.View style={styles.dataItem}>
              <Animated.View style={styles.itemContent}>
                <Animated.Text style={styles.topText}>6</Animated.Text>
                <Animated.Text style={styles.bottomText}>关注</Animated.Text>
              </Animated.View>
              <Animated.View style={styles.itemContent}>
                <Animated.Text style={styles.topText}>6</Animated.Text>
                <Animated.Text style={styles.bottomText}>粉丝</Animated.Text>
              </Animated.View>
              <Animated.View style={styles.itemContent}>
                <Animated.Text style={styles.topText}>6</Animated.Text>
                <Animated.Text style={styles.bottomText}>获赞与收藏</Animated.Text>
              </Animated.View>
            </Animated.View>
            <Animated.View style={styles.dataItem}>
              <Animated.View style={styles.borderContent}>
                <Animated.Text style={styles.borderText}>编辑资料</Animated.Text>
              </Animated.View>
              <Animated.View style={styles.iconcontent}>
                <FontAwesome name="settings" size={12} color="white" />
              </Animated.View>
            </Animated.View>
          </Animated.View>

          {/* 横向滚动 */}
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
            contentContainerStyle={styles.scrollContainer}
          >
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>友好集市</Animated.Text>
              <Animated.Text style={styles.secondText}>友好商品友好价</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>订单</Animated.Text>
              <Animated.Text style={styles.secondText}>查看我的订单</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>购物车</Animated.Text>
              <Animated.Text style={styles.secondText}>查看推荐好物</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>小红书兴趣季</Animated.Text>
              <Animated.Text style={styles.secondText}>抢兴趣「小红盒」</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>创作灵感</Animated.Text>
              <Animated.Text style={styles.secondText}>学创作找灵感</Animated.Text>
            </Animated.View>
            <Animated.View style={styles.cardContainer}>
              <Animated.Text style={styles.scrollText}>浏览记录</Animated.Text>
              <Animated.Text style={styles.secondText}>看过的笔记</Animated.Text>
            </Animated.View>
          </Animated.ScrollView>

        </Animated.View>

        {/* 笔记网格 */}
        {/* 粘性元素容器 */}
        {!sticky ? (
          <Animated.View ref={stickyHeaderRef} style={styles.stickyHeaderContainer}>
            <View style={styles.stickyHeader}>
              <Text style={styles.stickyText}>粘性标题</Text>
            </View>
          </Animated.View>
        ) : null}
        <View>
          {
            listData.map((item) => (
              <View key={item.id}>
                <Text>{item.title}</Text>
              </View>
            ))
          }
          {/* <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            stickyHeaderIndices={[0]} // 设置粘性头部索引
          /> */}
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    position: 'relative',
    // height: 400,
    // overflow: 'hidden',
  },
  headerBackground: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },

  backButton: {
    width: 30,
    height: 30,
  },
  menuButton: {
    width: 30,
    height: 30,
  },

  avatarContainer: {
    paddingHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 5,
  },
  userCardId: {
    flexDirection: 'column',
    fontSize: 12,
    color: 'white',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userDescContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDesc: {
    fontSize: 12,
    color: 'white',
  },
  conste: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  consteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    gap: 4,
  },
  consteText: {
    fontSize: 12,
    color: 'white',
  },
  introduction: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  introductionText: {
    backgroundColor: 'green'
  },

  topAvatar: {
    position: 'absolute',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  itemContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topText: {
    fontSize: 12,
    color: 'white',
  },
  bottomText: {
    fontSize: 12,
    color: 'white',
  },

  borderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  borderText: {
    fontSize: 10,
    color: 'black',
  },
  iconcontent: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },

  scrollContainer: {
    marginTop: 10,
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 1,
    width: 130,
    padding: 10,
  },
  scrollText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  secondText: {
    paddingTop: 4,
    fontSize: 12,
    color: 'white',
  },

  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  stickyHeaderContainer: {
    height: 60,
  },
  stickyHeader: {
    backgroundColor: '#2196F3',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  stickyText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default My;