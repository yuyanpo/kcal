# 卡路里 (Kcal)

一款中文食物热量查询 App，收录 242 种常见食物的营养成分数据。

## 功能

- **食物搜索**：支持中文名称及拼音搜索
- **分类浏览**：谷薯类、蔬菜类、水果类、豆类、肉蛋奶类、坚果油脂类、加工食品及饮料类
- **热量计算器**：输入克数实时换算卡路里
- **营养成分详情**：展示 11 项营养指标，含参考摄入量进度条
- **首页排行**：低能量、高蛋白推荐、高脂肪食物榜单
- **深色模式**：支持亮色 / 暗色 / 跟随系统三种主题

## 技术栈

- [Expo](https://expo.dev) ~54 + React Native 0.81
- [Expo Router](https://expo.github.io/router) 文件路由
- [NativeWind](https://www.nativewind.dev) v4（Tailwind CSS for React Native）
- TypeScript strict 模式

## 数据来源

《中国食物成分表》常见食物营养成分查询表，静态数据存储于 `data/foods.ts`，无网络请求。

## 开发

```bash
npm install
npx expo start          # 启动开发服务器
npx expo start --ios    # iOS 模拟器
npx expo start --android
npx expo start --web
npx expo start --clear  # 清除 Metro 缓存后启动
expo lint               # ESLint 检查
```

## 目录结构

```
app/
  (tabs)/         # 底部 Tab：首页 + 我的
  food/[id].tsx   # 食物详情页
  search.tsx      # 搜索页
  settings.tsx    # 设置页（主题切换）
  about.tsx       # 数据来源说明
data/
  foods.ts        # 242 种食物静态数据（勿手动编辑）
  types.ts        # 类型定义与工具函数
components/       # 公共组件
context/
  ThemeContext.tsx # 主题上下文（useIsDark hook）
```
