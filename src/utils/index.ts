import { Dimensions, Platform, StatusBar } from 'react-native';

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    // iPhone 14 Pro Max等全面屏的状态栏高度为44，非全面屏为20
    const { height, width } = Dimensions.get('window');
    const isLandscape = width > height;

    if (isLandscape) return 0; // 横屏时iOS状态栏通常隐藏

    // 根据屏幕尺寸判断
    if (height >= 812) return 44;   // iPhone X-XS, 11 Pro, 12/13 mini
    if (height >= 896) return 44;   // iPhone XS Max, 11/Pro Max
    if (height >= 926) return 47;   // iPhone 12/13 Pro Max
    if (height >= 844) return 47;   // iPhone 12/13 Pro
    return 20; // 其他非全面屏设备
  } else if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  }
  return 0;
};

export const { width, height } = Dimensions.get('window');
export const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();