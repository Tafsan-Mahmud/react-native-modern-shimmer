# react-native-modern-shimmer

A lightweight, **zero-dependency** shimmer placeholder component for React Native and Expo.

- ✅ Zero dependencies — uses React Native's core `Animated` API only
- ✅ Auto-detects dark / light mode from the system
- ✅ Full TypeScript support
- ✅ Works with bare React Native and Expo
- ✅ Smooth opacity pulse animation — battery friendly
- ✅ Fully customizable via props

---

## Preview

| Light Mode | Dark Mode |
|---|---|
| Smooth pulse on light background | Subtle pulse on dark background |

---

## Installation

```bash
# npm
npm install react-native-modern-shimmer

# yarn
yarn add react-native-modern-shimmer

# expo
npx expo install react-native-modern-shimmer
```

> **No additional setup required.** No native modules, no linking, no extra packages.

---

## Basic Usage

```tsx
import Shimmer from 'react-native-modern-shimmer';

export default function MyScreen() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Shimmer width={200} height={16} />
      <Shimmer width="80%" height={16} />
      <Shimmer width="60%" height={16} />
    </View>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `number \| string` | `"100%"` | Width of the shimmer. Accepts px number or `"%"` string |
| `height` | `number` | `16` | Height in pixels |
| `borderRadius` | `number` | `8` | Corner radius |
| `isDark` | `boolean` | `undefined` | Force dark appearance. If omitted, auto-detects system theme |
| `baseColor` | `string` | theme default | Override the background color |
| `speed` | `number` | `1000` | Animation cycle duration in ms. Lower = faster |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Extra styles on the container |

---

## Use Cases

### Text placeholder

```tsx
<View style={{ gap: 8 }}>
  <Shimmer width="90%" height={14} borderRadius={4} />
  <Shimmer width="75%" height={14} borderRadius={4} />
  <Shimmer width="60%" height={14} borderRadius={4} />
</View>
```

### Avatar + name placeholder

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  {/* Circle avatar */}
  <Shimmer width={48} height={48} borderRadius={24} />

  {/* Name + subtitle lines */}
  <View style={{ gap: 8 }}>
    <Shimmer width={140} height={14} borderRadius={4} />
    <Shimmer width={100} height={12} borderRadius={4} />
  </View>
</View>
```

### Card placeholder

```tsx
<View style={{ gap: 12 }}>
  {/* Card image */}
  <Shimmer width="100%" height={180} borderRadius={16} />

  {/* Card title */}
  <Shimmer width="70%" height={16} borderRadius={6} />

  {/* Card subtitle */}
  <Shimmer width="50%" height={13} borderRadius={6} />
</View>
```

### List rows placeholder

```tsx
{Array.from({ length: 6 }).map((_, i) => (
  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
    <Shimmer width={52} height={52} borderRadius={12} />
    <View style={{ flex: 1, gap: 8 }}>
      <Shimmer width="80%" height={13} borderRadius={6} />
      <Shimmer width="55%" height={13} borderRadius={6} />
    </View>
  </View>
))}
```

### Force dark mode (e.g. inside a dark card)

```tsx
<Shimmer width="100%" height={16} isDark />
```

### Force light mode

```tsx
<Shimmer width="100%" height={16} isDark={false} />
```

### Custom color (match your brand)

```tsx
<Shimmer
  width="100%"
  height={120}
  borderRadius={16}
  baseColor="#1a1a2e"
/>
```

### Faster animation

```tsx
<Shimmer width={200} height={16} speed={600} />
```

### Slower animation

```tsx
<Shimmer width={200} height={16} speed={2000} />
```

---

## Theme Defaults

The component ships with carefully chosen defaults that look great out of the box on both themes:

| Mode | Base Color | Description |
|---|---|---|
| Light | `#e2e5ea` | Neutral cool gray — works on white and light surfaces |
| Dark | `#2c2f38` | Dark slate — works on dark surfaces |

Override with `baseColor` to match your app's exact surface color.

---

## Compatibility

| Platform | Supported |
|---|---|
| React Native (bare) | ✅ |
| Expo (managed) | ✅ |
| Expo (bare) | ✅ |
| iOS | ✅ |
| Android | ✅ |
| Web (react-native-web) | ✅ |

**Minimum versions:**
- React Native `≥ 0.60`
- React `≥ 16.8` (hooks)
- Expo SDK `≥ 44`

---

## Why no LinearGradient?

Many shimmer libraries require `expo-linear-gradient` or `react-native-linear-gradient` which need native linking or an Expo dev build. This library achieves a professional shimmer effect using **only React Native's core `Animated` API** — zero setup, works everywhere, including Expo Go.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

[MIT](./LICENSE) © Abu Hasnat Nobin
