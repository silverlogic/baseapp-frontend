import { MouseEvent, useCallback, useState } from 'react'

export function usePopover() {
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
