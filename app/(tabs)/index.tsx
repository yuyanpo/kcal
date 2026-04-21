import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsDark } from "../../context/ThemeContext";

import { foods } from "../../data/foods";
import { getFoodImageUrl } from "../../data/imageUtils";
import { CATEGORIES, FoodItem, isNumber } from "../../data/types";

const noImage = require("../../assets/images/no-image.png");

// 分类对应的图标和颜色
const CATEGORY_META: Record<
  string,
  { icon: string; color: string; bg: string }
> = {
  谷薯类: { icon: "🌾", color: "#B07D3A", bg: "#FFF4E0" },
  蔬菜类: { icon: "🥬", color: "#3A9A5C", bg: "#E8F8EE" },
  水果类: { icon: "🍎", color: "#E05A5A", bg: "#FDEAEA" },
  豆类: { icon: "🫘", color: "#7B5EA7", bg: "#F2ECFB" },
  肉蛋奶类: { icon: "🥩", color: "#D4603A", bg: "#FDF0EB" },
  坚果油脂类: { icon: "🥜", color: "#A07830", bg: "#FBF4E6" },
  加工食品及饮料类: { icon: "🍰", color: "#3A7DB4", bg: "#E8F3FC" },
};

// 能量最低的 6 种（能量有数值的食物）
const lowestEnergy = [...foods]
  .filter((f) => isNumber(f.energy))
  .sort((a, b) => (a.energy as number) - (b.energy as number))
  .slice(0, 6);

// 脂肪最高的 6 种
const highestFat = [...foods]
  .filter((f) => isNumber(f.fat))
  .sort((a, b) => (b.fat as number) - (a.fat as number))
  .slice(0, 6);

// 推荐：蛋白质高且热量适中的食物（蛋白质 > 15g，热量 < 200kcal）
const recommended = foods
  .filter(
    (f) =>
      isNumber(f.protein) &&
      isNumber(f.energy) &&
      (f.protein as number) > 15 &&
      (f.energy as number) < 200,
  )
  .slice(0, 6);

export default function HomeScreen() {
  const router = useRouter();
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();

  const goSearch = useCallback(
    (category?: string) => {
      if (category) {
        router.push(`/search?category=${encodeURIComponent(category)}`);
      } else {
        router.push("/search");
      }
    },
    [router],
  );

  const goFood = useCallback(
    (id: string) => {
      router.push(`/food/${id}`);
    },
    [router],
  );

  const bg = isDark ? "#111" : "#f5f5f7";
  const cardBg = isDark ? "#1e1e1e" : "#fff";
  const textPrimary = isDark ? "#f0f0f0" : "#111";
  const textSecondary = isDark ? "#888" : "#888";

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: bg }]}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 顶部标题 */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View>
          <Text style={[styles.appTitle, { color: "#FF6B35" }]}>卡路里</Text>
          <Text style={[styles.appSubtitle, { color: textSecondary }]}>
            每一口，都心中有数
          </Text>
        </View>
      </View>

      {/* 搜索入口 */}
      <Pressable
        style={[styles.searchBar, { backgroundColor: cardBg }]}
        onPress={() => goSearch()}
      >
        <Ionicons name="search" size={18} color="#bbb" />
        <Text style={styles.searchPlaceholder}>搜索食物名称、拼音…</Text>
      </Pressable>

      {/* 分类 */}
      <SectionHeader title="分类" textColor={textPrimary} />
      <View style={styles.categoryGrid}>
        {CATEGORIES.filter((c) => c !== "全部").map((cat) => {
          const meta = CATEGORY_META[cat] ?? {
            icon: "🍽️",
            color: "#666",
            bg: "#f0f0f0",
          };
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryCard,
                { backgroundColor: isDark ? "#1e1e1e" : meta.bg },
              ]}
              onPress={() => goSearch(cat)}
              activeOpacity={0.75}
            >
              <Text style={styles.categoryIcon}>{meta.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  { color: isDark ? "#ddd" : meta.color },
                ]}
                numberOfLines={2}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 能量最低排行 */}
      <SectionHeader
        title="低能量食物"
        subtitle="kcal 最低前 6 名"
        textColor={textPrimary}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hScroll}
        contentContainerStyle={styles.hScrollContent}
      >
        {lowestEnergy.map((item) => (
          <RankCard
            key={item.id}
            item={item}
            onPress={() => goFood(item.id)}
            valueLabel={`${item.energy} kcal`}
            valueSub="/100g"
            cardBg={cardBg}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            accentColor="#4CAF50"
            isDark={isDark}
          />
        ))}
      </ScrollView>

      {/* 推荐食物 */}
      <SectionHeader
        title="营养推荐"
        subtitle="高蛋白 · 低热量"
        textColor={textPrimary}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hScroll}
        contentContainerStyle={styles.hScrollContent}
      >
        {recommended.map((item) => (
          <RankCard
            key={item.id}
            item={item}
            onPress={() => goFood(item.id)}
            valueLabel={`蛋白 ${item.protein}g`}
            valueSub={`${item.energy} kcal`}
            cardBg={cardBg}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            accentColor="#FF6B35"
            isDark={isDark}
          />
        ))}
      </ScrollView>

      {/* 脂肪最高排行 */}
      <SectionHeader
        title="高脂肪食物"
        subtitle="脂肪最高前 6 名"
        textColor={textPrimary}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hScroll}
        contentContainerStyle={styles.hScrollContent}
      >
        {highestFat.map((item) => (
          <RankCard
            key={item.id}
            item={item}
            onPress={() => goFood(item.id)}
            valueLabel={`脂肪 ${item.fat}g`}
            valueSub="/100g"
            cardBg={cardBg}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            accentColor="#E57373"
            isDark={isDark}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

// ── 子组件 ──────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  textColor,
}: {
  title: string;
  subtitle?: string;
  textColor: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

interface RankCardProps {
  item: FoodItem;
  onPress: () => void;
  valueLabel: string;
  valueSub: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  isDark: boolean;
}

function RankCard({
  item,
  onPress,
  valueLabel,
  valueSub,
  cardBg,
  textPrimary,
  textSecondary,
  accentColor,
  isDark,
}: RankCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getFoodImageUrl(item.image);
  const showRemote = imageUrl && !imgError;

  return (
    <TouchableOpacity
      style={[styles.rankCard, { backgroundColor: cardBg }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* 食物图片 */}
      <View
        className={`w-full rounded-xl overflow-hidden mb-1 ${isDark ? "bg-[#2a2a2a]" : "bg-[#f0f0f0]"}`}
        style={{ height: 90 }}
      >
        <Image
          source={showRemote ? { uri: imageUrl } : noImage}
          style={{ width: "100%", height: "100%" }}
          onError={() => setImgError(true)}
        />
      </View>

      <Text style={[styles.rankName, { color: textPrimary }]} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={[styles.rankValue, { color: accentColor }]}>
        {valueLabel}
      </Text>
      <Text style={[styles.rankSub, { color: textSecondary }]}>{valueSub}</Text>
    </TouchableOpacity>
  );
}

// ── 样式 ──────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: "#bbb",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#aaa",
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  categoryCard: {
    width: "30%",
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 6,
  },
  categoryIcon: { fontSize: 26 },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16,
  },

  hScroll: { flexGrow: 0 },
  hScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 4,
  },

  rankCard: {
    width: 130,
    borderRadius: 14,
    padding: 10,
    gap: 4,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.06,
    // shadowRadius: 4,
    elevation: 2,
  },
  rankName: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
  rankValue: { fontSize: 14, fontWeight: "700", marginTop: 2 },
  rankSub: { fontSize: 11 },
});
