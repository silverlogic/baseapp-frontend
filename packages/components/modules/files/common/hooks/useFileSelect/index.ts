import { useCallback, useRef } from 'react'

import type { Accept, UseFileSelectParams, UseFileSelectReturn } from './types'

const buildAcceptAttr = (acceptedFileTypes?: Accept): string | undefined => {
  if (!acceptedFileTypes) return undefined
  const parts = Object.entries(acceptedFileTypes).flatMap(([mime, exts]) => [mime, ...exts])
  return parts.length ? parts.join(',') : undefined
}

/**
 * Headless file selection: owns a hidden <input type="file"> and the
 * accept/size/count validation, decoupled from how the trigger looks. Both the
 * dropzone and the button triggers use it so selection behaves identically.
 */
export const useFileSelect = ({
  onFilesSelected,
  maxFiles = 10,
  maxFileSize = 100 * 1024 * 1024,
  acceptedFileTypes,
  disabled = false,
}: UseFileSelectParams): UseFileSelectReturn => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const open = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const getInputProps = useCallback<UseFileSelectReturn['getInputProps']>(
    () => ({
      ref: (node: HTMLInputElement | null) => {
        inputRef.current = node
      },
      type: 'file',
      multiple: maxFiles > 1,
      accept: buildAcceptAttr(acceptedFileTypes),
      disabled,
      style: { display: 'none' },
      onChange: (event) => {
        const { target } = event
        const selected = Array.from(target.files ?? [])
          .filter((file) => file.size <= maxFileSize)
          .slice(0, maxFiles)
        // Reset so selecting the same file again re-triggers onChange.
        target.value = ''
        if (selected.length) {
          onFilesSelected(selected)
        }
      },
    }),
    [acceptedFileTypes, disabled, maxFileSize, maxFiles, onFilesSelected],
  )

  return { open, getInputProps }
}

export type { UseFileSelectParams, UseFileSelectReturn } from './types'
