import { StyleSheet,View, Text } from 'react-native'
import React from 'react'
// import { WebView } from 'react-native-webview'

const WebViewScreen = () => {
  return (
    // <WebView
    //   style={styles.container}
    //   source={require('../../../public/webview/index.html')}
    //   // source={{ uri: Platform.OS === 'android' ? 'file:///android_asset/public/webview/index.html' : 'file:///public/webview/index.html' }}
    //   originWhitelist={['*']}
    //   allowsInlineMediaPlayback={true}
    //   javaScriptEnabled={true}
    // />
    <View style={styles.container}>
      <Text>WebViewScreen</Text>
    </View>
  )
}

export default WebViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})