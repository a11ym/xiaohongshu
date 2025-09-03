import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';
import { useTheme } from '../hooks/useTheme';
import Icon from '@react-native-vector-icons/feather';
import { useCallback, useState } from 'react';
import ThemedText from './ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomModal from './BottomModal';

export default function TextTabbar({ state, descriptors, navigation }: any) {
  // console.log("🚀 ~ TextTabbar ~ state, descriptors, navigation:", state, descriptors, navigation)
  const { backgroundColor, tabBarFontColor } = useTheme();
  const insets = useSafeAreaInsets();
  const { buildHref } = useLinkBuilder();
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  // 完全关闭modal后的回调
  const onModalHide = useCallback(() => {
    console.log('Modal完全隐藏');
  }, []);

  // 完全显示modal后的回调
  const onModalShow = useCallback(() => {
    console.log('Modal完全显示');
  }, []);

  return (
    <>
      <View style={[styles.container, {
        height: 50 + insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: state.index === 1 ? '#222' : backgroundColor
      }]}>
        {state.routes.map((route: { key: string | number; name: string; params: object | undefined; }, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === "Add") {
              closeModal();
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={[styles.tabBarItem, { paddingBottom: insets.bottom }]}
            >
              {
                route.name === "Add"
                  ?
                  <View key={index} style={styles.addButton}>
                    <Icon name="plus" size={28} color='#fff' />
                  </View>
                  :
                  <Text style={[styles.tabbarText,
                  { transform: [{ scale: isFocused ? 1.2 : 1 }] },
                  { color: isFocused ? route.name === 'Hot' ? '#fff' : tabBarFontColor.primary : tabBarFontColor.text }]}>
                    {label}
                  </Text>
              }
            </Pressable>
          );
        })}
      </View>
      <BottomModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onModalHide={onModalHide}
        onModalShow={onModalShow}
      >
        {/* <View style={[styles.modalContent, { backgroundColor: backgroundColor }]}> */}
        <View style={styles.settingOption}>
          <ThemedText style={styles.settingOptionText}>从相册选择</ThemedText>
        </View>

        <View style={styles.settingOption}>
          <ThemedText style={styles.settingOptionText}>相机</ThemedText>
          <ThemedText style={styles.settingOptionText}>拍照与直播</ThemedText>
        </View>

        <TouchableOpacity style={styles.settingOption} onPress={() => {
          closeModal();
          navigation.navigate('TextView');
        }}>
          <ThemedText style={styles.settingOptionText}>写文字</ThemedText>
        </TouchableOpacity>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={[styles.modalButton]}
            onPress={() => setModalVisible(false)}
          >
            <ThemedText style={[styles.modalButtonText]}>取消</ThemedText>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  settingOptionText: {
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 35,
    borderRadius: 6,
    backgroundColor: '#ff2e4d',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabbarText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})