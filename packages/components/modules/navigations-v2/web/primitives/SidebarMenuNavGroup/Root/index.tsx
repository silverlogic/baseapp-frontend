import { FC, useCallback, useState } from 'react'

import { Stack } from '@mui/material'

import { RootProps } from './types'

const Root: FC<RootProps> = ({ children, defaultOpen = true, hide = false, ...props }) => {
  const [open, setOpen] = useState(defaultOpen)

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  if (hide) return null
  return (
    <Stack gap={0.5} {...props}>
      {children({ open, handleToggle })}
    </Stack>
  )
}

export default Root
