'use client'

import { MouseEvent, useCallback, useState } from 'react'

const usePopover = () => {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const onOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setOpen(null)
  }, [])

  return {
    open,
    onOpen,
    onClose,
    setOpen,
  }
}

export default usePopover
