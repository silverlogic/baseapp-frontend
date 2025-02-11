'use client'

import { FC } from 'react'

import Image from 'next/image'

import { ImageWithFallbackProps } from './types'

/**
 * This component can have more than one source, offering alternative versions of an image for different display/device scenarios.
 *
 * It uses, by default, the webp format, but if the browser doesn't support it, it will fall back to png.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Developers can freely edit this to suit the project's needs.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  type = 'image/webp',
  fallbackType = 'image/png',
  alt,
  width,
  height,
  ...props
}) => (
  <picture>
    <source srcSet={src} type={type} />
    <source srcSet={fallbackSrc} type={fallbackType} />
    <Image src={src} alt={alt} width={width} height={height} {...props} />
  </picture>
)

export default ImageWithFallback
