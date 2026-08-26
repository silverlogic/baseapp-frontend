'use client'

import { FC } from 'react'

import MUISwipeableDrawer from '@mui/material/SwipeableDrawer'

import { SWIPE_AREA_WIDTH } from './constants'
import { ContentContainer, Puller, SwipeableContainer } from './styled'
import { SwipeableDrawerProps } from './types'

const SwipeableDrawer: FC<SwipeableDrawerProps> = ({
  children,
  globalHeight = `calc(25% - ${SWIPE_AREA_WIDTH}px)`,
  PaperProps = {},
  ...props
}) => {
  const { sx: paperSxOverride, ...restPaperProps } = PaperProps
  const paperSxOverrideBase = paperSxOverride ?? []
  const normalizedPaperSxOverride = Array.isArray(paperSxOverrideBase)
    ? paperSxOverrideBase
    : [paperSxOverrideBase]

  return (
    /* @ts-ignore TODO: investigate 'JSXElementConstructor<SwipeableDrawerProps>' is not a valid JSX element type */
    <MUISwipeableDrawer
      onOpen={() => {}}
      anchor="bottom"
      disableSwipeToOpen
      ModalProps={{
        keepMounted: false,
      }}
      sx={{
        userSelect: 'none',
        '& -MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      }}
      PaperProps={{
        ...restPaperProps,
        sx: [
          // scoped to this drawer's paper only — a global rule here would leak into
          // every other drawer and win or lose based on style-injection order
          { height: globalHeight, overflow: 'visible' },
          ...normalizedPaperSxOverride,
        ],
      }}
      {...props}
    >
      <SwipeableContainer>
        <Puller />
      </SwipeableContainer>
      <ContentContainer>{children}</ContentContainer>
    </MUISwipeableDrawer>
  )
}

export default SwipeableDrawer
