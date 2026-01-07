import React from 'react'
import { CodePreview } from '../components/other/CodePreview'

/**
 * 组件演示页面示例
 * 展示如何使用 CodePreview 组件
 */
export const ComponentDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Variants</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          There are solid button, outline button and clear button types.
        </p>
        
        <CodePreview 
          code={`<Stack row align="center" spacing={4}>
  <Button title="Solid" />
  <Button title="Outline" type="outline" />
  <Button title="Clear" type="clear" />
</Stack>`}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Solid
            </button>
            <button 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: 'transparent', 
                color: '#2563eb', 
                border: '2px solid #2563eb', 
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Outline
            </button>
            <button 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: 'transparent', 
                color: '#2563eb', 
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
        </CodePreview>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Sizes</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Buttons come in different sizes: small, medium, and large.
        </p>
        
        <CodePreview 
          code={`<Stack row align="center" spacing={4}>
  <Button title="Small" size="sm" />
  <Button title="Medium" size="md" />
  <Button title="Large" size="lg" />
</Stack>`}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              style={{ 
                padding: '6px 12px', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Small
            </button>
            <button 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Medium
            </button>
            <button 
              style={{ 
                padding: '14px 28px', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Large
            </button>
          </div>
        </CodePreview>
      </div>
    </div>
  )
}

