import type React from "react"

// 定义类型
interface MenuItem {
  id: string
  title: string
  path: string
}

interface MenuGroup {
  id: string
  title: string
  children?: MenuItem[] 
}

// 从本地文件生成菜单
// 使用 import.meta.glob 获取所有文档文件
const docModules = import.meta.glob('/src/docs/**/*.md', {
  eager: false
})

/**
 * 从文件名生成菜单项
 * 例如：'/src/docs/Button.md' -> { id: 'button', title: 'Button', path: '#components/button' }
 */
function generateMenuFromFiles(): MenuGroup[] {
  // 获取所有文件路径
  const filePaths = Object.keys(docModules)
  
  // 过滤出组件文档（排除 README.md）
  const componentFiles = filePaths
    .filter(path => {
      const fileName = path.split('/').pop() || ''
      return fileName !== 'README.md'
    })
    .map(path => {
      // 从路径提取文件名，例如 '/src/docs/Button.md' -> 'Button'
      const fileName = path.split('/').pop()?.replace('.md', '') || ''
      // 文件名转小写作为 id，例如 'Button' -> 'button'
      const id = fileName.charAt(0).toLowerCase() + fileName.slice(1)
      return {
        id,
        title: fileName, // 保持原文件名作为标题
        path: `#components/${id}`
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title)) // 按名称排序
  
  return [
    {
      id: 'guild',
      title: 'Getting Start',
      children: [
        { id: 'start', title: '快速开始', path: '#guild/start' }
      ]
    },
    {
      id: 'components',
      title: 'Components',
      children: componentFiles
    }
  ]
}

// 生成菜单
const menu = generateMenuFromFiles()

export const Aside: React.FC<{ active: string }> = ({ active }) => {
  const isActive = (href: string) => {
    return active === href
  }
  return (
    <div className='border-r border-r-gray-400 w-60 h-full'>
      <ul className="p-4">
        {menu.map(item => (
          <li key={item.id}>
            <span className="text-[#999]">{item.title}</span>
            {item.children && item.children.length > 0 && (
              <ul className="pl-4">
                {item.children.map(child => (
                  <li key={child.id}>
                    <a
                      href={child.path}
                      className={`text-sm block px-2 py-1 rounded ${isActive(child.path)
                        ? 'text-(--text-active) bg-(--bg-active) font-medium'
                        : 'text-(--text-primary) hover:bg-(--bg-primary)'
                        }`}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}