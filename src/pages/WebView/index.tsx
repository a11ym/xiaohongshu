import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import WebView from 'react-native-webview';
import NavHeader from '../../components/NavHeader';
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
const html = require('../../../public/webview/index.html')


const WebViewWithLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState<string>('');
  // const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const progressWidth = useSharedValue(0);
  const sendMessageToWeb = () => {
    const message = 'hello from App'
    webViewRef.current?.injectJavaScript(`alert('${message}')`)
  }
  const onMessage = (event: any) => {
    const message = event.nativeEvent.data
    Alert.alert('收到消息', message)
    console.log('Received message from WebView:', message)
  }
  // 处理 WebView 开始加载
  const handleLoadStart = () => {
    setLoading(true);
    // setError(false);
    setProgress(0);
  };

  // 处理加载进度
  const handleProgress = (event: any) => {
    const newProgress = Math.round(event.nativeEvent.progress * 100);
    setProgress(newProgress);
  }
  // 处理 WebView 加载完成
  const handleLoad = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent
    setTitle(nativeEvent.title)
  };

  // 处理加载完成

  // 处理加载错误

  // 重新加载页面
  const reloadPage = () => {
    webViewRef.current?.reload();
  };

  // 进度条宽度插值
  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));
  useEffect(() => {
    progressWidth.value = progress;
  }, [progressWidth, progress])
  const handleLoadEnd = () => {
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <NavHeader title={title} back />

      {/* 进度条 */}
      {loading && (
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, progressBarStyle]}
          />
        </View>
      )}
      <Button title='发送消息给webView' onPress={sendMessageToWeb} />

      {/* WebView 内容 */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          // source={{ uri: 'https://reactnative.cn' }}
          source={html}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadProgress={handleProgress}
          onLoad={handleLoad}
          onLoadEnd={handleLoadEnd}
          // onError={handleError}
          onMessage={onMessage}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4a6cf7" />
              <Text style={styles.loadingText}>页面加载中...{progress}%</Text>
            </View>
          )}
          renderError={() => (
            <View style={styles.loadingContainer}>
              <View style={styles.centerContent}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>加载失败</Text>
                <Text style={styles.errorSubText}>
                  无法加载页面，请检查网络连接
                </Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={reloadPage}
                >
                  <Text style={styles.retryButtonText}>重新加载</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* 加载指示器覆盖层 */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerLoader: {
    position: 'absolute',
    right: 15,
  },
  progressContainer: {
    height: 3,
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a6cf7',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  errorIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4a6cf7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WebViewWithLoader;