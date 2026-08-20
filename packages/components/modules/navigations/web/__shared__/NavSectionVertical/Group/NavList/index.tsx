'use client'

import { FC, useCallback, useEffect, useState } from 'react'

import Collapse from '@mui/material/Collapse'
import { usePathname } from 'next/navigation'

import type { NavListProps } from '../../../../types'
import { useActiveLink } from '../../../useActiveLink'
import NavItem from './NavItem'

const NavList: FC<NavListProps> = ({ data, depth, slotProps }) => {
  const pathname = usePathname()

  const active = useActiveLink(data?.path, !!data.children)

  const [openMenu, setOpenMenu] = useState(active)

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  useEffect(() => {
    if (!active) {
      handleCloseMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleToggleMenu = useCallback(() => {
    if (!data.children) {
      return
    }
    // Navigate on the open transition only: collapsing a group must not pull the user off
    // the child page they are currently on. Leaves are left to their own <Link>.
    if (!openMenu) {
      data.onClick?.()
    }
    setOpenMenu((prev) => !prev)
  }, [data, openMenu])

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
        depth={depth}
        hasChild={!!data.children}
        active={active}
        itemData={data}
        className={active ? 'active' : ''}
        sx={{
          mb: `${slotProps?.gap}px`,
          ...(depth === 1 ? slotProps?.rootItem : slotProps?.subItem),
        }}
      />
      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          {data.children.map((list) => (
            <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
          ))}
        </Collapse>
      )}
    </>
  )
}

export default NavList
