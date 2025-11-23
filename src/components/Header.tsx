import githubSvg from '@assets/Header/GitHub.svg'
import likeSvg from '@assets/Header/like.svg'
import darkSvg from '@assets/Header/dark.svg'
import { Brand } from './other/Brand'
export const Header = () => {
  const toGitHub = [
    { id: 1, name: 'like', src: likeSvg, link: 'https://github.com/zhenryx/react-native-ui-doc' },
    { id: 2, name: 'github', src: githubSvg, link: 'https://github.com/zhenryx/react-native-ui-doc' },
  ]
  return (
    <div className='sticky left-0 right-0 flex px-4 h-16 top-4 items-center bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] justify-between'>
      <div className=''>
        <Brand />
      </div>
      <menu className='flex gap-4'>
        {toGitHub.map(item => (
          <a href={item.link} target='_blank'>
            <li>
              <img src={item.src} alt={item.name} className="h-6 w-6" />
            </li>
          </a>
        ))}
        <img src={darkSvg} alt="" className="h-6 w-6"/>
      </menu>
    </div>
  )
}