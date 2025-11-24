# Overlay 遮罩层组件

Overlay 是一个全屏遮罩层组件，基于 React Native 的 Modal，常用于弹窗、对话框等场景的底层遮罩。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```tsx
import { OverLay } from '@zhenryx/react-native-ui';
import { useState } from 'react';
function App() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button title="显示遮罩" onClick={() => setVisible(true)} />
      <OverLay 
        visible={visible} 
        onOverlayPress={() => setVisible(false)}
      >
        <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <Text>遮罩层内容</Text>
        </View>
      </OverLay>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示遮罩层 | `boolean` | `false` | ✅ |
| children | 遮罩层内容，会居中显示 | `React.ReactNode` | - | ❌ |
| overlayStyle | 自定义遮罩层样式 | `StyleProp<ViewStyle>` | - | ❌ |
| onOverlayPress | 点击遮罩层时的回调（通常用于关闭） | `() => void` | `() => null` | ❌ |

## 使用示例

### 基础用法

```tsx
<OverLay 
  visible={visible} 
  onOverlayPress={() => setVisible(false)}
>
  <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
    <Text>这是遮罩层内容</Text>
  </View>
</OverLay>
```

### 自定义遮罩样式

```tsx
<OverLay 
  visible={visible}
  overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  onOverlayPress={() => setVisible(false)}
>
  <View style={{ backgroundColor: '#fff', padding: 20 }}>
    <Text>自定义遮罩颜色</Text>
  </View>
</OverLay>
```

### 禁止点击遮罩关闭

```tsx
<OverLay 
  visible={visible}
  onOverlayPress={() => {}} // 空函数，不关闭
>
  <View style={{ backgroundColor: '#fff', padding: 20 }}>
    <Text>点击遮罩不会关闭</Text>
  </View>
</OverLay>
```

### 与 Popup 配合使用

```tsx
// Popup 内部使用了 OverLay
import { Popup } from '@zhenryx/react-native-ui';

<Popup visible={visible} onClose={() => setVisible(false)}>
  <Text>Popup 内容</Text>
</Popup>
```

