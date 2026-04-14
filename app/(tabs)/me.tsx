import { ScrollView, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native';
import { foods } from '../../data/foods';
import { CATEGORIES } from '../../data/types';

const NUTRIENTS = [
  { label: '能量', unit: 'kcal/100g', desc: '人体活动和维持生命功能的基础能量' },
  { label: '蛋白质', unit: 'g/100g', desc: '构建和修复肌肉、组织的重要营养素' },
  { label: '脂肪', unit: 'g/100g', desc: '提供能量、帮助脂溶性维生素吸收' },
  { label: '钾', unit: 'mg/100g', desc: '维持心肌功能、调节血压' },
  { label: '钠', unit: 'mg/100g', desc: '维持体液平衡，摄入过多易升高血压' },
  { label: '钙', unit: 'mg/100g', desc: '骨骼与牙齿的主要组成成分' },
  { label: '镁', unit: 'mg/100g', desc: '参与酶反应，维持神经与肌肉功能' },
  { label: '铁', unit: 'mg/100g', desc: '血红蛋白的重要组成，预防缺铁性贫血' },
  { label: '磷', unit: 'mg/100g', desc: '骨骼健康及能量代谢的关键矿物质' },
];

export default function MeScreen() {
  const isDark = useColorScheme() === 'dark';

  const totalCount = foods.length;
  const categoryCount = CATEGORIES.length - 1; // 排除「全部」

  return (
    <SafeAreaView style={[styles.safe, isDark && styles.bgDark]}>
      <ScrollView style={[styles.container, isDark && styles.bgDark]} showsVerticalScrollIndicator={false}>

        {/* APP Logo 区域 */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🥗</Text>
          </View>
          <Text style={styles.appName}>卡路里</Text>
          <Text style={[styles.appNameEn, isDark && styles.textMuted]}>Kcal</Text>
          <Text style={[styles.version, isDark && styles.textMuted]}>v1.0.0</Text>
        </View>

        {/* 数据统计 */}
        <View style={[styles.statsCard, isDark && styles.cardDark]}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{totalCount}</Text>
            <Text style={[styles.statLabel, isDark && styles.textMuted]}>种食物</Text>
          </View>
          <View style={[styles.divider, isDark && styles.dividerDark]} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{categoryCount}</Text>
            <Text style={[styles.statLabel, isDark && styles.textMuted]}>大分类</Text>
          </View>
          <View style={[styles.divider, isDark && styles.dividerDark]} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>11</Text>
            <Text style={[styles.statLabel, isDark && styles.textMuted]}>营养指标</Text>
          </View>
        </View>

        {/* 营养素说明 */}
        <Text style={[styles.sectionTitle, isDark && styles.textLight]}>营养素说明</Text>
        <View style={[styles.tableCard, isDark && styles.cardDark]}>
          {NUTRIENTS.map((n, i) => (
            <View key={n.label} style={[styles.nutrientRow, i < NUTRIENTS.length - 1 && styles.rowBorder, isDark && styles.rowBorderDark]}>
              <View style={styles.nutrientLeft}>
                <Text style={[styles.nutrientLabel, isDark && styles.textLight]}>{n.label}</Text>
                <Text style={[styles.nutrientUnit, isDark && styles.textMuted]}>{n.unit}</Text>
              </View>
              <Text style={[styles.nutrientDesc, isDark && styles.textMuted]}>{n.desc}</Text>
            </View>
          ))}
        </View>

        {/* 数据来源 */}
        <Text style={[styles.sectionTitle, isDark && styles.textLight]}>数据来源</Text>
        <View style={[styles.tableCard, isDark && styles.cardDark]}>
          <Text style={[styles.sourceText, isDark && styles.textMuted]}>
            本应用数据来源于《中国食物成分表》常见食物营养成分查询表，涵盖谷薯类、蔬菜类、水果类、豆类、肉蛋奶类、坚果油脂类及加工食品共 {totalCount} 种食物的营养成分数据。
          </Text>
        </View>

        {/* 免责声明 */}
        <Text style={[styles.disclaimer, isDark && styles.textMuted]}>
          本数据仅供参考，不构成医疗建议。如有特殊饮食需求，请咨询专业营养师或医生。
        </Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  bgDark: {
    backgroundColor: '#111',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B35',
  },
  appNameEn: {
    fontSize: 14,
    color: '#aaa',
    letterSpacing: 2,
    marginTop: 2,
  },
  version: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 4,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  dividerDark: {
    backgroundColor: '#333',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textLight: {
    color: '#eee',
  },
  textMuted: {
    color: '#888',
  },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  rowBorderDark: {
    borderBottomColor: '#2a2a2a',
  },
  nutrientLeft: {
    width: 70,
    marginRight: 12,
  },
  nutrientLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  nutrientUnit: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 2,
  },
  nutrientDesc: {
    flex: 1,
    fontSize: 13,
    color: '#777',
    lineHeight: 20,
  },
  sourceText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    padding: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#bbb',
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 18,
    textAlign: 'center',
  },
});
