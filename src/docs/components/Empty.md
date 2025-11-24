# Empty 空状态组件

Empty 用于展示空状态，通常在列表为空、数据加载失败或搜索无结果时使用。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```tsx
import { Empty } from '@zhenryx/react-native-ui';

// 基础用法
<Empty />

// 自定义描述
<Empty desc="暂无数据" />

// 自定义图片
<Empty img={require('./assets/custom-empty.png')} />
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 自定义内容，显示在描述文字下方 | `React.ReactNode` | - | ❌ |
| img | 自定义图片，支持本地图片（require）或网络图片（uri） | `ImageSourcePropType` | 默认空状态图标 | ❌ |
| width | 图片宽度 | `number` | `120` | ❌ |
| height | 图片高度 | `number` | `100` | ❌ |
| desc | 描述文字 | `string` | `"数据消失了～"` | ❌ |
| style | 自定义容器样式 | `StyleProp<ViewStyle>` | - | ❌ |

## 使用示例

### 基础用法

```tsx
<Empty />
```

### 自定义描述

```tsx
<Empty desc="暂无数据，请稍后再试" />
<Empty desc="网络错误，请检查网络连接" />
<Empty desc="搜索结果为空" />
```

### 自定义图片

```tsx
{/* 使用本地图片 */}
<Empty img={require('./assets/empty.png')} />

{/* 使用网络图片 */}
<Empty img={{ uri: 'https://example.com/empty.png' }} />

{/* 自定义图片尺寸 */}
<Empty 
  img={require('./assets/empty.png')} 
  width={150} 
  height={120} 
/>
```

### 自定义内容

```tsx
<Empty desc="暂无数据">
  <Button title="刷新" onClick={handleRefresh} />
</Empty>
```

### 自定义样式

```tsx
<Empty 
  desc="暂无数据"
  style={{ 
    paddingVertical: 60,
    backgroundColor: '#f5f5f5'
  }} 
/>
```

### 在列表中使用

```tsx
{data.length === 0 ? (
  <Empty desc="列表为空" />
) : (
  <FlatList data={data} renderItem={renderItem} />
)}
```

