import { useEffect, useState } from "react";
export const useDarkTheme = () => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      console.log('暗黑模式已启用，html class:', root.className)
    } else {
      root.classList.remove('dark')
      console.log('浅色模式已启用，html class:', root.className)
    }
  }, [isDark])
  const toggle = () => {
    setIsDark(prev => !prev)
  }
  return { isDark, toggle }
}
