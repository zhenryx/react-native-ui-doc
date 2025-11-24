import { useContext } from 'react'
import { ThemeContext } from '../contexts/themeContext'

export const useDarkTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useDarkTheme must be used within a ThemeProvider')
  }
  return context
}
