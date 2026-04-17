import { createContext, useCallback, useContext, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "light" | "dark" | "system";

interface ThemeContextValue {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  preference: "system",
  setPreference: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const systemScheme = useColorScheme();

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
  }, []);

  // When 'system', follow the device; otherwise force light or dark.
  const isDark =
    preference === "system" ? systemScheme === "dark" : preference === "dark";

  return (
    <ThemeContext.Provider value={{ preference, setPreference, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/** Convenience hook — returns true when dark mode is active (respects user preference). */
export function useIsDark(): boolean {
  return useContext(ThemeContext).isDark;
}
