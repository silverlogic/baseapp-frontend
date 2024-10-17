import * as React from 'react'

const NextImageMock = ({ src, alt, width, height, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...rest}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}

export default NextImageMock
