import { View, Platform, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '../hooks/useTheme';
import Icon from '@react-native-vector-icons/feather';
import Modal from 'react-native-modal';
import { useState } from 'react';
import ThemeView from './ThemedView';
import ContainerView from './ContainerView';
import ThemedText from './ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TextTabbar({ state, descriptors, navigation }: any) {
  const { color, backgroundColor, tabBarFontColor } = useTheme();
  const insets = useSafeAreaInsets();
  const { buildHref } = useLinkBuilder();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        swipeDirection="down"
        animationIn='slideInUp'
        animationOut='slideOutDown'
      >
        <View style={[styles.modalContent, { backgroundColor: backgroundColor }]}>
          {/* <View style={styles.modalHeader}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>设置选项</Text>
          </View> */}

          <ScrollView style={styles.modalBody}>
            {/* <Text style={styles.modalText}>
              您可以在此处调整应用的详细设置。
            </Text> */}

            <View style={styles.settingOption}>
              <ThemedText style={styles.settingOptionText}>从相册选择</ThemedText>
            </View>

            <View style={styles.settingOption}>
              <ThemedText style={styles.settingOptionText}>相机</ThemedText>
              <ThemedText style={styles.settingOptionText}>拍照与直播</ThemedText>
            </View>

            <View style={styles.settingOption}>
              <ThemedText style={styles.settingOptionText}>写文字</ThemedText>
            </View>
            {/* <View style={styles.settingOption}>
              <Text style={styles.settingOptionText}>位置服务</Text>
              <View style={[styles.toggle, styles.toggleActive]}>
                <View style={[styles.toggleCircle, styles.toggleCircleActive]} />
              </View>
            </View> */}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={[styles.modalButtonText]}>取消</ThemedText>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>保存设置</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
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
            setModalVisible(true);
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
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={[styles.tabBarItem, { paddingBottom: insets.bottom + 6 }]}
          >
            {
              route.name === "Add"
                ?
                <View key={index} style={{ width: 50, height: 35, borderRadius: 6, backgroundColor: '#ff2e4d', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="plus" size={28} color='#fff' />
                </View>
                :
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: isFocused ? tabBarFontColor.primary : tabBarFontColor.text }}>
                  {label}
                </Text>
            }
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    // paddingVertical: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#555',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 8,
    // marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#6a11cb',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#666',
  },
  settingGroup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  settingGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6a11cb',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#444',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  settingOptionText: {
    fontSize: 16,
    // color: '#444',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#6a11cb',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  toggleCircleActive: {
    marginLeft: 'auto',
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
    paddingTop: 6,
  }
})