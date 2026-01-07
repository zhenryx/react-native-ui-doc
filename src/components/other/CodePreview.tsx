import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { funky, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkTheme } from '../../hooks/useDarkTheme'

interface CodePreviewProps {
  code: string
  children: React.ReactNode
  language?: string
}

/**
 * 代码预览组件
 * 显示组件效果，并可展开/隐藏代码
 */
export const CodePreview: React.FC<CodePreviewProps> = ({ 
  code, 
  children, 
  language = 'tsx' 
}) => {
  const [showCode, setShowCode] = useState(false)
  const { isDark } = useDarkTheme()

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* 预览区域 */}
      <div className="bg-white dark:bg-gray-800 p-6 relative">
        {/* 组件预览 */}
        <div className="flex items-center justify-center">
          {children}
        </div>
        
        {/* 展开/隐藏代码按钮 */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
            />
          </svg>
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {/* 代码区域 */}
      {showCode && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <SyntaxHighlighter
            language={language}
            style={isDark ? funky : solarizedlight}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}

