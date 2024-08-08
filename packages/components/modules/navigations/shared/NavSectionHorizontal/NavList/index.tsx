import { FC, useCallback, useEffect, useRef, useState } from 'react'

import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import { usePathname } from 'next/navigation'

import { useActiveLink } from '../../useActiveLink'
import NavItem from './NavItem'
import { NavListProps } from './types'

const NavList: FC<NavListProps> = ({ data, depth, slotProps, hasTabLayout }) => {
  const navRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname()

  const active = useActiveLink(data?.path, !!data.children)

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
        hasTabLayout={hasTabLayout}
      />

      {!!data.children && (
        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: 'bottom', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'left' }
          }
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
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
