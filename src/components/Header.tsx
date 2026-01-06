import githubLightSvg from '@assets/Header/github-light.svg'
import githubDarkSvg from '@assets/Header/github-dark.svg'
import likeSvg from '@assets/Header/like.svg'
import darkSvg from '@assets/Header/dark.svg'
import lightSvg from '@assets/Header/light.svg'
import { Brand } from './other/Brand'
import { useDarkTheme } from '../hooks/useDarkTheme'
import { useMemo } from 'react'
export const Header = () => {
  const { isDark, toggle } = useDarkTheme()
  const toGitHub = useMemo(
    () => [
      { id: 1, name: 'like', src: likeSvg, link: 'https://github.com/zhenryx/react-native-components' },
      { id: 2, name: 'github', src: isDark ? githubDarkSvg : githubLightSvg, link: 'https://github.com/zhenryx/react-native-components' },
    ], [isDark]
  )
  return (
    <div className='sticky top-0 left-0 right-0 flex px-4 py-10 h-16 items-center backdrop-blur-md bg-(--bg-primary)/60 shadow-[0_4px_12px_rgba(0,0,0,0.1)] justify-between border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]'>
      <div>
        <Brand />
      </div>
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