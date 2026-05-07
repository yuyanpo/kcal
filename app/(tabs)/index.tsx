import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
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
import {
  CATEGORIES,
  FoodItem,
  formatNutrient,
  isNumber,
} from "../../data/types";

const noImage = require("../../assets/images/no-image.png");

type IoniconName = keyof typeof Ionicons.glyphMap;

const CATEGORY_META: Record<
  string,
  { icon: IoniconName; tone: string; hint: string }
> = {
  谷薯类: { icon: "restaurant-outline", tone: "#B7791F", hint: "主食能量" },
  蔬菜类: { icon: "leaf-outline", tone: "#2F855A", hint: "轻食优选" },
  水果类: { icon: "nutrition-outline", tone: "#E05252", hint: "果糖水分" },
  豆类: { icon: "ellipse-outline", tone: "#7C5AA8", hint: "植物蛋白" },
  肉蛋奶类: { icon: "egg-outline", tone: "#D95F32", hint: "补蛋白" },
  坚果油脂类: { icon: "flame-outline", tone: "#A66A2C", hint: "高能量" },
  加工食品及饮料类: { icon: "cafe-outline", tone: "#3478B8", hint: "饮品零食" },
};

const categoryCounts = foods.reduce<Record<string, number>>((acc, food) => {
  acc[food.category] = (acc[food.category] ?? 0) + 1;
  return acc;
}, {});

const lowEnergyFoods = [...foods]
  .filter((food) => isNumber(food.energy))
  .sort((a, b) => (a.energy as number) - (b.energy as number))
  .slice(0, 8);

const proteinFoods = [...foods]
  .filter(
    (food) =>
      isNumber(food.protein) &&
      isNumber(food.energy) &&
      (food.protein as number) >= 15 &&
      (food.energy as number) <= 220,
  )
  .sort((a, b) => (b.protein as number) - (a.protein as number))
  .slice(0, 8);

const highEnergyFoods = [...foods]
  .filter((food) => isNumber(food.energy))
  .sort((a, b) => (b.energy as number) - (a.energy as number))
  .slice(0, 8);

const comparisonPairs = [
  ["6", "10"],
  ["97", "116"],
  ["152", "125"],
];

