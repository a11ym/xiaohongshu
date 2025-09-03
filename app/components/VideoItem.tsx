// VideoItem.js
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
// 假设你已经安装并配置了 react-native-vector-icons
import Icon from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window');

const VideoItem = ({ item, isFocused }: { item: any; isFocused: boolean }) => {
  const insets = useSafeAreaInsets()
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false); //手动暂停状态
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true) //加载状态
  const [isLandscapeVideo, setIsLandscapeVideo] = useState(false)

  const onBuffer = (buffer: { isBuffering: boolean | ((prevState: boolean) => boolean); }) => {
    console.log('buffering...', buffer);
    setIsLoading(buffer.isBuffering)
  };

  const onError = (error: any) => {
    console.log('error', error);
  };

  const onProgress = (data: { currentTime: number; seekableDuration: number; }) => {
    setProgress(data.currentTime / data.seekableDuration);
  };
  const onLoadStart = () => {
  }

  const onLoad = (data: { naturalSize: { width: any; height: any; }; }) => {
    console.log("🚀 ~ onLoad ~ data:", data)
    const { width: videoWidth, height: videoHeight } = data.naturalSize;
    setIsLoading(false)
    setIsLandscapeVideo(videoWidth > videoHeight)
  }

  // 点击屏幕切换播放/暂停
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const shouldPlay = isFocused && !isPaused; // 只有当组件可见且未暂停时才播放
  return (
    <View style={[styles.container, { height: height - 50 - insets.bottom }]}>
      <Pressable onPress={togglePlayPause} style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={styles.video}
          resizeMode={isLandscapeVideo ? 'contain' : 'cover'} // 视频缩放模式
          repeat={true} // 无限循环播放
          paused={!shouldPlay} // 如果组件不可见或用户手动暂停，则暂停
          muted={isMuted}
          onBuffer={onBuffer}
          onError={onError}
          onProgress={onProgress}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          playInBackground={false} // App进入后台时暂停
          playWhenInactive={false} // 控制中心或通知下拉时暂停
        />
      </Pressable>

      {/* 视频中间的播放/暂停图标 */}
      {/* {isPaused && isFocused && (
        <Pressable style={styles.overlay} onPress={togglePlayPause}>
          <Icon name="play" size={80} color="rgba(255, 255, 255, 0.6)" />
        </Pressable>
      )} */}
      {/* 覆盖层 */}
      <View style={styles.overlay}>
        {/* /~ 加载指示器 ~/ */}
        {isLoading && <ActivityIndicator size="large" color="#fff" />}

        {/* /~ 用户手动暂停时显示的播放按钮 ~/ */}
        {isPaused && isFocused && (
          <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
            <Icon name="play" size={80} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>
        )}
      </View>
      {/* 进度条 */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* 底部和侧边的UI覆盖层 */}
      <View style={styles.bottomSection}>
        <Text style={styles.userText}>{item.username}</Text>
        <Text style={styles.descriptionText}>{item.title}</Text>
      </View>

      <View style={styles.sideSection}>
        {/* 点赞 */}
        <TouchableOpacity style={styles.sideButton}>
          <Icon name="heart" size={35} color="white" />
          <Text style={styles.sideButtonText}>{item.likes}</Text>
        </TouchableOpacity>

        {/* 评论 */}
        <TouchableOpacity style={styles.sideButton}>
          <Icon name="message-circle" size={35} color="white" />
          <Text style={styles.sideButtonText}>{item.comments}</Text>
        </TouchableOpacity>

        {/* 分享 */}
        <TouchableOpacity style={styles.sideButton}>
          <Icon name="share-2" size={35} color="white" />
          <Text style={styles.sideButtonText}>{item.shares}</Text>
        </TouchableOpacity>

        {/* 静音/取消静音 */}
        <TouchableOpacity style={styles.sideButton} onPress={() => setIsMuted(!isMuted)}>
          <Icon name={isMuted ? "volume-x" : "volume-2"} size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#000',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  video: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    padding: 20
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff0058',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 100, // 给右侧按钮留出空间
  },
  userText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  sideSection: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    alignItems: 'center',
  },
  sideButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
  sideButtonText: {
    color: 'white',
    marginTop: 5,
  },
});

export default React.memo(VideoItem); // 使用React.memo进行优化
