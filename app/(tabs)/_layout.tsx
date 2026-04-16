import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: isDark ? '#666' : '#aaa',
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
          borderTopColor: isDark ? '#2a2a2a' : '#f0f0f0',
        },
        // 默认 header 样式（我的页用）
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
        },
        headerShadowVisible: false,
        headerTintColor: isDark ? '#f0f0f0' : '#111',
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          headerShown: false,   // 首页自绘标题区域
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
