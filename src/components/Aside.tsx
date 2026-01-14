import { useEffect, useState } from 'react'
import { getLocalFileList } from '../api/localFiles'

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
    const loadMenu = () => {
      try {
        const files = getLocalFileList()
        
        // 过滤出目录（组件文件夹）
        const componentFiles: MenuItem[] = files
          .filter((file) => file.type === 'dir')
          .map((file) => {
            // 目录名作为组件名，例如 'Button' -> 'Button'
            const dirName = file.name
            // 目录名转小写作为 id，例如 'Button' -> 'button'
            const id = dirName.charAt(0).toLowerCase() + dirName.slice(1)
            return {
              id,
              title: dirName,
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
          },
          // {
          //   id: 'special-components',
          //   title: 'Special Components',
          //   children: componentFiles
          // }
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
      <div className='border-r border-r-gray-400 flex-[0_0_15%] min-w-[200px] max-w-[300px] h-full overflow-y-auto'>
        <div className="p-4 text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className='border-r border-r-gray-400 flex-[0_0_15%] min-w-[200px] max-w-[300px] h-full overflow-y-auto'>
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
