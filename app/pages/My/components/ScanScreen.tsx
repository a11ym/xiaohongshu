// ScanScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor, BarcodeFormat, scanBarcodes } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const device = useCameraDevice('back');

  // 请求相机权限
  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        // iOS 权限请求
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
      }
    };

    requestCameraPermission();
  }, []);

  // 处理扫码逻辑
  useFrameProcessor((frame) => {
    'worklet';
    const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    if (barcodes.length > 0) {
      runOnJS(setScannedValue)(barcodes[0].value);
    }
  }, [setScannedValue]);

  // 重置扫码值
  const resetScan = () => {
    setScannedValue(null);
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (!device) {
    return <View style={styles.container}><Text>No camera device found.</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>Camera permission denied.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        torch={isTorchOn ? 'on' : 'off'}
      />

      {/* 扫码结果显示 */}
      {scannedValue && (
        <View style={styles.overlay}>
          <Text style={styles.text}>Scanned: {scannedValue}</Text>
          <TouchableOpacity style={styles.button} onPress={resetScan}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 切换闪光灯按钮 */}
      <TouchableOpacity
        style={[styles.button, styles.torchButton]}
        onPress={() => setIsTorchOn(!isTorchOn)}
      >
        <Text style={styles.buttonText}>{isTorchOn ? 'Turn Off Torch' : 'Turn On Torch'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  torchButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007BFF',
  },
});

export default ScanScreen;