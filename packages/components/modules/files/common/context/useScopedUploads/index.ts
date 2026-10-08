import { useShallow } from 'zustand/react/shallow'

import { useFileUploadStore } from '../FileUploadProvider'
import type { ScopedUploads } from './types'

/**
 * The uploads belonging to one scope.
 *
 * Subscribes through a selector rather than to the whole store: the store holds
 * every composer's uploads and replaces its `files` Map on each progress event,
 * so a whole-store subscription re-renders every list on every XHR tick.
 */
export const useScopedUploads = (scope?: string): ScopedUploads =>
  useFileUploadStore(
    useShallow((state) =>
      scope ? Array.from(state.files.values()).filter((file) => file.scope === scope) : [],
    ),
  )
