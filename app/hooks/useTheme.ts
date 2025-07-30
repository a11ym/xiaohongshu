import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark"; // 暗黑模式
  const backgroundColor = isDarkMode ? "#222" : "#fff"; // 背景颜色
  const containerBackgroundColor = isDarkMode ? "#111" : "#f5f5f5"; // 容器背景颜色
  const drawerContentScrollView = isDarkMode ? "#222" : "#f5f5f5"; // 侧边栏背景颜色
  const iconColor = isDarkMode ? "#fff" : "#000"; // 图标颜色
  const darkContainerBackgroundColor = isDarkMode ? "#222" : "#fff"; // 容器背景颜色
  const color = isDarkMode ? "#fff" : "#000"; // 字体颜色
  const tabBarFontColor = {  // tabbar字体颜色
    primary: isDarkMode ? "#fff" : "#000", // 默认颜色
    text: isDarkMode ? '#666' : '#999', //
  }
  return {
    color,
    isDarkMode,
    backgroundColor,
    tabBarFontColor,
    containerBackgroundColor,
    darkContainerBackgroundColor,
    iconColor,
    drawerContentScrollView
  };
}