import { Box, Typography } from '@mui/material'

import { SidebarMenuNavItemTitleProps } from './types'

const SidebarMenuNavItemTitle = ({
  title,
  caption,
  ContainerProps,
  TitleProps,
  CaptionProps,
}: SidebarMenuNavItemTitleProps) => {
  const { sx: containerSx, ...containerProps } = ContainerProps ?? {}
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        minWidth: 0,
        height: 'fit-content',
        minHeight: '44px',
        justifyContent: 'center',
        ...containerSx,
      }}
      {...containerProps}
    >
      <Typography variant="body2" color="text.secondary" fontWeight={600} noWrap className="label" {...TitleProps}>
        {title}
      </Typography>

      {caption && (
        <Typography variant="caption" color="text.secondary" {...CaptionProps}>
          {caption}
        </Typography>
      )}
    </Box>
  )
}

export default SidebarMenuNavItemTitle
