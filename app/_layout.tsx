import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useIsDark } from "../context/ThemeContext";
import "../global.css";

function RootLayoutInner() {
  const isDark = useIsDark();
  const headerStyle = { backgroundColor: isDark ? "#1a1a1a" : "#fff" };
  const headerTintColor = isDark ? "#fff" : "#111";
  const sharedOptions = {
    headerStyle,
    headerTintColor,
    headerShadowVisible: false,
    headerBackTitle: "返回",
  };

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={sharedOptions} />
        <Stack.Screen name="food/[id]" options={sharedOptions} />
        <Stack.Screen
          name="settings"
          options={{ ...sharedOptions, title: "设置" }}
        />
        <Stack.Screen
          name="about"
          options={{ ...sharedOptions, title: "数据来源" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutInner />
    </ThemeProvider>
  );
}
