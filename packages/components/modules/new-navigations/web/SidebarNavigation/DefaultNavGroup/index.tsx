import { FC } from 'react'
import SidebarMenuNavGroup from '../../SidebarMenu/SidebarMenuNavGroup'
import { DefaultNavGroupProps, RenderProps } from './types'


const DefaultNavGroup: FC<DefaultNavGroupProps> = ({ navGroup, slots, renderNav }) => {
  const {
    Root = SidebarMenuNavGroup.Root,
    Header = SidebarMenuNavGroup.Header,
    Content = SidebarMenuNavGroup.Content,
  } = slots ?? {}

  return (
    <Root key={navGroup.subheader}>
      {({ open, handleToggle }: RenderProps) => (
        <>
          <Header title={navGroup.subheader ?? ''} onClick={handleToggle} />
          <Content open={open}>
            {navGroup.items.map((item, index) => renderNav(item, index))}
          </Content>
        </>
      )}
    </Root>
  )
}

export default DefaultNavGroup
