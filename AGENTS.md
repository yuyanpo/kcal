# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (scan QR to open on device)
npx expo start --ios    # Open in iOS Simulator
npx expo start --android
npx expo start --web
expo lint               # ESLint
```

No test suite is configured.

## Architecture

This is a React Native / Expo app called **卡路里 (Kcal)** — a Chinese food calorie lookup app. It uses **Expo Router** (file-based routing), **NativeWind** (Tailwind CSS for React Native), and TypeScript strict mode.

### Data layer (`data/`)

All food data is **static** — no network calls, no database.

- `data/types.ts` — Core types. `NutrientField = number | 'not_measured' | 'not_detected'`. Foods with estimated values (source data marked with `*`) carry an `estimated` string array listing which fields are estimates. Use `isNumber(v)` and `formatNutrient(v)` from this file rather than raw comparisons.
- `data/foods.ts` — 242 Chinese food items generated from `source-data/data-total.html`. **Do not hand-edit this file** — regenerate it from the HTML source via the Node.js parse script used during setup.

### Routing (`app/`)

```
app/
  index.tsx           → Redirect to /(tabs)
  _layout.tsx         → Root Stack; configures food/[id] header color (#FF6B35)
  (tabs)/_layout.tsx  → Bottom tabs: 搜索 (index) + 我的 (me)
  (tabs)/index.tsx    → Search screen: SearchBar + CategoryFilter + FlatList of FoodCards
  (tabs)/me.tsx       → Static info page (stats, nutrient glossary, data source)
  food/[id].tsx       → Detail page: gram-input calculator + NutrientRow list
```

### Components (`components/`)

- `FoodCard` — List item. Displays energy with `*` superscript if `estimated` includes `'energy'`.
- `CategoryFilter` — Horizontal scrollable chips using `CATEGORIES` from `data/types.ts`.
- `NutrientRow` — Used in detail page. Renders `'not_measured'` / `'not_detected'` as grey italic text; number values show an optional progress bar against `dailyRef`.
- `SearchBar` — Controlled input, passes through to parent's `useState`.

### Styling

**New code should use NativeWind utility classes.** Existing `StyleSheet.create` code is not being migrated.

Design tokens are defined once in `tailwind.config.js` under `theme.extend.colors` and are the single source of truth for both NativeWind classes and any remaining `StyleSheet` hardcoded values. Key tokens:

- `primary` → `#FF6B35` (brand orange)
- `primary-bg` → `#FFF0EB` (light tint for badges/chips)
- `card` / `card-dark`, `bg` / `bg-dark`, `input` / `input-dark` → surface backgrounds
- `text-primary` … `text-faint` → six grey text levels
- `border` / `border-dark` → dividers

Dark mode uses `useColorScheme()` with manual `isDark` boolean checks — there is no theme context. NativeWind dark mode variant (`dark:`) is available for new code.

### `app-example/`

Reference/template directory from the Expo scaffold. **Not part of the app.** TypeScript errors from this directory are expected and can be ignored.
