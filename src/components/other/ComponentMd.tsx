import React, { useMemo } from 'react'
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
      return match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={isDark ? funky : solarizedlight}
          customStyle={{
            padding: 8,
            borderRadius: '0.5rem',
            fontSize: 12,
            lineHeight: 1.5,
            backgroundColor: isDark ? 'black' : '#fff',
          }}
        />
      ) : (
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