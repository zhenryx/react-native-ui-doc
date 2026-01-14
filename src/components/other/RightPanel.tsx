import React, { useState, useEffect } from 'react'
import { pathToImagePath, getLocalImageUrl } from '../../api/localFiles'

interface RightPanelProps {
  path: string
}

export const RightPanel: React.FC<RightPanelProps> = ({ path }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const imagePath = pathToImagePath(path)
    if (!imagePath) {
      setImageUrl(null)
      return
    }

    // 获取本地图片 URL
    const url = getLocalImageUrl(imagePath)
    setImageUrl(url)
  }, [path])

  const imagePath = pathToImagePath(path)
  
  // 如果没有图片路径或图片 URL，隐藏组件
  if (!imagePath || !imageUrl) {
    return null
  }

  // 成功加载图片时显示
  return (
    <div className='flex-[0_0_20%] min-w-[340px] max-w-[400px] flex-shrink-0 border-l border-gray-200 dark:border-gray-700 p-1 overflow-y-auto'>
      <div className="sticky top-4">
        <img 
          src={imageUrl} 
          alt="组件预览" 
          className="w-full h-auto rounded-lg shadow-lg"
          onError={() => {
            // 图片加载失败时隐藏组件
            setImageUrl(null)
          }}
        />
      </div>
    </div>
  )
}
