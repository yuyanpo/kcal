import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "搜索食物名称…",
  autoFocus,
}: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Ionicons
        name="search"
        size={18}
        color={isDark ? "#aaa" : "#999"}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#666" : "#bbb"}
        cursorColor="#FF6B35"
        selectionColor="#FF6B35"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  containerDark: {
    backgroundColor: "#2a2a2a",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  inputDark: {
    color: "#eee",
  },
});
