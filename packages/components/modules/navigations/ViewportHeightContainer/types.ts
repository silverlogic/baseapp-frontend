import { PropsWithChildren } from 'react'

import { ThemeLayout } from '@baseapp-frontend/design-system'

import type { BoxProps } from '@mui/material'

export interface ViewportHeightContainerProps extends PropsWithChildren, BoxProps {
  themeLayout: ThemeLayout
}
