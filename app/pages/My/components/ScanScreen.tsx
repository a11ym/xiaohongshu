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
import NavHeader from '../../../components/NavHeader';

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
            title: '相机权限',
            message: 'App 需要访问您的相机。',
            buttonNeutral: '稍后询问',
            buttonNegative: '取消',
            buttonPositive: '确定',
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
  // 重新请求相机权限
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '相机权限',
          message: 'App 需要访问您的相机。',
          buttonNeutral: '稍后询问',
          buttonNegative: '取消',
          buttonPositive: '确定',
        }
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      // iOS 权限请求
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    }
  };

  if (hasPermission === null) {
    return <>
      <NavHeader
        title='扫描'
        back={true}
      />
      <View style={styles.container}>
        <Text>请求相机权限中...</Text>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>重新请求权限</Text>
        </TouchableOpacity>
      </View>
    </>;
  }

  if (!device) {
    return <>
      <NavHeader
        title='扫描'
        back={true}
      />
      <View style={styles.container}>
        <Text>相机设备未找到</Text>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>重新请求权限</Text>
        </TouchableOpacity>
      </View>
    </>;
  }

  if (hasPermission === false) {
    return <>
      <NavHeader
        title='扫描'
        back={true}
      />
      <View style={styles.container}><Text>相机权限被拒绝</Text>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>重新请求权限</Text>
        </TouchableOpacity>
      </View></>;
  }

  return (
    <View style={styles.container}>
      <NavHeader
        title="扫描"
        back={true}
      />
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