export default function HomeScreen() {
  const router = useRouter();
  const isDark = useIsDark();
  const insets = useSafeAreaInsets();

  const colors = useMemo(
    () => ({
      bg: isDark ? "#111111" : "#F6F6F3",
      surface: isDark ? "#1E1E1E" : "#FFFFFF",
      elevated: isDark ? "#252525" : "#FFF8F4",
      border: isDark ? "#2A2A2A" : "#ECE7E1",
      text: isDark ? "#F0F0F0" : "#161616",
      muted: isDark ? "#8B8B8B" : "#737373",
      faint: isDark ? "#666666" : "#A0A0A0",
      input: isDark ? "#2A2A2A" : "#F1F1EF",
    }),
    [isDark],
  );

  const goSearch = useCallback(
    (category?: string) => {
      router.push(
        category
          ? `/search?category=${encodeURIComponent(category)}`
          : "/search",
      );
    },
    [router],
  );

  const goFood = useCallback(
    (id: string) => {
      router.push(`/food/${id}`);
    },
    [router],
  );

  const pairs = useMemo(
    () =>
      comparisonPairs
        .map(([leftId, rightId]) => ({
          left: foods.find((food) => food.id === leftId),
          right: foods.find((food) => food.id === rightId),
        }))
        .filter((pair): pair is { left: FoodItem; right: FoodItem } =>
          Boolean(pair.left && pair.right),
        ),
    [],
  );

  return (
    <ScrollView
      className={isDark ? "bg-bg-dark" : "bg-bg"}
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 34 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pb-3" style={{ paddingTop: insets.top + 14 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[28px] font-extrabold text-primary">
              卡路里
            </Text>
            <Text className="mt-1 text-[13px]" style={{ color: colors.muted }}>
              查食物、看营养，吃之前心里有数
            </Text>
          </View>
          <View
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.elevated }}
          >
            <Ionicons name="sparkles-outline" size={21} color="#FF6B35" />
          </View>
        </View>
      </View>

      <View className="px-4">
        <Pressable
          className="h-[58px] flex-row items-center rounded-2xl px-4"
          style={[styles.softShadow, { backgroundColor: colors.surface }]}
          onPress={() => goSearch()}
        >
          <View
            className="mr-3 h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.input }}
          >
            <Ionicons name="search" size={18} color="#FF6B35" />
          </View>
          <View className="flex-1">
            <Text
              className="text-[16px] font-semibold"
              style={{ color: colors.text }}
            >
              搜索食物名称或拼音
            </Text>
            <Text
              className="mt-0.5 text-[12px]"
              style={{ color: colors.faint }}
            >
              例如：鸡蛋、jidan、苹果
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.faint} />
        </Pressable>
      </View>

      <View className="mt-4 flex-row gap-2 px-4">
        <StatPill value={foods.length} label="食物条目" colors={colors} />
        <StatPill
          value={CATEGORIES.length - 1}
          label="常用分类"
          colors={colors}
        />
        <StatPill value="100g" label="统一口径" colors={colors} />
      </View>

      <SectionHeader
        title="按场景找"
        subtitle="先选大类，再精确搜索"
        colors={colors}
      />
      <View className="flex-row flex-wrap gap-2 px-4">
        {CATEGORIES.filter((category) => category !== "全部").map(
          (category) => {
            const meta = CATEGORY_META[category];
            return (
              <CategoryTile
                key={category}
                category={category}
                count={categoryCounts[category] ?? 0}
                icon={meta.icon}
                tone={meta.tone}
                hint={meta.hint}
                colors={colors}
                onPress={() => goSearch(category)}
              />
            );
          },
        )}
      </View>

      <FoodRail
        title="减脂友好"
        subtitle="每 100g 能量更低"
        items={lowEnergyFoods}
        colors={colors}
        accent="#2F855A"
        valueFor={(food) => `${formatNutrient(food.energy)} kcal`}
        detailFor={(food) => `水分 ${formatNutrient(food.water)}g`}
        onPress={goFood}
      />

      <FoodRail
        title="补蛋白优选"
        subtitle="高蛋白，同时热量适中"
        items={proteinFoods}
        colors={colors}
        accent="#FF6B35"
        valueFor={(food) => `蛋白 ${formatNutrient(food.protein)}g`}
        detailFor={(food) => `${formatNutrient(food.energy)} kcal`}
        onPress={goFood}
      />

      <View className="mt-6 px-4">
        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        >
          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text
                className="text-[17px] font-bold"
                style={{ color: colors.text }}
              >
                常见对比
              </Text>
              <Text
                className="mt-1 text-[12px]"
                style={{ color: colors.muted }}
              >
                相似食物，热量差别可能很明显
              </Text>
            </View>
            <Ionicons
              name="swap-horizontal-outline"
              size={22}
              color="#FF6B35"
            />
          </View>
          {pairs.map((pair) => (
            <CompareRow
              key={`${pair.left.id}-${pair.right.id}`}
              left={pair.left}
              right={pair.right}
              colors={colors}
              onPress={goFood}
            />
          ))}
        </View>
      </View>

      <FoodRail
        title="高热量提醒"
        subtitle="适合少量吃，别无意识加量"
        items={highEnergyFoods}
        colors={colors}
        accent="#C05621"
        valueFor={(food) => `${formatNutrient(food.energy)} kcal`}
        detailFor={(food) => `脂肪 ${formatNutrient(food.fat)}g`}
        onPress={goFood}
      />
    </ScrollView>
  );
}

function StatPill({
  value,
  label,
  colors,
}: {
  value: number | string;
  label: string;
  colors: HomeColors;
}) {
  return (
    <View
      className="flex-1 rounded-xl px-3 py-3"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
      }}
    >
      <Text className="text-[18px] font-extrabold text-primary">{value}</Text>
      <Text className="mt-1 text-[11px]" style={{ color: colors.muted }}>
        {label}
      </Text>
    </View>
  );
}

function SectionHeader({
  title,
  subtitle,
  colors,
}: {
  title: string;
  subtitle: string;
  colors: HomeColors;
}) {
  return (
    <View className="mt-7 mb-3 flex-row items-end justify-between px-4">
      <Text className="text-[18px] font-bold" style={{ color: colors.text }}>
        {title}
      </Text>
      <Text className="text-[12px]" style={{ color: colors.muted }}>
        {subtitle}
      </Text>
    </View>
  );
}

