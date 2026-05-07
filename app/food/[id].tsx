import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useIsDark } from "../../context/ThemeContext";

import NutrientRow from "../../components/NutrientRow";
import { foods } from "../../data/foods";
import { getFoodImageUrl } from "../../data/imageUtils";
import { NutrientField, formatNutrient, isNumber } from "../../data/types";

const noImage = require("../../assets/images/no-image.png");

// 参考每日摄入量（成人，基于 2000 kcal 饮食）
const DAILY_REF = {
  energy: 2000,
  protein: 60,
  fat: 65,
  potassium: 2000,
  sodium: 2000,
  calcium: 800,
  magnesium: 330,
  iron: 20,
  phosphorus: 700,
};

/** 将字段值按克数比例换算，非数字字段原样透传 */
function scale(v: NutrientField, factor: number): NutrientField {
  if (!isNumber(v)) return v;
  return parseFloat((v * factor).toFixed(1));
}

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [grams, setGrams] = useState("100");
  const [imgError, setImgError] = useState(false);
  const isDark = useIsDark();

  const food = foods.find((f) => f.id === id);
  const g = parseFloat(grams) || 0;
  const factor = g / 100;

  const calc = useMemo(() => {
    if (!food) return null;
    return {
      energy: scale(food.energy, factor),
      protein: scale(food.protein, factor),
      fat: scale(food.fat, factor),
      phosphorus: scale(food.phosphorus, factor),
      potassium: scale(food.potassium, factor),
      sodium: scale(food.sodium, factor),
      calcium: scale(food.calcium, factor),
      magnesium: scale(food.magnesium, factor),
      iron: scale(food.iron, factor),
      water: scale(food.water, factor),
      pProteinRatio: food.pProteinRatio, // 比值不随克数变化
    };
  }, [food, factor]);

  if (!food || !calc) {
    return (
      <View style={[styles.notFound, isDark && styles.bgDark]}>
        <Text style={{ color: isDark ? "#eee" : "#333" }}>食物未找到</Text>
      </View>
    );
  }

  const imageUrl = getFoodImageUrl(food.image);
  const showImage = imageUrl && !imgError;

  const est = food.estimated ?? [];
  const energyDisplay = isNumber(calc.energy)
    ? String(calc.energy)
    : formatNutrient(calc.energy);
  const energyPer100 = isNumber(food.energy)
    ? `${food.energy} kcal`
    : formatNutrient(food.energy);

  return (
    <>
      <Stack.Screen options={{ title: food.name }} />
      <ScrollView
        style={[styles.container, isDark && styles.bgDark]}
        showsVerticalScrollIndicator={false}
      >
        {/* 食物图片 + 分类徽章 + 名称 */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          {/* 图片区域 */}
          <View
            className={`w-full overflow-hidden mb-4 ${isDark ? "bg-[#2a2a2a]" : "bg-[#f0f0f0]"}`}
            style={{ height: 200 }}
          >
            <Image
              source={showImage ? { uri: imageUrl } : noImage}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{food.category}</Text>
          </View>
          <Text style={[styles.foodName, isDark && styles.textLight]}>
            {food.name}
          </Text>
        </View>

        {/* 克数计算器 */}
        <View style={[styles.calcCard, isDark && styles.calcCardDark]}>
          <Text style={[styles.calcLabel, isDark && styles.textMuted]}>
            食用克数
          </Text>
          <View style={styles.calcRow}>
            <TextInput
              style={[styles.gramsInput, isDark && styles.gramsInputDark]}
              value={grams}
              onChangeText={setGrams}
              keyboardType="numeric"
              selectTextOnFocus
              maxLength={5}
            />
            <Text style={[styles.gramUnit, isDark && styles.textMuted]}>
              克
            </Text>
          </View>
          <View style={styles.calcResult}>
            <Text
              style={[
                styles.kcalBig,
                !isNumber(calc.energy) && styles.kcalBigSpecial,
              ]}
            >
              {energyDisplay}
            </Text>
            {isNumber(calc.energy) && (
              <Text style={[styles.kcalUnit, isDark && styles.textMuted]}>
                千卡
              </Text>
            )}
            {est.includes("energy") && (
              <Text style={styles.estimatedBadge}>估计值</Text>
            )}
          </View>
          <Text style={[styles.calcHint, isDark && styles.textMuted]}>
            每 100g 含 {energyPer100}
          </Text>
        </View>

        {/* 营养成分 */}
        <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
          营养成分（{g}g）
        </Text>

        <View style={[styles.table, isDark && styles.tableDark]}>
          <NutrientRow
            label="能量"
            value={calc.energy}
            unit="kcal"
            dailyRef={DAILY_REF.energy * factor}
            highlight
            estimated={est.includes("energy")}
          />
          <NutrientRow
            label="蛋白质"
            value={calc.protein}
            unit="g"
            dailyRef={DAILY_REF.protein * factor}
            estimated={est.includes("protein")}
          />
          <NutrientRow
            label="脂肪"
            value={calc.fat}
            unit="g"
            dailyRef={DAILY_REF.fat * factor}
            estimated={est.includes("fat")}
          />
          <NutrientRow
            label="水分"
            value={calc.water}
            unit="g"
            estimated={est.includes("water")}
          />
          <NutrientRow
            label="钾"
            value={calc.potassium}
            unit="mg"
            dailyRef={DAILY_REF.potassium * factor}
            estimated={est.includes("potassium")}
          />
          <NutrientRow
            label="钠"
            value={calc.sodium}
            unit="mg"
            dailyRef={DAILY_REF.sodium * factor}
            estimated={est.includes("sodium")}
          />
          <NutrientRow
            label="钙"
            value={calc.calcium}
            unit="mg"
            dailyRef={DAILY_REF.calcium * factor}
            estimated={est.includes("calcium")}
          />
          <NutrientRow
            label="镁"
            value={calc.magnesium}
            unit="mg"
            dailyRef={DAILY_REF.magnesium * factor}
            estimated={est.includes("magnesium")}
          />
          <NutrientRow
            label="铁"
            value={calc.iron}
            unit="mg"
            dailyRef={DAILY_REF.iron * factor}
            estimated={est.includes("iron")}
          />
          <NutrientRow
            label="磷"
            value={calc.phosphorus}
            unit="mg"
            dailyRef={DAILY_REF.phosphorus * factor}
            estimated={est.includes("phosphorus")}
          />
          <NutrientRow
            label="磷/蛋白比值"
            value={calc.pProteinRatio}
            unit=""
            estimated={est.includes("pProteinRatio")}
          />
        </View>

        {/* 图例说明 */}
        {(food.estimated?.length ?? 0) > 0 && (
          <Text style={[styles.legend, isDark && styles.textMuted]}>
            * 该字段为估计值
          </Text>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  bgDark: { backgroundColor: "#111" },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  headerDark: { backgroundColor: "#1e1e1e", borderBottomColor: "#2a2a2a" },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF0EB",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: { fontSize: 13, color: "#FF6B35", fontWeight: "500" },
  foodName: { fontSize: 22, fontWeight: "700", color: "#111" },
  textLight: { color: "#eee" },
  textMuted: { color: "#888" },
  calcCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
    elevation: 3,
  },
  calcCardDark: { backgroundColor: "#1e1e1e" },
  calcLabel: { fontSize: 13, color: "#999", marginBottom: 8 },
  calcRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  gramsInput: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    borderBottomWidth: 2,
    borderBottomColor: "#FF6B35",
    minWidth: 70,
    paddingBottom: 2,
    textAlign: "center",
  },
  gramsInputDark: { color: "#eee" },
  gramUnit: { fontSize: 18, color: "#666" },
  calcResult: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  kcalBig: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FF6B35",
    lineHeight: 52,
  },
  kcalBigSpecial: {
    fontSize: 28,
    color: "#bbb",
    fontStyle: "italic",
  },
  kcalUnit: { fontSize: 18, color: "#888" },
  estimatedBadge: {
    fontSize: 12,
    color: "#FF6B35",
    backgroundColor: "#FFF0EB",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "center",
  },
  calcHint: { fontSize: 12, color: "#bbb", marginTop: 6 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  tableDark: { backgroundColor: "#1e1e1e" },
  legend: {
    fontSize: 12,
    color: "#bbb",
    marginHorizontal: 16,
    marginTop: 8,
  },
});
