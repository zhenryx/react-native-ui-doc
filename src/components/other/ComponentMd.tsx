import React, {useMemo } from 'react'
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

// 路径映射：将路由路径转换为文档路径
// 例如'#guild/start': '/src/docs/Installation.md',
const pathToDocMap: Record<string, string> = {}

interface ComponentMdProps {
  path: string
}

export const ComponentMd: React.FC<ComponentMdProps> = ({ path }) => {
  const { isDark } = useDarkTheme()
  const docPath = pathToDocMap[path]
  const content = docPath ? (mdModules[docPath] as string) : ''
  const components = useMemo(() => ({
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
            padding:8,
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
      <div className="markdown-content">
        <p>文档未找到：{path}</p>
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