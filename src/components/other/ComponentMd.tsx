import React, { useMemo, useState } from 'react'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { funky, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkTheme } from '../../hooks/useDarkTheme'

// 使用 import.meta.glob 预加载所有 md 文件
const mdModules = import.meta.glob('/src/docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

/**
 * 交互式代码块组件
 * 可展开/隐藏代码
 */
const InteractiveCodeBlock: React.FC<{
  code: string
  language: string
  isDark: boolean
}> = ({ code, language, isDark }) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* 预览区域 */}
      <div className="bg-white dark:bg-gray-800 p-6 relative">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          预览
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {code}
          </pre>
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
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}

/**
 * 将路由路径转换为本地文档路径
 * @param hashPath 路由路径，例如 '#guild/start' 或 '#components/button'
 * @returns 本地文件路径，例如 '/src/docs/README.md' 或 '/src/docs/Button.md'
 */
function getLocalDocPath(hashPath: string): string {
  // 移除 # 号，例如 '#guild/start' -> 'guild/start'
  const path = hashPath.replace(/^#/, '')
  
  // 特殊处理：快速开始页面使用 README.md
  if (path === 'guild/start' || path === 'guild/intro') {
    return '/src/docs/README.md'
  }
  
  // 组件文档：从路径最后一部分生成文件名
  // 例如 'components/button' -> 'Button.md'
  const parts = path.split('/')
  const lastPart = parts[parts.length - 1]
  // 首字母大写，例如 'button' -> 'Button'
  const fileName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
  return `/src/docs/${fileName}.md`
}

interface ComponentMdProps {
  path: string
}

export const ComponentMd: React.FC<ComponentMdProps> = ({ path }) => {
  const { isDark } = useDarkTheme()
  // 将路由路径转换为本地文档路径
  const docPath = getLocalDocPath(path)
  // 从预加载的模块中获取文档内容
  const content = (mdModules[docPath] as string) || ''

  const components = useMemo(() => ({
    // 为标题添加 id 属性，用于锚点跳转
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: (props: any) => {
      const { children } = props
      const text = String(children).trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      return <h1 id={id} {...props} />
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: (props: any) => {
      const { children } = props
      const text = String(children).trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      return <h2 id={id} {...props} />
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: (props: any) => {
      const { children } = props
      const text = String(children).trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      return <h3 id={id} {...props} />
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: (props: any) => {
      const { children, className, ...rest } = props
      const match = /language-(\w+)/.exec(className || '')
      
      // 如果是代码块（有语言标识）
      if (match) {
        const code = String(children).replace(/\n$/, '')
        const language = match[1]
        
        // 只对 tsx/jsx 代码块启用预览功能
        if (language === 'tsx' || language === 'jsx') {
          return <InteractiveCodeBlock code={code} language={language} isDark={isDark} />
        }
        
        // 其他语言只显示代码
        return (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={code}
            language={language}
            style={isDark ? funky : solarizedlight}
            customStyle={{
              padding: 8,
              borderRadius: '0.5rem',
              fontSize: 12,
              lineHeight: 1.5,
              backgroundColor: isDark ? 'black' : '#fff',
            }}
          />
        )
      }
      
      // 行内代码
      return (
        <code {...rest} className={className}>
          {children}
        </code>
      )
    }
  } as Components), [isDark])

  if (!content) {
    return (
      <div className="markdown-content py-20">
        <p className="text-gray-500">文档未找到：{path}</p>
      </div>
    )
  }

  return (
    <div className="markdown-content">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  )
}