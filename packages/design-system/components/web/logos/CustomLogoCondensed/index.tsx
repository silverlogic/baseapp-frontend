'use client'

import { FC } from 'react'

import Image from 'next/image'

import { useLogoOverrides } from '../../../../hooks/web'

const CustomLogoCondensed: FC = () => {
  const { logos } = useLogoOverrides()
  if (!logos?.square) {
    return null
  }
  return (
    <Image
      key={logos.square}
      src={logos.square}
      alt="Custom Project Logo Condensed"
      height={34}
      width={38}
    />
  )
}

export default CustomLogoCondensed
