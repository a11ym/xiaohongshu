import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

const ThemeManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [followSystemTheme, setFollowSystemTheme] = useState(false);
  const systemTheme = useColorScheme(); // 获取系统主题

  // 从 AsyncStorage 加载用户偏好
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedIsDarkMode = await AsyncStorage.getItem('isDarkMode');
        const savedFollowSystem = await AsyncStorage.getItem('followSystem');

        if (savedFollowSystem === 'true') {
          setFollowSystemTheme(true);
          // 如果跟随系统，则根据系统主题设置 isDarkMode
          setIsDarkMode(systemTheme === 'dark');
        } else {
          setFollowSystemTheme(false);
          setIsDarkMode(savedIsDarkMode === 'true');
        }
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      }
    };

    loadSettings();
  }, [systemTheme]);

  // 监听系统主题变化（仅当 followSystemTheme 为 true 时生效）
  useEffect(() => {
    if (followSystemTheme) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setIsDarkMode(colorScheme === 'dark');
      });

      return () => subscription.remove();
    }
  }, [followSystemTheme]);

  // 保存用户偏好
  const saveSettings = async (isDark: boolean, followSystem: boolean) => {
    try {
      await AsyncStorage.setItem('isDarkMode', String(isDark));
      await AsyncStorage.setItem('followSystem', String(followSystem));
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  };

  // 切换跟随系统 Switch
  const toggleFollowSystem = (value: boolean) => {
    setFollowSystemTheme(value);
    saveSettings(value ? false : isDarkMode, value);
    if (value) {
      setIsDarkMode(systemTheme === 'dark');
      Appearance.setColorScheme(null); // 跟随系统
    } else {
      Appearance.setColorScheme(isDarkMode ? 'dark' : 'light'); // 手动设置主题
    }
  };

  // 切换暗黑模式 Switch（仅当未跟随系统时可用）
  const toggleDarkMode = (value: boolean) => {
    if (!followSystemTheme) {
      setIsDarkMode(value);
      Appearance.setColorScheme(value ? 'dark' : 'light'); // 设置主题
      saveSettings(value, followSystemTheme);
    }
  };

  return {
    isDarkMode,
    followSystemTheme,
    toggleFollowSystem,
    toggleDarkMode,
  };
};

export default ThemeManager;