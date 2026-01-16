/**
 * 功能：自动从 git 仓库下载文档文件到项目的 src/docs 目录
 * 支持组件文件夹结构：每个组件有独立的文件夹，包含 .md 文件和图片文件
*/
import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
// 获取当前文件的目录路径（ES Module 中获取 __dirname 的方式）
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 配置信息
const CONFIG = {
    repo: 'chengzhangxiong/react-native-components',  // Gitee 仓库路径（用户名/仓库名）
    branch: 'dev',                                    // 分支名称
    sourceDir: 'src/docs',                           // 源目录（Gitee 上的文档目录）
    targetDir: path.resolve(__dirname, '../src/docs'),  // 目标目录（本地保存路径）
    readmeTarget: path.resolve(__dirname, '../src/docs/README.md'),  // README.md 的保存路径
}

/**
 * 获取指定目录下的文件列表
 * @param {string} dirPath 目录路径，例如 'src/docs' 或 'src/docs/Button'
 * @returns {Promise<Array>} 文件列表
 */
function getFileList(dirPath) {
    return new Promise((resolve, reject) => {
        const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${dirPath}?ref=${CONFIG.branch}`
        https.get(url, (res) => {
            let data = ''
            res.on('data', chunk => data += chunk)
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data))
                } catch (e) {
                    reject(new Error(`解析 JSON 失败: ${e.message}`))
                }
            })
        }).on('error', reject)
    })
}

/**
 * 下载文件
 * @param {string} url 文件下载地址
 * @param {string} targetPath 本地保存路径
 */
function downloadFile(url, targetPath) {
    return new Promise((resolve, reject) => {
        // 确保目标目录存在
        const dir = path.dirname(targetPath)
        fs.mkdirSync(dir, { recursive: true })
        
        // 使用 https.get 发起 GET 请求下载文件
        https.get(url, (res) => {
            // 检查响应状态码，200 表示成功
            if (res.statusCode === 200) {
                // 创建可写流，将文件保存到目标路径
                const file = fs.createWriteStream(targetPath)
                // 将响应流管道连接到文件流（自动写入文件）
                res.pipe(file)
                // 文件写入完成后的回调
                file.on('finish', () => {
                    file.close()
                    resolve()
                })
            } else {
                // 状态码不是 200，返回错误
                reject(new Error(`HTTP ${res.statusCode}: ${url}`))
            }
        }).on('error', reject)
    })
}

/**
 * 递归下载组件文件夹中的所有文件
 * @param {string} componentDir 组件目录名，例如 'Button'
 */
async function downloadComponentFiles(componentDir) {
    const sourceComponentPath = `${CONFIG.sourceDir}/${componentDir}`
    const files = await getFileList(sourceComponentPath)
    
    // 下载该组件文件夹下的所有文件（.md 和图片文件）
    const fileExtensions = ['.md', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
    const componentFiles = files.filter(f => 
        f.type === 'file' && fileExtensions.some(ext => f.name.endsWith(ext))
    )
    
    for (const file of componentFiles) {
        const url = `https://gitee.com/${CONFIG.repo}/raw/${CONFIG.branch}/${sourceComponentPath}/${file.name}`
        const targetPath = path.join(CONFIG.targetDir, componentDir, file.name)
        await downloadFile(url, targetPath)
        console.log(`  ✓ ${componentDir}/${file.name}`)
    }
    
    return componentFiles.length
}

async function syncDocs() {
    console.log('开始从 git 仓库同步文档...')
    try {
        // 确保目标目录存在
        fs.mkdirSync(CONFIG.targetDir, { recursive: true })
        
        // 1. 获取 src/docs 目录下的所有内容
        const rootFiles = await getFileList(CONFIG.sourceDir)
        
        // 2. 找出所有组件目录（type === 'dir'）
        const componentDirs = rootFiles.filter(f => f.type === 'dir')
        console.log(`找到 ${componentDirs.length} 个组件目录`)
        
        // 3. 下载每个组件文件夹中的文件
        let totalFiles = 0
        for (const dir of componentDirs) {
            console.log(`正在下载 ${dir.name}...`)
            const fileCount = await downloadComponentFiles(dir.name)
            totalFiles += fileCount
        }
        
        // 4. 检查是否有根目录下的 README.md
        const rootReadme = rootFiles.find(f => f.type === 'file' && f.name === 'README.md')
        if (rootReadme) {
            const readmeUrl = `https://gitee.com/${CONFIG.repo}/raw/${CONFIG.branch}/${CONFIG.sourceDir}/README.md`
            await downloadFile(readmeUrl, CONFIG.readmeTarget)
            console.log('✓ README.md')
            totalFiles++
        } else {
            // 如果 src/docs 下没有 README.md，尝试从仓库根目录下载
            console.log('尝试从仓库根目录下载 README.md...')
            try {
                const readmeUrl = `https://gitee.com/${CONFIG.repo}/raw/${CONFIG.branch}/README.md`
                await downloadFile(readmeUrl, CONFIG.readmeTarget)
                console.log('✓ README.md (从根目录)')
                totalFiles++
            } catch (e) {
                console.warn('⚠️  无法下载 README.md:', e.message)
            }
        }

        console.log(`✨ 同步完成！共下载 ${totalFiles} 个文件`)
    } catch (error) {
        // 错误处理：打印错误信息并退出程序（退出码 1 表示失败）
        console.error('❌ 同步失败:', error.message)
        if (error.stack) {
            console.error(error.stack)
        }
        process.exit(1)
    }
}

// 执行同步
syncDocs()