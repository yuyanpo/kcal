import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemePreference, useIsDark, useTheme } from "../context/ThemeContext";

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "system", label: "跟随系统", icon: "phone-portrait-outline" },
  { value: "light", label: "亮色模式", icon: "sunny-outline" },
  { value: "dark", label: "暗色模式", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const { preference, setPreference } = useTheme();
  const isDark = useIsDark();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
        外观
      </Text>
      <View style={[styles.group, isDark && styles.groupDark]}>
        {THEME_OPTIONS.map((opt, i) => (
          <Pressable
            key={opt.value}
            style={({ pressed }) => [
              styles.row,
              i < THEME_OPTIONS.length - 1 &&
                (isDark ? styles.rowBorderDark : styles.rowBorder),
              pressed && styles.rowPressed,
            ]}
            onPress={() => setPreference(opt.value)}
          >
            <Ionicons
              name={opt.icon}
              size={20}
              color={isDark ? "#aaa" : "#666"}
              style={styles.rowIcon}
            />
            <Text style={[styles.rowLabel, isDark && styles.rowLabelDark]}>
              {opt.label}
            </Text>
            {preference === opt.value && (
              <Ionicons name="checkmark" size={20} color="#FF6B35" />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f7", paddingTop: 20 },
  containerDark: { backgroundColor: "#111" },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitleDark: { color: "#666" },

  group: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  groupDark: { backgroundColor: "#1e1e1e" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowPressed: { opacity: 0.6 },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  rowBorderDark: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2a2a2a",
  },
  rowIcon: { marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 16, color: "#111" },
  rowLabelDark: { color: "#f0f0f0" },
});
