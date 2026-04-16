import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="search"
          options={{
            headerStyle: { backgroundColor: isDark ? '#1a1a1a' : '#fff' },
            headerTintColor: isDark ? '#fff' : '#111',
            headerShadowVisible: false,
            headerBackTitle: '返回',
          }}
        />
        <Stack.Screen
          name="food/[id]"
          options={{
            headerStyle: { backgroundColor: isDark ? '#1a1a1a' : '#fff' },
            headerTintColor: isDark ? '#fff' : '#111',
            headerShadowVisible: false,
            headerBackTitle: '返回',
          }}
        />
      </Stack>
    </>
  );
}
