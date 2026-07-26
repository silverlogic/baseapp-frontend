import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import DefaultHeaderNavigation from '../../__shared__/HeaderNavigation'
import DefaultMainContainer from '../../__shared__/MainContainer'
import type { HorizontalLayoutProps, HorizontalLayoutSlots } from './types'

const HorizontalLayout: FC<HorizontalLayoutProps> = ({ children, slots, slotProps, navData }) => {
  const { HeaderNavigation = DefaultHeaderNavigation, MainContainer = DefaultMainContainer } =
    slots || ({} as NonUndefined<HorizontalLayoutSlots>)

  return (
    <div>
      <HeaderNavigation navData={navData} {...slotProps?.HeaderNavigation} />
      <MainContainer isNavHorizontal {...slotProps?.MainContainer}>
        {children}
      </MainContainer>
    </div>
  )
}

export default HorizontalLayout
