import Markdown from 'react-markdown'

// 使用 import.meta.glob 预加载所有 md 文件
const mdModules = import.meta.glob('/src/Doc/*.md', { 
  eager: true, 
  as: 'raw' 
})

export const Installation = () => {
  const content = mdModules['/src/Doc/Installation.md'] as string
  return <Markdown>{content}</Markdown>
}