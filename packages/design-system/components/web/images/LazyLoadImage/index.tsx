'use client'

import { forwardRef } from 'react'

import { alpha, useTheme } from '@mui/material/styles'
import { LazyLoadImage as ReactLazyLoadImage } from 'react-lazy-load-image-component'

import { ImageContainer } from './styled'
import { LazyLoadImageProps } from './types'
import { getRatio } from './utils'

export type * from './types'

const LazyLoadImage = forwardRef<HTMLSpanElement, LazyLoadImageProps>(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      alt,
      src,
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      sx,
      ...other
    },
    ref,
  ) => {
    const theme = useTheme()

    const overlayStyles = !!overlay && {
      '&:before': {
        content: "''",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 1,
        position: 'absolute',
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    }

    const content = (
      <ReactLazyLoadImage
        alt={alt}
        src={src}
        afterLoad={afterLoad}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={disabledEffect ? undefined : effect}
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || 'component-image-wrapper'}
        placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          verticalAlign: 'bottom',
          ...(!!ratio && {
            top: 0,
            left: 0,
            position: 'absolute',
          }),
        }}
      />
    )

    return (
      <ImageContainer
        ref={ref}
        component="span"
        className="component-image"
        sx={{
          ...(!!ratio && {
            width: 1,
            '& span.component-image-wrapper': { pt: getRatio(ratio) },
          }),
          ...overlayStyles,
          ...sx,
        }}
        {...other}
      >
        {content}
      </ImageContainer>
    )
  },
)

export default LazyLoadImage
