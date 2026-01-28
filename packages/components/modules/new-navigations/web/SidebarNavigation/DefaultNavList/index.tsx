
import SidebarMenuNavList from '../../SidebarMenu/SidebarMenuNavList'
import { FC } from 'react'
import { DefaultNavListProps } from './types'

const DefaultNavList: FC<DefaultNavListProps> = ({ navList, slots }) => {
  const { Root = SidebarMenuNavList.Root, Header = SidebarMenuNavList.Header, ListRoot = SidebarMenuNavList.ListRoot, ListItem = SidebarMenuNavList.ListItem } = slots ?? {}

  const filteredChildren = navList.children?.filter((child) => !child.hide)
  const hasChildren = filteredChildren?.length && filteredChildren.length > 0

  return (
    <Root {...navList} defaultOpen={false}>
      {({ open, handleToggle }) => (<>
        <Header.Root
          key={navList.title}
          onClick={handleToggle}
          componentType="button"
          deep={!!hasChildren}
          {...navList}
        >
          <Header.Icon Icon={navList.icon} />
          <Header.Title title={navList.title} />
          {!!hasChildren && <Header.Arrow isExpanded={open} />}
        </Header.Root>
        <ListRoot open={open} sx={{ paddingX: (theme) => theme.spacing(2) }}>
          {navList.children?.filter((child) => !child.hide).map((child) => (
            <ListItem.Root key={child.title} {...child} >
              <ListItem.Icon Icon={child.icon} />
              <ListItem.Title title={child.title} caption={child.caption} />
            </ListItem.Root>
          ))}
        </ListRoot>
      </>)
      }
    </Root >
  )
}

export default DefaultNavList
