/**
 * Gitee API 配置和工具函数
 */
const CONFIG = {
  repo: 'chengzhangxiong/react-native-components',
  branch: 'dev',
  sourceDir: 'src/docs',
  // 从环境变量获取 token（可选）
  // 在 .env 文件中设置: VITE_GITEE_TOKEN=your_token_here
  token: import.meta.env.VITE_GITEE_TOKEN || '',
}

/**
 * 创建带认证头的 fetch 请求配置
 */
function createFetchOptions(): RequestInit {
  const headers: HeadersInit = {
    'User-Agent': 'Mozilla/5.0 (compatible; ReactNativeDoc/1.0)',
    'Accept': 'application/json',
  }
  
  // 如果有 token，添加到请求头
  if (CONFIG.token) {
    headers['Authorization'] = `token ${CONFIG.token}`
  }
  
  return { headers }
}

/**
 * 从 Gitee 获取文件列表
 */
export async function getFileList() {
  const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${CONFIG.sourceDir}?ref=${CONFIG.branch}`
  const response = await fetch(url, createFetchOptions())
  if (!response.ok) {
    throw new Error(`获取文件列表失败: ${response.status}`)
  }
  return response.json()
}

/**
 * 从 Gitee 获取原始文件内容
 * 使用 API v5 获取文件内容（base64 编码），避免 CORS 问题
 */
export async function getFileContent(filePath: string): Promise<string> {
  let apiPath: string
  
  // 如果是 README.md，从仓库根目录获取
  if (filePath === 'README.md') {
    apiPath = 'README.md'
  } else {
    // 其他文件从 sourceDir 目录获取
    apiPath = `${CONFIG.sourceDir}/${filePath}`
  }
  
  const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${apiPath}?ref=${CONFIG.branch}`
  const response = await fetch(url, createFetchOptions())
  
  if (!response.ok) {
    throw new Error(`获取文件失败: ${response.status}`)
  }
  
  const data = await response.json()
  
  // Gitee API v5 返回的是 base64 编码的内容
  if (data.content && data.encoding === 'base64') {
    // 移除所有空白字符（包括换行符）
    const base64Content = data.content.replace(/\s/g, '')
    
    try {
      // 解码 base64 内容
      const binaryString = atob(base64Content)
      
      // 将二进制字符串转换为 UTF-8 字符串
      // 使用 TextDecoder 正确处理 UTF-8 编码（包括中文）
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const decoder = new TextDecoder('utf-8')
      return decoder.decode(bytes)
    } catch (error) {
      // 降级方案：使用传统方法
      const binaryString = atob(base64Content)
      return decodeURIComponent(escape(binaryString))
    }
  }
  
  throw new Error('无法解析文件内容')
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
 * 从 Gitee 获取图片内容（base64 编码）
 * @param imagePath 图片路径，例如 'Button/Button.png'
 * @returns Data URL 格式的图片（例如 'data:image/png;base64,...'）
 */
export async function getImageContent(imagePath: string): Promise<string> {
  if (!imagePath) {
    return ''
  }
  
  const apiPath = `${CONFIG.sourceDir}/${imagePath}`
  const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${apiPath}?ref=${CONFIG.branch}`
  const response = await fetch(url, createFetchOptions())
  
  if (!response.ok) {
    throw new Error(`获取图片失败: ${response.status}`)
  }
  
  const data = await response.json()
  
  // Gitee API v5 返回的是 base64 编码的内容
  if (data.content && data.encoding === 'base64') {
    // 移除所有空白字符（包括换行符）
    const base64Content = data.content.replace(/\s/g, '')
    
    // 根据文件扩展名确定 MIME 类型
    const extension = imagePath.split('.').pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
    }
    const mimeType = mimeTypes[extension || ''] || 'image/png'
    
    // 返回 Data URL 格式
    return `data:${mimeType};base64,${base64Content}`
  }
  
  throw new Error('无法解析图片内容')
}

