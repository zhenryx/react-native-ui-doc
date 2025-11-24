# Button 按钮组件

Button 是一个功能丰富的按钮组件，支持多种尺寸、样式和交互效果，并自动集成主题系统。

## 安装

```bash
npm install @zhenryx/react-native-ui
```

## 基础用法

```snack:5f4737

import { Button } from '@zhenryx/react-native-ui';

// 基础按钮（使用主题色）
<Button title="点击我" onClick={() => console.log('点击了')} />

// 自定义颜色
<Button title="自定义颜色" color="#ff0000" onClick={() => {}} />

// 禁用状态
<Button title="禁用按钮" disabled />

// 全宽按钮
<Button title="全宽按钮" fullWidth />
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 按钮文本 | `string` | - | ✅ |
| size | 按钮尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ |
| width | 按钮宽度 | `number \| string` | `120` | ❌ |
| fullWidth | 是否全宽 | `boolean` | `false` | ❌ |
| height | 自定义高度（覆盖 size 的高度） | `number` | - | ❌ |
| fill | 填充样式 | `'solid' \| 'outline'` | `'solid'` | ❌ |
| onClick | 点击事件回调 | `() => void` | `() => {}` | ❌ |
| color | 主题颜色（solid 时作为背景色，outline 时作为边框和文本色）。不传则使用主题的 `$primary-color` | `string` | - | ❌ |
| disabled | 是否禁用 | `boolean` | `false` | ❌ |
| feedbackEffect | 是否开启点击反馈效果（按下时透明度变化） | `boolean` | `true` | ❌ |
| style | 自定义样式 | `StyleProp<ViewStyle>` | - | ❌ |

## 尺寸说明

| 尺寸 | 高度 | 文字大小 |
|------|------|----------|
| sm | 36 | 14 |
| md | 44 | 16 |
| lg | 52 | 18 |

## 使用示例

### 不同尺寸

```tsx
<Button title="小按钮" size="sm" />
<Button title="中等按钮" size="md" />
<Button title="大按钮" size="lg" />
```

### 不同样式

```tsx
{/* 实心按钮 */}
<Button title="实心按钮" fill="solid" color="#12b5faff" />

{/* 描边按钮 */}
<Button title="描边按钮" fill="outline" color="#12b5faff" />
```

### 自定义颜色

```tsx
<Button title="红色按钮" color="#ff0000" />
<Button title="绿色按钮" color="#00ff00" />
<Button title="蓝色描边" fill="outline" color="#0000ff" />
```

### 自定义尺寸

```tsx
{/* 自定义宽度 */}
<Button title="宽按钮" width={200} />

{/* 自定义高度 */}
<Button title="高按钮" height={60} />

{/* 全宽按钮 */}
<Button title="全宽按钮" fullWidth />
```

### 禁用状态

```tsx
<Button title="禁用按钮" disabled />
<Button title="禁用按钮" disabled color="#ff0000" />
```

### 关闭点击反馈

```tsx
<Button title="无反馈效果" feedbackEffect={false} />
```

### 自定义样式

```tsx
<Button 
  title="自定义样式" 
  style={{ 
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }} 
/>
```

### 事件处理

```tsx
<Button 
  title="点击我" 
  onClick={() => {
    console.log('按钮被点击了');
    // 执行你的逻辑
  }} 
/>
```

