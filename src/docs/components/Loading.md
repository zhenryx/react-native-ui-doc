# Loading 加载组件

Loading 是一个加载指示器组件，支持自定义图标、文字和遮罩层，常用于数据加载、提交等异步操作场景。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```tsx
import { Loading } from '@zhenryx/react-native-ui';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button title="开始加载" onClick={() => setLoading(true)} />
      <Loading visible={loading} text="加载中..." />
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示加载指示器 | `boolean` | `false` | ✅ |
| overlay | 是否显示遮罩层 | `boolean` | `false` | ❌ |
| text | 加载提示文字 | `string` | `'加载中......'` | ❌ |
| logoIcon | 自定义中心图标（logo），支持本地图片（require）或网络图片（uri） | `number \| string` | 默认 logo 图标 | ❌ |
| warpIcon | 自定义旋转图标（外圈），支持本地图片（require）或网络图片（uri） | `number \| string` | 默认旋转图标 | ❌ |
| showLogo | 是否显示中心 logo | `boolean` | `true` | ❌ |

## 使用示例

### 基础用法

```tsx
<Loading visible={true} />
```

### 带遮罩层

```tsx
<Loading visible={true} overlay text="加载中，请稍候..." />
```

### 自定义文字

```tsx
<Loading visible={true} text="数据加载中..." />
<Loading visible={true} text="提交中..." />
<Loading visible={true} text="处理中，请稍候" />
```

### 自定义图标

```tsx
{/* 自定义中心 logo */}
<Loading 
  visible={true} 
  logoIcon={require('./assets/custom-logo.png')} 
/>

{/* 自定义旋转图标 */}
<Loading 
  visible={true} 
  warpIcon={require('./assets/custom-circle.png')} 
/>

{/* 使用网络图片 */}
<Loading 
  visible={true} 
  logoIcon="https://example.com/logo.png"
  warpIcon="https://example.com/circle.png"
/>

{/* 只显示旋转图标，不显示 logo */}
<Loading visible={true} showLogo={false} />
```

### 在异步操作中使用

```tsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.getData();
    // 处理数据
  } catch (error) {
    // 处理错误
  } finally {
    setLoading(false);
  }
};

return (
  <>
    <Button title="加载数据" onClick={fetchData} />
    <Loading visible={loading} overlay text="加载数据中..." />
  </>
);
```

### 表单提交

```tsx
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async () => {
  setSubmitting(true);
  try {
    await api.submitForm(formData);
    // 提交成功
  } finally {
    setSubmitting(false);
  }
};

return (
  <>
    <Button title="提交" onClick={handleSubmit} disabled={submitting} />
    <Loading visible={submitting} overlay text="提交中..." />
  </>
);
```

