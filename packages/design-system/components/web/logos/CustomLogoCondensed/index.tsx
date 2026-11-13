'use client'

import { FC } from 'react'

import Image from 'next/image'
import { useIntl } from 'react-intl'

import { useLogoOverrides } from '../../../../hooks/web'

const CustomLogoCondensed: FC = () => {
  const intl = useIntl()
  const { logos } = useLogoOverrides()
  if (!logos?.square) {
    return null
  }
  return (
    <Image
      key={logos.square}
      src={logos.square}
      alt={intl.formatMessage({
        id: 'designSystem.customLogoCondensed.alt',
        defaultMessage: 'Custom Project Logo Condensed',
      })}
      height={34}
      width={38}
    />
  )
}

export default CustomLogoCondensed
