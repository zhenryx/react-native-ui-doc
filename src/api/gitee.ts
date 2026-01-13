/**
 * Gitee API 配置和工具函数
 */
const CONFIG = {
  repo: 'chengzhangxiong/react-native-components',
  branch: 'dev',
  sourceDir: 'src/docs',
}

/**
 * 从 Gitee 获取文件列表
 */
export async function getFileList() {
  const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${CONFIG.sourceDir}?ref=${CONFIG.branch}`
  const response = await fetch(url)
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
  const response = await fetch(url)
  
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
 * 将路由路径转换为文件名
 * @param hashPath 路由路径，例如 '#guild/start' 或 '#components/button'
 * @returns 文件名，例如 'README.md' 或 'Button.md'
 */
export function pathToFileName(hashPath: string): string {
  const path = hashPath.replace(/^#/, '')
  
  // 特殊处理：快速开始页面使用 README.md
  if (path === 'guild/start' || path === 'guild/intro') {
    return 'README.md'
  }
  
  // 组件文档：从路径最后一部分生成文件名
  // 例如 'components/button' -> 'Button.md'
  const parts = path.split('/')
  const lastPart = parts[parts.length - 1]
  // 首字母大写，例如 'button' -> 'Button'
  const fileName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
  return `${fileName}.md`
}

