import githubLightSvg from '@assets/Header/github-light.svg'
import githubDarkSvg from '@assets/Header/github-dark.svg'
import likeSvg from '@assets/Header/like.svg'
import darkSvg from '@assets/Header/dark.svg'
import lightSvg from '@assets/Header/light.svg'
import { Brand } from './other/Brand'
import { useDarkTheme } from '../hooks/useDarkTheme'
import { useMemo } from 'react'
// react-native-web 使用示例
// 注意：由于 vite.config.ts 中已配置 alias，可以直接从 'react-native' 导入
// 实际会映射到 'react-native-web'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web'

export const Header = () => {
  const { isDark, toggle } = useDarkTheme()
  const toGitHub = useMemo(
    () => [
      { id: 1, name: 'like', src: likeSvg, link: 'https://github.com/zhenryx/react-native-components' },
      { id: 2, name: 'github', src: isDark ? githubDarkSvg : githubLightSvg, link: 'https://github.com/zhenryx/react-native-components' },
    ], [isDark]
  )

  // react-native-web 使用示例：创建一个可点击的按钮组件
  const RNWebButton = () => {
    const handlePress = () => {
      alert('这是使用 react-native-web 创建的按钮！')
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>RN Web</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <div className='sticky top-0 left-0 right-0 flex px-4 py-10 h-16 items-center backdrop-blur-md bg-(--bg-primary)/60 shadow-[0_4px_12px_rgba(0,0,0,0.1)] justify-between border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]'>
      <div>
        <Brand />
      </div>
      {/* react-native-web 组件示例 */}
      <RNWebButton />
      <menu className='flex gap-4'>
        {toGitHub.map(item => (
          <a href={item.link} target='_blank' key={item.id}>
            <li>
              <img src={item.src} alt={item.name} className="h-6 w-6" />
            </li>
          </a>
        ))}
        <img src={isDark ? darkSvg : lightSvg} alt="" className="h-6 w-6" onClick={toggle} />
      </menu>
    </div>
  )
}

// react-native-web 样式定义（使用 StyleSheet API）
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
})