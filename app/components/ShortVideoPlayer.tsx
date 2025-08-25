import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  FlatList
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import Feather from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const background = require('../assets/video/1.mp4');
const background2 = require('../assets/video/2.mp4');
const background3 = require('../assets/video/3.mp4');

// 模拟视频数据
const videos = [
  {
    id: '1',
    uri: background,
    title: '城市霓虹下的舞蹈',
    username: '舞蹈达人小美',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    likes: 12500,
    comments: 320,
    shares: 150,
    music: '流行音乐 - 节奏感十足',
    hashtags: ['#舞蹈', '#城市夜景', '#时尚']
  },
  {
    id: '2',
    uri: background2,
    title: '深夜吉他弹唱',
    username: '音乐人小李',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    likes: 8900,
    comments: 210,
    shares: 98,
    music: '原创音乐 - 深夜思绪',
    hashtags: ['#吉他', '#原创', '#音乐人']
  },
  {
    id: '3',
    uri: background3,
    title: '日落山景延时摄影',
    username: '旅行摄影师',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    likes: 24300,
    comments: 540,
    shares: 320,
    music: '自然音效 - 宁静山谷',
    hashtags: ['#摄影', '#旅行', '#自然风光']
  },
  {
    id: '4',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-tricks-with-skateboard-in-a-parking-lot-34557-large.mp4',
    title: '滑板公园技巧秀',
    username: '滑板小子',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    likes: 18700,
    comments: 430,
    shares: 210,
    music: '嘻哈音乐 - 动感节奏',
    hashtags: ['#滑板', '#极限运动', '#街头文化']
  }
];

const ShortVideoPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState(videos.map(video => video.likes));
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<VideoRef[]>([]);

  const insets = useSafeAreaInsets();

  // 处理视频进度
  const onProgress = (data, index) => {
    console.log("🚀 ~ onProgress ~ data:", data)
    if (currentIndex === index) {
      setProgress(data.currentTime / data.seekableDuration);
    }
  };

  // 点赞处理
  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);

    // 点赞动画效果
    Animated.sequence([
      Animated.timing(new Animated.Value(1), {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(new Animated.Value(1.5), {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
  };

  // 切换播放状态
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 当视频改变时自动播放
  useEffect(() => {
    setIsPlaying(true);
  }, [currentIndex]);

  // 处理滚动结束
  const onScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / height);
    setCurrentIndex(index);
  };

  // 渲染单个视频项
  const renderVideoItem = ({ item, index }) => {
    return (
      <View style={[styles.videoContainer, { height: height - 50 - insets.bottom, paddingBottom: insets.bottom }]}>
        {/* 视频播放器 */}
        <Video
          ref={ref => (videoRefs.current[index] = ref)}
          source={{ uri: item.uri }}
          //处理竖屏和横屏
          style={styles.video}
          resizeMode='cover'
          paused={currentIndex !== index || !isPlaying}
          repeat={true}
          onProgress={(data) => onProgress(data, index)}
          renderLoader=
          {() => (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
              <Text style={{color:'#fff',justifyContent:'center',alignItems:'center'}}>自定义内容</Text>
            </View>
          )}
        />

        {/* 播放/暂停控制层 */}
        <TouchableOpacity
          style={styles.playControl}
          activeOpacity={0.9}
          onPress={togglePlayPause}
        >
          {!isPlaying && currentIndex === index && (
            <Feather name="play" size={70} color="rgba(255,255,255,0.7)" />
          )}
        </TouchableOpacity>

        {/* 进度条 */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>

        {/* 视频信息区域 */}
        <View style={styles.infoContainer}>
          {/* 左侧用户信息 */}
          <View style={styles.userInfo}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>关注</Text>
            </TouchableOpacity>
          </View>

          {/* 视频文字描述 */}
          <View style={styles.videoInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.hashtagContainer}>
              {item.hashtags.map((tag: string, i: number) => (
                <Text key={i} style={styles.hashtag}>{tag}</Text>
              ))}
            </View>
            <View style={styles.musicContainer}>
              <Feather name="user" size={16} color="white" />
              <Text style={styles.music}>{item.music}</Text>
            </View>
          </View>
        </View>


        {/* 右侧互动按钮 */}
        <View style={styles.actionContainer}>
          {/* 点赞按钮 */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(index)}
          >
            <Feather
              name="heart"
              size={30}
              color={likes[index] > item.likes ? '#ff0058' : 'white'}
            />
            <Text style={styles.actionText}>{likes[index]}</Text>
          </TouchableOpacity>

          {/* 评论按钮 */}
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="user" size={28} color="white" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          {/* 分享按钮 */}
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={28} color="white" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>

          {/* 更多按钮 */}
          <TouchableOpacity style={[styles.actionButton, { marginTop: 20 }]}>
            <Feather name="user" size={28} color="white" />
          </TouchableOpacity>

          {/* 音乐封面 */}
          <View style={styles.musicCover}>
            <Image source={{ uri: item.avatar }} style={styles.coverImage} />
          </View>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: width,
    backgroundColor: 'black',
    position: 'relative',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    // zIndex: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff0058',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
    paddingHorizontal: 15,
    rowGap: 10,
    // zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  followButton: {
    borderRadius: 30,
    backgroundColor: '#ff0058',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followText: {
    color: 'white',
    fontSize: 14,
  },
  videoInfo: {
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  hashtag: {
    color: '#a0d2ff',
    fontSize: 14,
    marginRight: 10,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  music: {
    color: 'white',
    fontSize: 13,
    marginLeft: 5,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginLeft: 10,
  },
  actionButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  musicCover: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    marginTop: 15,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
});

export default ShortVideoPlayer;