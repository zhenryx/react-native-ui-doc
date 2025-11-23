import type React from "react"
const menuItems = [
  {
    id: 'guild',
    title: 'Getting Start',
    children: [
      { id: 'Introduction', title: '介绍', path: '#guild/intro' },
      { id: 'Installation', title: '安装', path: '#guild/start' }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    children: [
      { id: 'button', title: 'Button 按钮', path: '#components/button' }
    ]
  }
]
export const Aside: React.FC<{ active: string }> = ({ active }) => {
  const isActive = (href: string) => {
    return active === href
  }
  return (
    <div className='border-r border-r-gray-400 w-60 h-full'>
      <ul className="p-4">
        {menuItems.map(item => (
          <li key={item.id}>
            <span className="text-[#999]">{item.title}</span>
            <ul className="pl-4">
              {item.children.map(child => (
                <li key={child.id}>
                  <a 
                    href={child.path} 
                    className={`text-sm block px-2 py-1 rounded ${
                      isActive(child.path) 
                        ? 'text-(--text-active) bg-(--bg-active) font-medium' 
                        : 'text-(--text-primary) hover:bg-(--bg-primary)'
                    }`}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}