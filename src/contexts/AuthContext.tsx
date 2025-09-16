import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  register: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  //检查用户是否登录
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token')
        if (token) {
          setIsSignedIn(!!token)//!!token将token转换为布尔值
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    checkSignInStatus()
  }, [])

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('auth_token', token)
      // 模拟登录延迟
      setTimeout(() => {
        setIsSignedIn(true)
      }, 2000)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token')
      setIsSignedIn(false)
    } catch (error) {
      console.log(error)
    }
  }

  const register = async () => {
  };

  const value: AuthContextType = {
    isSignedIn,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext必须在AuthProvider中使用');
  return context;
};  