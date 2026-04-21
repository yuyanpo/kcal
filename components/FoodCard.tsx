import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useIsDark } from "../context/ThemeContext";
import { getFoodImageUrl } from "../data/imageUtils";
import { FoodItem, formatNutrient, isNumber } from "../data/types";

const noImage = require("../assets/images/no-image.png");

interface Props {
  item: FoodItem;
  onPress: () => void;
}

export default function FoodCard({ item, onPress }: Props) {
  const isDark = useIsDark();
  const [imgError, setImgError] = useState(false);

  const imageUrl = getFoodImageUrl(item.image);
  const showRemote = imageUrl && !imgError;

  const kcalText = isNumber(item.energy)
    ? `${item.energy} kcal`
    : formatNutrient(item.energy);
  const isEstimatedEnergy = item.estimated?.includes("energy");

  const proteinText = isNumber(item.protein)
    ? `蛋白质 ${formatNutrient(item.protein)}g`
    : "";
  const fatText = isNumber(item.fat) ? `脂肪 ${formatNutrient(item.fat)}g` : "";

  return (
    <TouchableOpacity
      style={[styles.card, isDark && styles.cardDark]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* 食物图片 */}
      <View
        className={`rounded-xl overflow-hidden ${isDark ? "bg-[#2a2a2a]" : "bg-[#f0f0f0]"}`}
        style={{ width: 56, height: 56, flexShrink: 0 }}
      >
        <Image
          source={showRemote ? { uri: imageUrl } : noImage}
          style={{ width: 56, height: 56 }}
          onError={() => setImgError(true)}
        />
      </View>

      <View style={styles.left}>
        <Text
          style={[styles.name, isDark && styles.textLight]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View style={styles.meta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          {proteinText ? (
            <Text style={[styles.sub, isDark && styles.subDark]}>
              {proteinText}
            </Text>
          ) : null}
          {fatText ? (
            <Text style={[styles.sub, isDark && styles.subDark]}>
              {fatText}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.kcal}>
          {kcalText}
          {isEstimatedEnergy ? (
            <Text style={styles.estimatedMark}>*</Text>
          ) : null}
        </Text>
        <Text style={[styles.per100, isDark && styles.subDark]}>/100g</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1e1e1e",
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },
  textLight: {
    color: "#eee",
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: "#FFF0EB",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "500",
  },
  sub: {
    fontSize: 12,
    color: "#888",
  },
  subDark: {
    color: "#666",
  },
  right: {
    alignItems: "flex-end",
  },
  kcal: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6B35",
  },
  estimatedMark: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "400",
  },
  per100: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 2,
  },
});
