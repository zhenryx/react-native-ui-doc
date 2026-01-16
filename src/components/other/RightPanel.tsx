import React, { useState, useEffect, useRef } from 'react'
import { pathToImagePaths, getLocalImageUrl } from '../../api/localFiles'

interface RightPanelProps {
  path: string
}

/**
 * 循环播放 GIF 图片的组件
 */
const LoopingGif: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState(src)
  const reloadTimeoutRef = useRef<number | null>(null)

  // 当 src 变化时，立即重置 currentSrc 并清理定时器
  useEffect(() => {
    // 清除之前的定时器
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current)
      reloadTimeoutRef.current = null
    }
    // 重置为新的 src
    setCurrentSrc(src)
  }, [src])

  // 处理 GIF 循环的逻辑
  const setupLoop = () => {
    // 清除之前的定时器
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current)
      reloadTimeoutRef.current = null
    }

    const img = imgRef.current
    if (!img) return

    // 检查是否是 GIF 文件
    const isGif = src.toLowerCase().endsWith('.gif')
    if (!isGif) return

    const estimateDuration = 5000 // 5秒，可以根据实际 GIF 长度调整
    
    // 设置定时器，在估计的播放时间后重新加载
    reloadTimeoutRef.current = setTimeout(() => {
      // 通过添加时间戳参数强制重新加载
      const url = new URL(src, window.location.href)
      url.searchParams.set('t', Date.now().toString())
      setCurrentSrc(url.toString())
    }, estimateDuration)
  }

  // 当图片加载完成时设置循环（通过 onLoad 回调处理）
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    // 如果图片已经加载完成，立即设置循环
    if (img.complete) {
      setupLoop()
    }
  }, [src, currentSrc])

  // 如果不是 GIF，直接渲染普通图片
  if (!src.toLowerCase().endsWith('.gif')) {
    return <img ref={imgRef} src={src} alt={alt} className={className} />
  }

  return (
    <img 
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={className}
      onLoad={() => {
        // 当新的 src 加载完成时，触发循环逻辑
        setupLoop()
      }}
    />
  )
}

export const RightPanel: React.FC<RightPanelProps> = ({ path }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    const imagePaths = pathToImagePaths(path)
    if (!imagePaths || imagePaths.length === 0) {
      setImageUrls([])
      return
    }

    // 获取所有图片的本地 URL
    const urls = imagePaths
      .map(imagePath => getLocalImageUrl(imagePath))
      .filter((url): url is string => url !== null)
    
    setImageUrls(urls)
  }, [path])

  // 如果没有图片 URL，隐藏组件
  if (imageUrls.length === 0) {
    return null
  }

  // 成功加载图片时显示
  return (
    <div className='flex-[0_0_20%] min-w-[340px] max-w-[400px] flex-shrink-0 border-l border-gray-200 dark:border-gray-700 p-1 overflow-y-auto'>
      <div className="sticky top-4 space-y-4">
        {imageUrls.map((imageUrl, index) => (
          <LoopingGif
            key={imageUrl}
            src={imageUrl}
            alt={`组件预览 ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  )
}
