import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsDark } from "../../context/ThemeContext";
import { foods } from "../../data/foods";
import { CATEGORIES } from "../../data/types";

const totalCount = foods.length;
const categoryCount = CATEGORIES.length - 1; // 排除「全部」

export default function MeScreen() {
  const isDark = useIsDark();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, isDark && styles.bgDark]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 头像 + 登录入口 */}
      <TouchableOpacity
        style={[styles.profileCard, isDark && styles.cardDark]}
        activeOpacity={0.75}
        onPress={() => Alert.alert("敬请期待")}
      >
        <View style={[styles.avatar, isDark && styles.avatarDark]}>
          <Ionicons name="person" size={36} color={isDark ? "#555" : "#ccc"} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.loginTitle, isDark && styles.textLight]}>
            点击登录
          </Text>
          <Text style={[styles.loginSub, isDark && styles.textMuted]}>
            登录后可同步收藏和记录
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={isDark ? "#555" : "#ccc"}
        />
      </TouchableOpacity>

      {/* 数据统计 */}
      <View style={[styles.statsCard, isDark && styles.cardDark]}>
        <StatItem num={String(totalCount)} label="种食物" isDark={isDark} />
        <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
        <StatItem num={String(categoryCount)} label="大分类" isDark={isDark} />
        <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
        <StatItem num="11" label="营养指标" isDark={isDark} />
      </View>

      {/* 我的功能（占位） */}
      <SectionTitle label="我的" isDark={isDark} />
      <View style={[styles.listGroup, isDark && styles.listGroupDark]}>
        <ListRow
          icon="bookmark-outline"
          label="收藏食物"
          isDark={isDark}
          showBorder
          onPress={() => Alert.alert("敬请期待")}
        />
        <ListRow
          icon="calendar-outline"
          label="饮食记录"
          isDark={isDark}
          onPress={() => Alert.alert("敬请期待")}
        />
      </View>

      {/* 设置 */}
      <SectionTitle label="设置" isDark={isDark} />
      <View style={[styles.listGroup, isDark && styles.listGroupDark]}>
        <ListRow
          icon="contrast-outline"
          label="外观主题"
          isDark={isDark}
          onPress={() => router.push("/settings")}
        />
      </View>

      {/* 关于 */}
      <SectionTitle label="关于" isDark={isDark} />
      <View style={[styles.listGroup, isDark && styles.listGroupDark]}>
        <ListRow
          icon="document-text-outline"
          label="数据来源"
          hint="中国食物成分表"
          isDark={isDark}
          showBorder
          onPress={() => router.push("/about")}
        />
        <ListRow
          icon="information-circle-outline"
          label="版本"
          hint={`v${Constants.expoConfig?.version ?? "–"}`}
          isDark={isDark}
          showChevron={false}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

// ── 子组件 ──────────────────────────────────────────

function SectionTitle({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
      {label}
    </Text>
  );
}

function StatItem({
  num,
  label,
  isDark,
}: {
  num: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statNum}>{num}</Text>
      <Text style={[styles.statLabel, isDark && styles.textMuted]}>
        {label}
      </Text>
    </View>
  );
}

function ListRow({
  icon,
  label,
  hint,
  isDark,
  showBorder,
  showChevron = true,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  hint?: string;
  isDark: boolean;
  showBorder?: boolean;
  showChevron?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.listRow,
        showBorder && (isDark ? styles.rowBorderDark : styles.rowBorder),
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isDark ? "#aaa" : "#555"}
        style={styles.listRowIcon}
      />
      <Text style={[styles.listRowLabel, isDark && styles.textLight]}>
        {label}
      </Text>
      {hint && (
        <Text style={[styles.listRowHint, isDark && styles.textMuted]}>
          {hint}
        </Text>
      )}
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? "#555" : "#ccc"}
        />
      )}
    </TouchableOpacity>
  );
}

// ── 样式 ──────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f7" },
  bgDark: { backgroundColor: "#111" },
  content: { paddingBottom: 32 },
  textLight: { color: "#f0f0f0" },
  textMuted: { color: "#888" },

  // Profile card
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: { backgroundColor: "#1e1e1e" },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarDark: { backgroundColor: "#2a2a2a" },
  profileInfo: { flex: 1 },
  loginTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
  loginSub: { fontSize: 13, color: "#aaa", marginTop: 3 },

  // Stats
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 24, fontWeight: "800", color: "#FF6B35" },
  statLabel: { fontSize: 12, color: "#888", marginTop: 4 },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#eee",
    marginVertical: 4,
  },
  statDividerDark: { backgroundColor: "#333" },

  // Section title
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

  // List group
  listGroup: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  listGroupDark: { backgroundColor: "#1e1e1e" },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  rowBorderDark: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2a2a2a",
  },
  listRowIcon: { marginRight: 12 },
  listRowLabel: { flex: 1, fontSize: 16, color: "#111" },
  listRowHint: { fontSize: 14, color: "#aaa", marginRight: 6 },
});
