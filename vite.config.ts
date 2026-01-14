import { defineConfig } from 'vite'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      // 将 react-native 映射到 react-native-web
      'react-native': 'react-native-web',
    },
  },
  optimizeDeps: {
    include: ['react-native-web'],
  },
  // 确保 markdown 文件被识别为资源（放在顶层，不在 build 内）
  assetsInclude: ['**/*.md'],
  build: {
    // 使用默认的资源处理方式，import.meta.glob 会自动处理文件打包
  },
})
