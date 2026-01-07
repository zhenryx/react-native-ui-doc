// 类型声明：react-native-web 模块
declare module 'react-native-web' {
  export interface ViewProps {
    style?: any
    children?: React.ReactNode
    [key: string]: any
  }
  
  export interface TextProps {
    style?: any
    children?: React.ReactNode
    [key: string]: any
  }
  
  export interface TouchableOpacityProps {
    style?: any
    onPress?: () => void
    activeOpacity?: number
    children?: React.ReactNode
    [key: string]: any
  }
  
  export const View: React.FC<ViewProps>
  export const Text: React.FC<TextProps>
  export const TouchableOpacity: React.FC<TouchableOpacityProps>
  
  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T
  }
}
