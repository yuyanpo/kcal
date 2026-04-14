import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="food/[id]"
          options={{
            headerStyle: { backgroundColor: '#FF6B35' },
            headerTintColor: '#fff',
            headerBackTitle: '返回',
          }}
        />
      </Stack>
    </>
  );
}
