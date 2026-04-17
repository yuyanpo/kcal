import { StyleSheet, Text, View } from "react-native";
import { useIsDark } from "../context/ThemeContext";
import { NutrientField, formatNutrient, isNumber } from "../data/types";

interface Props {
  label: string;
  value: NutrientField;
  unit: string;
  dailyRef?: number; // 参考日摄入量（已按克数换算），用于进度条
  highlight?: boolean;
  estimated?: boolean;
}

export default function NutrientRow({
  label,
  value,
  unit,
  dailyRef,
  highlight = false,
  estimated = false,
}: Props) {
  const isDark = useIsDark();

  const hasNumber = isNumber(value);
  const percent =
    hasNumber && dailyRef && dailyRef > 0
      ? Math.min((value / dailyRef) * 100, 100)
      : null;

  const displayText = hasNumber
    ? `${formatNutrient(value)}${unit ? ` ${unit}` : ""}`
    : formatNutrient(value);

  // 未检测 / 未检出时颜色变淡
  const isSpecial = !hasNumber;

  return (
    <View style={[styles.row, isDark && styles.rowDark]}>
      <Text
        style={[
          styles.label,
          isDark && styles.textLight,
          highlight && styles.labelHighlight,
        ]}
      >
        {label}
      </Text>
      <View style={styles.right}>
        {percent !== null && (
          <View
            style={[styles.barContainer, isDark && styles.barContainerDark]}
          >
            <View
              style={[styles.bar, { width: `${percent}%` as `${number}%` }]}
            />
          </View>
        )}
        <Text
          style={[
            styles.value,
            isDark && styles.textLight,
            highlight && styles.valueHighlight,
            isSpecial && styles.valueSpecial,
          ]}
        >
          {displayText}
          {estimated && hasNumber && (
            <Text style={styles.estimatedMark}>*</Text>
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  rowDark: {
    backgroundColor: "#1e1e1e",
    borderBottomColor: "#2a2a2a",
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  labelHighlight: {
    fontWeight: "700",
    color: "#FF6B35",
  },
  textLight: {
    color: "#ccc",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barContainer: {
    width: 60,
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  barContainerDark: {
    backgroundColor: "#333",
  },
  bar: {
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 3,
  },
  value: {
    fontSize: 15,
    color: "#111",
    minWidth: 80,
    textAlign: "right",
  },
  valueHighlight: {
    fontWeight: "700",
    color: "#FF6B35",
    fontSize: 17,
  },
  valueSpecial: {
    color: "#bbb",
    fontStyle: "italic",
  },
  estimatedMark: {
    fontSize: 12,
    color: "#FF6B35",
  },
});
