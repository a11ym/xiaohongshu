import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'

// Load the module
import Video, { VideoRef } from 'react-native-video';

// Inside your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if needed.

const ContainerVideo = (props: any) => {
  const { paused, children } = props;
  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/video/frist.mp4');
  const onBuffer = () => {
    console.log('Buffering');
  }
  const onError = (error: any) => {
    console.log('Error', error);
  }
  return (
    <View style={styles.container}>
      <Video
        {...props}
        // Can be a URL or a local file.
        source={background}
        // Store reference  
        ref={videoRef}
        paused={paused}
        // Callback when remote video is buffering                                      
        onBuffer={onBuffer}
        // Callback when the video cannot be loaded              
        onError={onError}
        style={styles.backgroundVideo}
      />
      {children}
    </View>
  );
};


// const ContainerVideo = (props: any) => {
//   return (
//     <VideoPlayer {...props} />
//   )
// }

export default ContainerVideo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: '100%',
    height: '100%',
  },
})