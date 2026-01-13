import { useEffect, useState } from 'react'

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

export const Aside: React.FC<{ active: string }> = ({ active }) => {
  const [menu, setMenu] = useState<MenuGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const { getFileList } = await import('../api/gitee')
        const files = await getFileList()
        
        // 过滤出组件文档（.md 文件，排除 README.md）
        const componentFiles: MenuItem[] = files
          .filter((file: any) => file.type === 'file' && file.name.endsWith('.md') && file.name !== 'README.md')
          .map((file: any) => {
            // 从文件名提取组件名，例如 'Button.md' -> 'Button'
            const fileName = file.name.replace('.md', '')
            // 文件名转小写作为 id，例如 'Button' -> 'button'
            const id = fileName.charAt(0).toLowerCase() + fileName.slice(1)
            return {
              id,
              title: fileName,
              path: `#components/${id}`
            }
          })
          .sort((a: MenuItem, b: MenuItem) => a.title.localeCompare(b.title))
        
        setMenu([
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
        ])
      } catch (error) {
        console.error('加载菜单失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  const isActive = (href: string) => {
    return active === href
  }

  if (loading) {
    return (
      <div className='border-r border-r-gray-400 w-60 h-full overflow-y-auto'>
        <div className="p-4 text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className='border-r border-r-gray-400 w-60 h-full overflow-y-auto'>
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
