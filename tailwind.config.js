/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 品牌色
        primary: "#FF6B35",
        "primary-bg": "#FFF0EB",

        // 页面 / 卡片 / 输入框背景
        bg: "#f5f5f7",
        card: "#ffffff",
        input: "#f2f2f2",

        // 深色模式背景
        "bg-dark": "#111111",
        "card-dark": "#1e1e1e",
        "input-dark": "#2a2a2a",
        "header-dark": "#1a1a1a",

        // 文字灰阶
        "text-primary": "#111111",
        "text-secondary": "#888888",
        "text-tertiary": "#aaaaaa",
        "text-placeholder": "#bbbbbb",
        "text-disabled": "#999999",
        "text-muted": "#666666",
        "text-faint": "#555555",

        // 深色模式文字
        "text-primary-dark": "#f0f0f0",
        "text-placeholder-dark": "#666666",

        // 边框 / 分割线
        border: "#f0f0f0",
        "border-dark": "#2a2a2a",
        "border-header": "#eeeeee",
        "border-header-dark": "#333333",
      },
    },
  },
  plugins: [],
};
