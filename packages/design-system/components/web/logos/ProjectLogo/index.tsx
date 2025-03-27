'use client'

import { FC } from 'react'

import { useSSR } from '@baseapp-frontend/utils'

import Image from 'next/image'

import { useLogoOverrides } from '../../../../hooks/web'
import { ProjectLogoProps } from './types'

const ProjectLogo: FC<ProjectLogoProps> = ({ src, alt, width, height, priority, className }) => {
  const { logos } = useLogoOverrides()
  const { isSSR } = useSSR()

  return (
    <Image
      src={!isSSR && logos?.default ? logos.default : src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}

export default ProjectLogo
