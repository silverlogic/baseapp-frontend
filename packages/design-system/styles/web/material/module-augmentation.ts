import { CSSProperties } from 'react'

import { CustomShadows } from '../types'

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadows
  }
  interface ThemeOptions {
    customShadows?: CustomShadows
  }
  interface TypographyVariants {
    // @ts-ignore
    fontSecondaryFamily: CSSProperties['fontFamily']
    // @ts-ignore
    fontWeightSemiBold: CSSProperties['fontWeight']
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    soft: true
  }
}

declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides {
    compact: true
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true
    busy: true
    online: true
    offline: true
    invisible: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    outlined: true
    outlinedExtended: true
    soft: true
    softExtended: true
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    soft: true
  }

  interface PaginationPropsColorOverrides {
    info: true
    success: true
    warning: true
    error: true
  }
}
