# Popup 弹出层组件

Popup 是一个灵活的弹出层组件，支持从底部或中心弹出，带有动画效果和可选的关闭按钮。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```tsx
import { Popup } from '@zhenryx/react-native-ui';
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="打开弹出层" onClick={() => setVisible(true)} />
      <Popup 
        visible={visible} 
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text>弹出层内容</Text>
        </View>
      </Popup>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示弹出层 | `boolean` | `false` | ✅ |
| position | 弹出位置 | `'bottom' \| 'center'` | `'center'` | ❌ |
| height | 弹出层高度（仅在 position="bottom" 时生效） | `number` | `200` | ❌ |
| width | 弹出层宽度（仅在 position="center" 时生效） | `number \| string` | `300` | ❌ |
| closeable | 是否显示关闭按钮 | `boolean` | `true` | ❌ |
| overlayStyle | 自定义遮罩层样式 | `StyleProp<ViewStyle>` | - | ❌ |
| round | 是否显示圆角 | `boolean` | `false` | ❌ |
| style | 自定义弹出层样式 | `StyleProp<ViewStyle>` | - | ❌ |
| children | 弹出层内容 | `React.ReactNode` | - | ❌ |
| onClose | 关闭回调（点击遮罩或关闭按钮时触发） | `() => void` | - | ❌ |

## 使用示例

### 中心弹出

```tsx
<Popup 
  visible={visible} 
  position="center"
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 20 }}>
    <Text>中心弹出的内容</Text>
  </View>
</Popup>
```

### 底部弹出

```tsx
<Popup 
  visible={visible} 
  position="bottom"
  height={400}
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 20 }}>
    <Text>从底部弹出的内容</Text>
  </View>
</Popup>
```

### 带圆角

```tsx
<Popup 
  visible={visible} 
  round
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 20 }}>
    <Text>带圆角的弹出层</Text>
  </View>
</Popup>
```

### 隐藏关闭按钮

```tsx
<Popup 
  visible={visible} 
  closeable={false}
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 20 }}>
    <Text>没有关闭按钮的弹出层</Text>
  </View>
</Popup>
```

### 自定义尺寸

```tsx
{/* 中心弹出，自定义宽度 */}
<Popup 
  visible={visible} 
  position="center"
  width={250}
  onClose={() => setVisible(false)}
>
  <Text>自定义宽度</Text>
</Popup>

{/* 底部弹出，自定义高度 */}
<Popup 
  visible={visible} 
  position="bottom"
  height={500}
  onClose={() => setVisible(false)}
>
  <Text>自定义高度</Text>
</Popup>
```

### 自定义遮罩

```tsx
<Popup 
  visible={visible} 
  overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  onClose={() => setVisible(false)}
>
  <Text>自定义遮罩颜色</Text>
</Popup>
```

### 自定义样式

```tsx
<Popup 
  visible={visible} 
  style={{ backgroundColor: '#f0f0f0' }}
  onClose={() => setVisible(false)}
>
  <Text>自定义弹出层样式</Text>
</Popup>
```


