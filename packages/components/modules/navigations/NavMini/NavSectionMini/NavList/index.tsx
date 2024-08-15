'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'

import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import { usePathname } from 'next/navigation'

import { useActiveLink } from '../../../shared/useActiveLink'
import type { NavListProps } from '../../../types'
import NavItem from './NavItem'

const NavList: FC<NavListProps> = ({ data, depth, slotProps }) => {
  const navRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname()

  const active = useActiveLink(data.path, !!data.children)

  const [openMenu, setOpenMenu] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true)
    }
  }, [data.children])

  return (
    <>
      <NavItem
        ref={navRef}
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        itemData={data}
        depth={depth}
        hasChild={!!data.children}
        active={active}
        className={active ? 'active' : ''}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />

      {!!data.children && (
        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
                mt: 0.5,
                minWidth: 160,
                ...(openMenu && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Stack spacing={0.5}>
            {data.children.map((list) => (
              <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
            ))}
          </Stack>
        </Popover>
      )}
    </>
  )
}

export default NavList
