import { ComponentMd } from "./other/ComponentMd"

export const MainContent: React.FC<{ active: string }> = ({ active }) => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className=' px-8 py-1'>
        <ComponentMd path={active} />
      </div>
    </div>
  )
}