/**
 * 功能：自动从 git 仓库下载文档文件到项目的 src/docs 目录
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
function getFileList() {
    return new Promise((resolve, reject) => {
        const url = `https://gitee.com/api/v5/repos/${CONFIG.repo}/contents/${CONFIG.sourceDir}?ref=${CONFIG.branch}`
        https.get(url, (res) => {
            let data = ''
            res.on('data', chunk => data += chunk)//累积响应数据
            res.on('end', () => resolve(JSON.parse(data)))//数据接收完成
        }).on('error', reject)//请求出错
    })
}
function downloadFile(url, targetPath) {
    return new Promise((resolve, reject) => {
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
                    file.close()  // 关闭文件流
                    resolve()     // 返回成功
                })
            } else {
                // 状态码不是 200，返回错误
                reject(new Error(`HTTP ${res.statusCode}`))
            }
        }).on('error', reject)  // 请求出错时返回错误
    })
}
async function syncDocs() {
    console.log('开始从 git 仓库同步文档...')
    try {
        //确保目标目录存在
        fs.mkdirSync(CONFIG.targetDir, { recursive: true })
        const files = await getFileList()
        const mdFiles = files.filter(f => f.type === 'file' && f.name.endsWith('.md'))
        console.log(`找到 ${mdFiles.length} 个 Markdown 文件`)
        for (const file of mdFiles) {
            const url = `https://gitee.com/${CONFIG.repo}/raw/${CONFIG.branch}/${CONFIG.sourceDir}/${file.name}`
            // 构建本地保存路径
            const targetPath = path.join(CONFIG.targetDir, file.name)

            // 下载文件
            await downloadFile(url, targetPath)
            console.log(`✓ ${file.name}`)  // 下载成功提示
        }

        //4. 下载 README.md（从仓库根目录）
        const readmeUrl = `https://gitee.com/${CONFIG.repo}/raw/${CONFIG.branch}/README.md`
        await downloadFile(readmeUrl, CONFIG.readmeTarget)
        console.log('✓ README.md')

        console.log('✨ 同步完成！')
    } catch (error) {
        // 错误处理：打印错误信息并退出程序（退出码 1 表示失败）
        console.error('❌ 同步失败:', error.message)
        process.exit(1)
    }
}

// 执行同步
syncDocs()