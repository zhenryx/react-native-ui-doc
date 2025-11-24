import React from 'react'

interface ExpoSnackProps {
  id: string
}

export const ExpoSnack: React.FC<ExpoSnackProps> = ({ id }) => {
  // Expo Snack 的嵌入 URL
  const snackUrl = `https://snack.expo.dev/${id}?platform=ios&preview=true&supportedPlatforms=ios,android,web`
  
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]">
      <iframe
        src={snackUrl}
        className="w-full h-[600px] border-0"
        title={`Expo Snack ${id}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; magnetometer; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  )
}

