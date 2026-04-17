import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useIsDark } from "../context/ThemeContext";
import { foods } from "../data/foods";

const NUTRIENTS = [
  {
    label: "能量",
    unit: "kcal/100g",
    desc: "人体活动和维持生命功能的基础能量",
  },
  { label: "蛋白质", unit: "g/100g", desc: "构建和修复肌肉、组织的重要营养素" },
  { label: "脂肪", unit: "g/100g", desc: "提供能量、帮助脂溶性维生素吸收" },
  { label: "钾", unit: "mg/100g", desc: "维持心肌功能、调节血压" },
  { label: "钠", unit: "mg/100g", desc: "维持体液平衡，摄入过多易升高血压" },
  { label: "钙", unit: "mg/100g", desc: "骨骼与牙齿的主要组成成分" },
  { label: "镁", unit: "mg/100g", desc: "参与酶反应，维持神经与肌肉功能" },
  { label: "铁", unit: "mg/100g", desc: "血红蛋白的重要组成，预防缺铁性贫血" },
  { label: "磷", unit: "mg/100g", desc: "骨骼健康及能量代谢的关键矿物质" },
  { label: "水分", unit: "g/100g", desc: "食物中的水分含量" },
  {
    label: "磷/蛋白比值",
    unit: "",
    desc: "肾病患者饮食管理的参考指标，比值越低越优",
  },
];

export default function AboutScreen() {
  const isDark = useIsDark();
  const totalCount = foods.length;

  return (
    <ScrollView
      style={[styles.container, isDark && styles.bgDark]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 数据来源 */}
      <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
        数据来源
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.sourceText, isDark && styles.textMuted]}>
          本应用数据来源于《中国食物成分表》常见食物营养成分查询表，涵盖谷薯类、蔬菜类、水果类、豆类、肉蛋奶类、坚果油脂类及加工食品共{" "}
          {totalCount} 种食物的营养成分数据。
        </Text>
      </View>

      {/* 营养素说明 */}
      <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
        营养素说明
      </Text>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {NUTRIENTS.map((n, i) => (
          <View
            key={n.label}
            style={[
              styles.nutrientRow,
              i < NUTRIENTS.length - 1 &&
                (isDark ? styles.rowBorderDark : styles.rowBorder),
            ]}
          >
            <View style={styles.nutrientLeft}>
              <Text style={[styles.nutrientLabel, isDark && styles.textLight]}>
                {n.label}
              </Text>
              {n.unit ? (
                <Text style={[styles.nutrientUnit, isDark && styles.textMuted]}>
                  {n.unit}
                </Text>
              ) : null}
            </View>
            <Text style={[styles.nutrientDesc, isDark && styles.textMuted]}>
              {n.desc}
            </Text>
          </View>
        ))}
      </View>

      {/* 免责声明 */}
      <Text style={[styles.disclaimer, isDark && styles.textMuted]}>
        本数据仅供参考，不构成医疗建议。如有特殊饮食需求，请咨询专业营养师或医生。
      </Text>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f7" },
  bgDark: { backgroundColor: "#111" },
  content: { paddingTop: 20 },
  textLight: { color: "#eee" },
  textMuted: { color: "#888" },

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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardDark: { backgroundColor: "#1e1e1e" },

  sourceText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    padding: 16,
  },

  nutrientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  rowBorderDark: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2a2a2a",
  },
  nutrientLeft: {
    width: 80,
    marginRight: 12,
  },
  nutrientLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  nutrientUnit: {
    fontSize: 11,
    color: "#bbb",
    marginTop: 2,
  },
  nutrientDesc: {
    flex: 1,
    fontSize: 13,
    color: "#777",
    lineHeight: 20,
    paddingTop: 1,
  },

  disclaimer: {
    fontSize: 12,
    color: "#bbb",
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 18,
    textAlign: "center",
  },
});
