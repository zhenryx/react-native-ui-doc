import reactSvg from '@assets/react.svg'
import logoPng from '@assets/logo.png'
import { p_Config } from '../../config/personalized'
export const Brand = () => {
  return (
    <div className="flex items-center justify-center">
      <div className='flex items-center justify-center gap-3'>
        <img src={reactSvg} alt="react-icon" className="w-10 h-11" />
        X
        <img src={logoPng} alt="brand-icon" className="w-12 h-10 " />
      </div>
      <span className='text-lg font-semibold ml-4'>React-Native-Components</span>
      <small className='ml-2 mt-1'>by {p_Config.author}</small>
    </div>
  )
}