import { ImageProps } from 'next/image'

export interface ImageWithFallbackProps extends ImageProps {
  src: string
  fallbackSrc: string
  type?: string
  fallbackType?: string
  alt: string
  width: number
  height: number
}
