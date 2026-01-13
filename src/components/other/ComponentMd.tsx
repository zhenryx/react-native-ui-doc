import React, { useMemo, useEffect, useState } from 'react'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { funky, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { getFileContent, pathToFileName } from '../../api/gitee'

interface ComponentMdProps {
  path: string
}

export const ComponentMd: React.FC<ComponentMdProps> = ({ path }) => {
  const { isDark } = useDarkTheme()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        const fileName = pathToFileName(path)
        const text = await getFileContent(fileName)
        setContent(text)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载文档失败')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [path])

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

  if (loading) {
    return (
      <div className="markdown-content py-20 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="markdown-content py-20 text-center">
        <p className="text-red-500">错误: {error}</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="markdown-content py-20 text-center">
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
