import { type FC, useCallback, useEffect, useMemo, useRef } from 'react'

import { removeLeadingSlash } from '@baseapp-frontend/utils'

import { useCellValue, usePublisher, useRealm } from '@mdxeditor/gurx'
import { ClickAwayListener } from '@mui/material'
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso'

import {
  applyMention$,
  closeMention$,
  commitMention$,
  mentionMenuState$,
  mentionsConfig$,
  moveSelectionDown$,
  moveSelectionUp$,
} from '../cells'
import type { MentionProfileSuggestion } from '../types'
import { makeVirtualAnchor } from '../utils'
import MentionListItem from './MentionListItem'
import MentionListSkeleton from './MentionListSkeleton'
import { MENTION_ROW_HEIGHT, MENTION_VISIBLE_ROWS } from './constants'
import { StyledPaper, StyledPopper } from './styled'

const MentionsMenuPortal: FC = () => {
  const realm = useRealm()
  const menuState = useCellValue(mentionMenuState$)
  const config = useCellValue(mentionsConfig$)
  const publishMenuState = usePublisher(mentionMenuState$)
  const publishApplyMention = usePublisher(applyMention$)
  const publishClose = usePublisher(closeMention$)
  const virtuosoRef = useRef<VirtuosoHandle>(null)

  const controller = config?.controller
  const search = controller?.search
  const reset = controller?.reset

  const controllerRef = useRef(controller)
  controllerRef.current = controller

  const virtualAnchor = useMemo(
    () => makeVirtualAnchor(menuState.anchorRect),
    [menuState.anchorRect],
  )

  useEffect(() => {
    if (!search || !reset) return
    if (menuState.open) {
      search(menuState.query)
    } else {
      reset()
    }
  }, [search, reset, menuState.open, menuState.query])

  const commitSuggestion = useCallback(
    (suggestion: MentionProfileSuggestion) => {
      publishApplyMention({
        profileId: suggestion.profileId,
        urlPath: suggestion.urlPath,
        name: suggestion.name.trim() || removeLeadingSlash(suggestion.urlPath),
      })
    },
    [publishApplyMention],
  )

  useEffect(() => {
    const scrollTo = (index: number) => {
      virtuosoRef.current?.scrollIntoView({ index, align: 'center', behavior: 'auto' })
    }
    const unsubUp = realm.sub(moveSelectionUp$, () => {
      const items = controllerRef.current?.items ?? []
      if (items.length === 0) return
      const current = realm.getValue(mentionMenuState$)
      const next = (current.activeIndex - 1 + items.length) % items.length
      publishMenuState({ ...current, activeIndex: next })
      scrollTo(next)
    })
    const unsubDown = realm.sub(moveSelectionDown$, () => {
      const items = controllerRef.current?.items ?? []
      if (items.length === 0) return
      const current = realm.getValue(mentionMenuState$)
      const next = (current.activeIndex + 1) % items.length
      publishMenuState({ ...current, activeIndex: next })
      scrollTo(next)
    })
    const unsubCommit = realm.sub(commitMention$, (indexOverride) => {
      const items = controllerRef.current?.items ?? []
      if (items.length === 0) return
      const current = realm.getValue(mentionMenuState$)
      const index = indexOverride >= 0 ? indexOverride : current.activeIndex
      const suggestion = items[index]
      if (suggestion) commitSuggestion(suggestion)
    })
    return () => {
      unsubUp()
      unsubDown()
      unsubCommit()
    }
  }, [realm, commitSuggestion, publishMenuState])

  if (!controller || !menuState.open || !virtualAnchor) return null

  const { items, isLoading, isLoadingMore, hasNext } = controller

  // Hide the menu when there's nothing to show — no skeleton in flight and no
  // items. The user keeps typing and the popper reappears as soon as results
  // come back; we don't render a "No matches" state.
  if (!isLoading && items.length === 0) return null

  const visibleRows = Math.min(items.length, MENTION_VISIBLE_ROWS)

  const renderItem = (index: number, suggestion: MentionProfileSuggestion) => (
    <MentionListItem
      suggestion={suggestion}
      selected={index === menuState.activeIndex}
      onSelect={() => commitSuggestion(suggestion)}
    />
  )

  const renderContent = () => {
    if (isLoading && items.length === 0) return <MentionListSkeleton />

    return (
      <Virtuoso
        ref={virtuosoRef}
        data={items}
        style={{ height: visibleRows * MENTION_ROW_HEIGHT }}
        defaultItemHeight={MENTION_ROW_HEIGHT}
        endReached={() => {
          if (hasNext && !isLoadingMore) controller.loadMore()
        }}
        itemContent={(index, suggestion) => renderItem(index, suggestion)}
      />
    )
  }

  return (
    <ClickAwayListener onClickAway={() => publishClose()}>
      <StyledPopper
        open
        anchorEl={virtualAnchor}
        placement="top-start"
        modifiers={[
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'flip', enabled: true },
          { name: 'preventOverflow', options: { padding: 8 } },
        ]}
      >
        <StyledPaper role="listbox" aria-label="Mention suggestions">
          {renderContent()}
        </StyledPaper>
      </StyledPopper>
    </ClickAwayListener>
  )
}

export default MentionsMenuPortal