function CategoryTile({
  category,
  count,
  icon,
  tone,
  hint,
  colors,
  onPress,
}: {
  category: string;
  count: number;
  icon: IoniconName;
  tone: string;
  hint: string;
  colors: HomeColors;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="min-h-[86px] flex-1 basis-[46%] rounded-2xl p-3"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
      }}
      onPress={onPress}
      activeOpacity={0.78}
    >
      <View className="flex-row items-start justify-between">
        <View
          className="h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${tone}18` }}
        >
          <Ionicons name={icon} size={19} color={tone} />
        </View>
        <Text className="text-[11px] font-semibold" style={{ color: tone }}>
          {count} 种
        </Text>
      </View>
      <Text
        className="mt-3 text-[15px] font-bold"
        style={{ color: colors.text }}
      >
        {category}
      </Text>
      <Text className="mt-1 text-[11px]" style={{ color: colors.muted }}>
        {hint}
      </Text>
    </TouchableOpacity>
  );
}

function FoodRail({
  title,
  subtitle,
  items,
  colors,
  accent,
  valueFor,
  detailFor,
  onPress,
}: {
  title: string;
  subtitle: string;
  items: FoodItem[];
  colors: HomeColors;
  accent: string;
  valueFor: (food: FoodItem) => string;
  detailFor: (food: FoodItem) => string;
  onPress: (id: string) => void;
}) {
  return (
    <View className="mt-7">
      <SectionHeader title={title} subtitle={subtitle} colors={colors} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.railContent}
      >
        {items.map((food) => (
          <FoodRailCard
            key={food.id}
            food={food}
            colors={colors}
            accent={accent}
            value={valueFor(food)}
            detail={detailFor(food)}
            onPress={() => onPress(food.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function FoodRailCard({
  food,
  colors,
  accent,
  value,
  detail,
  onPress,
}: {
  food: FoodItem;
  colors: HomeColors;
  accent: string;
  value: string;
  detail: string;
  onPress: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getFoodImageUrl(food.image);
  const showRemote = imageUrl && !imgError;

  return (
    <TouchableOpacity
      className="w-[142px] rounded-2xl p-2.5"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
      }}
      onPress={onPress}
      activeOpacity={0.78}
    >
      <View
        className="h-[92px] w-full overflow-hidden rounded-xl"
        style={{ backgroundColor: colors.input }}
      >
        <Image
          source={showRemote ? { uri: imageUrl } : noImage}
          style={{ width: "100%", height: "100%" }}
          onError={() => setImgError(true)}
        />
      </View>
      <Text
        className="mt-2 min-h-[36px] text-[13px] font-bold leading-[18px]"
        style={{ color: colors.text }}
        numberOfLines={2}
      >
        {food.name}
      </Text>
      <Text
        className="mt-1 text-[15px] font-extrabold"
        style={{ color: accent }}
      >
        {value}
      </Text>
      <Text className="mt-0.5 text-[11px]" style={{ color: colors.muted }}>
        {detail}
      </Text>
    </TouchableOpacity>
  );
}

function CompareRow({
  left,
  right,
  colors,
  onPress,
}: {
  left: FoodItem;
  right: FoodItem;
  colors: HomeColors;
  onPress: (id: string) => void;
}) {
  return (
    <View
      className="mt-2 flex-row items-center rounded-xl px-3 py-2.5"
      style={{ backgroundColor: colors.input }}
    >
      <CompareFood
        food={left}
        colors={colors}
        onPress={() => onPress(left.id)}
      />
      <Text className="px-2 text-[12px] font-bold text-primary">VS</Text>
      <CompareFood
        food={right}
        colors={colors}
        onPress={() => onPress(right.id)}
      />
    </View>
  );
}

function CompareFood({
  food,
  colors,
  onPress,
}: {
  food: FoodItem;
  colors: HomeColors;
  onPress: () => void;
}) {
  return (
    <Pressable className="flex-1" onPress={onPress}>
      <Text
        className="text-center text-[13px] font-semibold"
        style={{ color: colors.text }}
        numberOfLines={1}
      >
        {food.name}
      </Text>
      <Text
        className="mt-0.5 text-center text-[11px]"
        style={{ color: colors.muted }}
      >
        {formatNutrient(food.energy)} kcal / 100g
      </Text>
    </Pressable>
  );
}

type HomeColors = {
  bg: string;
  surface: string;
  elevated: string;
  border: string;
  text: string;
  muted: string;
  faint: string;
  input: string;
};

const styles = StyleSheet.create({
  softShadow: {
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.08)",
    elevation: 3,
  },
  railContent: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 2,
  },
});
