import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsDark } from "../context/ThemeContext";

import CategoryFilter from "../components/CategoryFilter";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import { foods } from "../data/foods";
import { Category } from "../data/types";

export default function SearchScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const initialCategory = (params.category as Category) ?? "全部";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const router = useRouter();
  const isDark = useIsDark();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods.filter((food) => {
      const matchesCategory =
        selectedCategory === "全部" || food.category === selectedCategory;
      if (!matchesCategory) return false;
      if (q === "") return true;
      return (
        food.name.includes(q) ||
        food.pinyin.includes(q) ||
        food.pinyinCompact.includes(q)
      );
    });
  }, [query, selectedCategory]);

  const handlePress = useCallback(
    (id: string) => router.push(`/food/${id}`),
    [router],
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "搜索食物",
          headerStyle: { backgroundColor: isDark ? "#1a1a1a" : "#fff" },
          headerTintColor: isDark ? "#fff" : "#111",
          headerShadowVisible: false,
        }}
      />
      <View style={[styles.container, isDark && styles.containerDark]}>
        <SearchBar value={query} onChangeText={setQuery} autoFocus />
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard item={item} onPress={() => handlePress(item.id)} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                没有找到相关食物
              </Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  containerDark: { backgroundColor: "#111" },
  list: { paddingTop: 4, paddingBottom: 24 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 16, color: "#999" },
  emptyTextDark: { color: "#555" },
});
