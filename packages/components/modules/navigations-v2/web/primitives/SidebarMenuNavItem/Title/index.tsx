import { Box, Typography } from '@mui/material'

import { TitleProps } from './types'

const Title = ({
  title,
  caption,
  ContainerProps,
  TypographyTitleProps,
  TypographyCaptionProps,
}: TitleProps) => {
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
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={600}
        noWrap
        className="label"
        {...TypographyTitleProps}
      >
        {title}
      </Typography>

      {caption && (
        <Typography variant="caption" color="text.secondary" {...TypographyCaptionProps}>
          {caption}
        </Typography>
      )}
    </Box>
  )
}

export default Title
