/**
 * 本地文件读取工具函数
 */

// 预加载所有 markdown 和图片文件，确保构建时被包含
// 使用 eager: true 确保在构建时所有文件都被静态分析并包含
const markdownModules = import.meta.glob('/src/docs/**/*.md', { 
  as: 'raw', 
  eager: true 
})

const imageModules = import.meta.glob('/src/docs/**/*.{png,jpg,jpeg,gif,svg,webp}', { 
  eager: true,
  import: 'default'
}) as Record<string, string>

/**
 * 验证文件是否可用（用于调试）
 */
export function validateFiles() {
  if (import.meta.env.DEV) {
    console.log('📚 已加载的 Markdown 文件:', Object.keys(markdownModules).length)
    console.log('🖼️ 已加载的图片文件:', Object.keys(imageModules).length)
  }
}

// 在开发模式下验证文件
if (import.meta.env.DEV) {
  validateFiles()
}

/**
 * 将路由路径转换为文件路径
 * @param hashPath 路由路径，例如 '#guild/start' 或 '#components/button'
 * @returns 文件路径，例如 'README.md' 或 'Button/Button.md'
 */
export function pathToFileName(hashPath: string): string {
  const path = hashPath.replace(/^#/, '')
  
  // 特殊处理：快速开始页面使用 README.md
  if (path === 'guild/start' || path === 'guild/intro') {
    return 'README.md'
  }
  
  // 组件文档：从路径最后一部分生成目录名和文件名
  // 例如 'components/button' -> 'Button/Button.md'
  const parts = path.split('/')
  const lastPart = parts[parts.length - 1]
  // 首字母大写，例如 'button' -> 'Button'
  const dirName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
  return `${dirName}/${dirName}.md`
}

/**
 * 将路由路径转换为图片路径
 * @param hashPath 路由路径，例如 '#components/button'
 * @returns 图片路径，例如 'Button/Button.png'
 */
export function pathToImagePath(hashPath: string): string {
  const path = hashPath.replace(/^#/, '')
  
  // 快速开始页面没有图片
  if (path === 'guild/start' || path === 'guild/intro') {
    return ''
  }
  
  // 组件文档：从路径最后一部分生成目录名和图片文件名
  // 例如 'components/button' -> 'Button/Button.png'
  const parts = path.split('/')
  const lastPart = parts[parts.length - 1]
  // 首字母大写，例如 'button' -> 'Button'
  const dirName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
  return `${dirName}/${dirName}.png`
}

/**
 * 获取本地文档文件列表
 * 使用 Vite 的 import.meta.glob 动态导入
 */
export function getLocalFileList() {
  // 使用 import.meta.glob 获取所有组件目录
  // 这里我们返回已知的组件列表（基于 src/docs 目录结构）
  const components = [
    'Button',
    'Dialog',
    'Empty',
    'Header',
    'Overlay',
    'Popup',
    'TabView',
    'Text',
    'ThemeConfig',
  ]
  
  return components.map(name => ({
    name,
    type: 'dir' as const,
  }))
}

/**
 * 获取本地文件内容
 * @param filePath 文件路径，例如 'README.md' 或 'Button/Button.md'
 */
export async function getLocalFileContent(filePath: string): Promise<string> {
  // 构建文件路径
  let modulePath: string
  if (filePath === 'README.md') {
    // 快速开始页面使用 src/docs/README.md
    modulePath = '/src/docs/README.md'
  } else {
    // 例如 'Button/Button.md' -> '/src/docs/Button/Button.md'
    modulePath = `/src/docs/${filePath}`
  }
  
  // 从预加载的模块中查找
  const content = markdownModules[modulePath]
  
  if (typeof content === 'string') {
    return content
  }
  
  // 如果精确匹配失败，尝试查找所有可能的路径（用于调试）
  if (import.meta.env.DEV) {
    const availablePaths = Object.keys(markdownModules)
    console.warn(`文件未找到: ${filePath}`, {
      expectedPath: modulePath,
      availablePaths: availablePaths.slice(0, 10) // 显示前10个用于调试
    })
  }
  
  throw new Error(`文件未找到: ${filePath} (路径: ${modulePath})`)
}

/**
 * 获取本地图片内容
 * @param imagePath 图片路径，例如 'Button/Button.png'
 * @returns 图片的 URL（用于 img src）
 */
export function getLocalImageUrl(imagePath: string): string | null {
  if (!imagePath) {
    return null
  }
  
  try {
    // 构建图片路径：例如 'Button/Button.png' -> '/src/docs/Button/Button.png'
    const imageModulePath = `/src/docs/${imagePath}`
    
    // 从预加载的模块中查找
    const imageModule = imageModules[imageModulePath]
    
    if (imageModule && typeof imageModule === 'string') {
      return imageModule
    }
    
    // 如果精确匹配失败，尝试查找所有可能的路径（用于调试）
    if (import.meta.env.DEV) {
      const availablePaths = Object.keys(imageModules)
      console.warn(`图片未找到: ${imagePath}`, {
        expectedPath: imageModulePath,
        availablePaths: availablePaths.slice(0, 10) // 显示前10个用于调试
      })
    }
    
    return null
  } catch (error) {
    console.error('加载图片失败:', error)
    return null
  }
}

