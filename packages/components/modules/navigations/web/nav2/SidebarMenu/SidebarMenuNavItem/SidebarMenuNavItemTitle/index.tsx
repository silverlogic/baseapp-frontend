import { Box, Tooltip, Typography } from '@mui/material'

import { SidebarMenuNavItemTitleProps } from './types'

const SidebarMenuNavItemTitle = ({
  title,
  caption,
  ContainerProps,
  ...props
}: SidebarMenuNavItemTitleProps) => {
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
      }}
      {...ContainerProps}
    >
      <Typography variant="body2" color="primary.dark" fontWeight={600} noWrap>
        {title}
      </Typography>

      {caption && (
        <Tooltip title={caption} placement="top-start">
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
        </Tooltip>
      )}
    </Box>
  )
}

export default SidebarMenuNavItemTitle
