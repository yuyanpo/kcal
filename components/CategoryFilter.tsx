import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useIsDark } from "../context/ThemeContext";
import { CATEGORIES, Category } from "../data/types";

interface Props {
  selected: Category;
  onSelect: (cat: Category) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  const isDark = useIsDark();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            style={[
              styles.chip,
              isDark && styles.chipDark,
              isActive && styles.chipActive,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                isDark && styles.chipTextDark,
                isActive && styles.chipTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  chipDark: {
    backgroundColor: "#2a2a2a",
  },
  chipActive: {
    backgroundColor: "#FF6B35",
  },
  chipText: {
    fontSize: 14,
    color: "#555",
  },
  chipTextDark: {
    color: "#bbb",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
