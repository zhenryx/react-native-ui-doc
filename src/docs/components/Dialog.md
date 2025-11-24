# Dialog 对话框组件

Dialog 是一个基于 Popup 的对话框组件，支持提示和确认两种类型，常用于需要用户确认的操作场景。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```tsx
import { Dialog } from '@zhenryx/react-native-ui';
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="打开对话框" onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        type="alert"
        title="提示"
        content="这是一个提示对话框"
        onConfirm={() => {
          console.log('确认');
          setVisible(false);
        }}
      />
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示对话框 | `boolean` | `false` | ✅ |
| type | 对话框类型 | `'alert' \| 'confirm'` | `'alert'` | ❌ |
| title | 对话框标题 | `string` | `'提示'` | ❌ |
| content | 对话框内容 | `string` | `''` | ❌ |
| onConfirm | 确认按钮点击回调 | `() => void` | `() => null` | ❌ |
| onCancel | 取消按钮点击回调（仅在 type="confirm" 时显示） | `() => void` | `() => null` | ❌ |
| children | 自定义内容，会显示在标题和内容下方 | `React.ReactNode` | - | ❌ |

## 使用示例

### 提示对话框（Alert）

```tsx
<Dialog
  visible={visible}
  type="alert"
  title="操作成功"
  content="您的操作已成功完成"
  onConfirm={() => {
    console.log('用户点击了确定');
    setVisible(false);
  }}
/>
```

### 确认对话框（Confirm）

```tsx
<Dialog
  visible={visible}
  type="confirm"
  title="确认删除"
  content="删除后无法恢复，确定要删除吗？"
  onConfirm={() => {
    console.log('用户确认删除');
    setVisible(false);
  }}
  onCancel={() => {
    console.log('用户取消删除');
    setVisible(false);
  }}
/>
```

### 自定义内容

```tsx
<Dialog
  visible={visible}
  title="自定义内容"
  content="基础内容"
  onConfirm={() => setVisible(false)}
>
  <View style={{ padding: 10 }}>
    <Text>这是自定义内容区域</Text>
  </View>
</Dialog>
```

### 多行内容

```tsx
<Dialog
  visible={visible}
  title="重要提示"
  content="第一行内容\n第二行内容\n第三行内容"
  onConfirm={() => setVisible(false)}
/>
```


