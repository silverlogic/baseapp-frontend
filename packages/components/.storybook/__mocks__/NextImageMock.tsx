import * as React from 'react'

interface NextImageMockProps {
  src: string
  alt?: string
  width?: number
  height?: number
}

const NextImageMock: React.FC<NextImageMockProps> = ({
  src,
  alt = 'image-mock',
  width,
  height,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ maxWidth: '100%', height: 'auto' }}
      {...props}
    />
  )
}

export default NextImageMock
