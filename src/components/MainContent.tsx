import { ComponentMd } from "./other/ComponentMd"

export const MainContent: React.FC<{ active: string }> = ({ active }) => {
  return (
    <div className='flex-1 px-10 py-5'>
      <ComponentMd path={active} />
    </div>
  )
}