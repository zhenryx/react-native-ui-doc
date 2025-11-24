import { Installation } from "./other/Installation"
import type { ReactElement } from "react"

export const MainContent: React.FC<{ active: string }> = ({ active }) => {
  console.log(active)
  const contentMap: Record<string, ReactElement> = {
    '#guild/start': <Installation />
  }
  
  return (
    <div className='flex-1 px-10 py-5'>
      {contentMap[active]}
    </div>
  )
}