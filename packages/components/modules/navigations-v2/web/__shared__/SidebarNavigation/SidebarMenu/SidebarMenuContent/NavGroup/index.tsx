import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import SidebarMenuNavGroup from '../../../../../primitives/SidebarMenuNavGroup'
import type { NavGroupProps, RenderProps } from './types'

const NavGroup: FC<NavGroupProps> = ({ navGroup, slots, slotProps, renderNav }) => {
  const {
    Root = SidebarMenuNavGroup.Root,
    Header = SidebarMenuNavGroup.Header,
    Content = SidebarMenuNavGroup.Content,
  } = slots || ({} as NonUndefined<NavGroupProps['slots']>)

  return (
    <Root key={navGroup.subheader} {...slotProps?.Root}>
      {({ open, handleToggle }: RenderProps) => (
        <>
          <Header title={navGroup.subheader ?? ''} onClick={handleToggle} {...slotProps?.Header} />
          <Content open={open} {...slotProps?.Content}>
            {navGroup.items.map((item, index) => renderNav(item, index))}
          </Content>
        </>
      )}
    </Root>
  )
}

export default NavGroup
