import { FC } from 'react'

import { Global } from '@emotion/react'
import MUISwipeableDrawer from '@mui/material/SwipeableDrawer'

import { SWIPE_AREA_WIDTH } from './constants'
import { ContentContainer, Puller, SwipeableContainer } from './styled'
import { SwipeableDrawerProps } from './types'

const SwipeableDrawer: FC<SwipeableDrawerProps> = ({
  children,
  globalHeight = `calc(25% - ${SWIPE_AREA_WIDTH}px)`,
  ...props
}) => (
  <>
    <Global
      styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          height: globalHeight,
          overflow: 'visible',
        },
        '& .MuiDrawer-root': {
          userSelect: 'none',
        },
      }}
    />
    {/* @ts-ignore TODO: investigate 'JSXElementConstructor<SwipeableDrawerProps>' is not a valid JSX element type */}
    <MUISwipeableDrawer
      onOpen={() => {}}
      anchor="bottom"
      disableSwipeToOpen
      ModalProps={{
        keepMounted: false,
      }}
      sx={{
        '& -MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      }}
      {...props}
    >
      <SwipeableContainer>
        <Puller />
      </SwipeableContainer>
      <ContentContainer>{children}</ContentContainer>
    </MUISwipeableDrawer>
  </>
)

export default SwipeableDrawer
