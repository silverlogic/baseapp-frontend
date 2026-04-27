import type { ComponentType } from 'react'

import {
  addComposerChild$,
  addExportVisitor$,
  addImportVisitor$,
  addLexicalNode$,
  lexical,
  markdown$,
  realmPlugin,
  rootEditor$,
} from '@mdxeditor/editor'
import type { LexicalEditor, TextNode as LexicalTextNode } from 'lexical'

import { $createMentionNode, MentionNode } from './MentionNode'
import MentionsMenuPortal from './MentionsMenuPortal'
import {
  applyMention$,
  closeMention$,
  commitMention$,
  mentionMenuState$,
  mentionsConfig$,
  moveSelectionDown$,
  moveSelectionUp$,
} from './cells'
import { INITIAL_MENU_STATE, MENTION_MIN_CHARS, MENTION_TRIGGER } from './constants'
import type { MentionsActiveConfig } from './types'
import { buildTriggerWordRegex, parseMentionsFromMarkdown } from './utils'
import { LexicalMentionVisitor, MdastMentionLinkVisitor } from './visitors'

const {
  $createRangeSelection,
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_DOWN_COMMAND,
  SELECTION_CHANGE_COMMAND,
} = lexical

/**
 * Returns the screen-space rect of the trigger character (e.g. `@`) so the
 * menu can anchor to it instead of following the caret as the user types
 * the query. Re-derived on every selection change so the rect tracks line
 * wraps and scroll correctly.
 */
const getTriggerRect = (
  editor: LexicalEditor,
  triggerLength: number,
  triggerStartOffset: number,
): DOMRect | null => {
  if (typeof document === 'undefined') return null
  let rect: DOMRect | null = null
  editor.getEditorState().read(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    const node = selection.anchor.getNode()
    if (!$isTextNode(node)) return
    const dom = editor.getElementByKey(node.getKey())
    if (!dom) return
    let textChild: ChildNode | null = dom.firstChild
    while (textChild && textChild.nodeType !== Node.TEXT_NODE) {
      textChild = textChild.firstChild
    }
    if (!textChild) return
    const textLength = (textChild.textContent ?? '').length
    if (triggerStartOffset < 0 || triggerStartOffset >= textLength) return
    try {
      const range = document.createRange()
      range.setStart(textChild, triggerStartOffset)
      range.setEnd(textChild, Math.min(triggerStartOffset + triggerLength, textLength))
      rect = range.getBoundingClientRect()
    } catch {
      // offset shifted out from under us — let the caller fall back
    }
  })
  return rect
}

const detectTrigger = (
  editor: LexicalEditor,
  trigger: string,
  minChars: number,
): { open: boolean; query: string; triggerStartOffset: number } | null => {
  let result: { open: boolean; query: string; triggerStartOffset: number } | null = null
  editor.getEditorState().read(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    if (!selection.isCollapsed()) return
    const { anchor } = selection
    const node = anchor.getNode()
    if (!$isTextNode(node)) return
    const textUpToCaret = node.getTextContent().slice(0, anchor.offset)
    const regex = buildTriggerWordRegex(trigger)
    const match = regex.exec(textUpToCaret)
    if (!match) return
    const query = match[1] ?? ''
    const open = query.length >= minChars
    const triggerStartOffset = anchor.offset - query.length - trigger.length
    result = { open, query, triggerStartOffset }
  })
  return result
}

const applyMentionToEditor = (
  editor: LexicalEditor,
  profileId: string,
  urlPath: string,
  name: string,
  triggerStartOffset: number,
) => {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    const { anchor } = selection
    const node = anchor.getNode()
    if (!$isTextNode(node)) return
    const textNode = node as LexicalTextNode
    const endOffset = anchor.offset
    if (triggerStartOffset < 0 || triggerStartOffset > endOffset) return

    const range = $createRangeSelection()
    range.setTextNodeRange(textNode, triggerStartOffset, textNode, endOffset)
    $setSelection(range)

    const mentionNode = $createMentionNode({ profileId, urlPath, name })
    const spaceNode = $createTextNode(' ')
    range.insertNodes([mentionNode, spaceNode])
  })
}

export const mentionsPlugin = realmPlugin<MentionsActiveConfig>({
  init(realm, params) {
    if (!params) return

    realm.pubIn({
      [mentionsConfig$]: params,
      [mentionMenuState$]: INITIAL_MENU_STATE,
      [addLexicalNode$]: MentionNode,
      [addImportVisitor$]: MdastMentionLinkVisitor,
      [addExportVisitor$]: LexicalMentionVisitor,
      [addComposerChild$]: MentionsMenuPortal as ComponentType,
    })

    // Close menu when signalled.
    realm.sub(closeMention$, () => {
      const current = realm.getValue(mentionMenuState$)
      if (current.open) realm.pub(mentionMenuState$, { ...current, open: false })
    })

    // Selection + keyboard commands. Re-registers when the editor swaps in.
    realm.sub(rootEditor$, (editor): void | (() => void) => {
      if (!editor) return undefined

      const unregisterSelection = editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          const config = realm.getValue(mentionsConfig$)
          const trigger = config?.trigger ?? MENTION_TRIGGER
          const minChars = config?.minChars ?? MENTION_MIN_CHARS
          const detected = detectTrigger(editor, trigger, minChars)
          const current = realm.getValue(mentionMenuState$)
          if (!detected || !detected.open) {
            if (current.open) realm.pub(mentionMenuState$, { ...current, open: false })
            return false
          }
          const anchorRect = getTriggerRect(editor, trigger.length, detected.triggerStartOffset)
          realm.pub(mentionMenuState$, {
            open: true,
            query: detected.query,
            anchorRect,
            activeIndex: current.query === detected.query ? current.activeIndex : 0,
            triggerStartOffset: detected.triggerStartOffset,
          })
          return false
        },
        COMMAND_PRIORITY_LOW,
      )

      const unregisterKeydown = editor.registerCommand(
        KEY_DOWN_COMMAND,
        (event: KeyboardEvent) => {
          const state = realm.getValue(mentionMenuState$)
          if (!state.open) return false
          const config = realm.getValue(mentionsConfig$)
          const hasItems = (config?.controller?.items.length ?? 0) > 0
          switch (event.key) {
            case 'ArrowDown':
              if (!hasItems) return false
              event.preventDefault()
              realm.pub(moveSelectionDown$)
              return true
            case 'ArrowUp':
              if (!hasItems) return false
              event.preventDefault()
              realm.pub(moveSelectionUp$)
              return true
            case 'Enter':
            case 'Tab':
              if (!hasItems) return false
              event.preventDefault()
              // -1 means "use whatever activeIndex is current". The portal
              // resolves this into a suggestion and publishes applyMention$.
              realm.pub(commitMention$, -1)
              return true
            case 'Escape':
              event.preventDefault()
              realm.pub(closeMention$)
              return true
            default:
              return false
          }
        },
        COMMAND_PRIORITY_HIGH,
      )

      // When the portal publishes the resolved suggestion, insert it.
      const unsubApply = realm.sub(applyMention$, ({ profileId, urlPath, name }) => {
        const state = realm.getValue(mentionMenuState$)
        applyMentionToEditor(editor, profileId, urlPath, name, state.triggerStartOffset)
        realm.pub(mentionMenuState$, { ...state, open: false })
      })

      return () => {
        unregisterSelection()
        unregisterKeydown()
        unsubApply()
      }
    })

    // Derive mentions from the markdown document on every change.
    realm.sub(markdown$, (md) => {
      const currentConfig = realm.getValue(mentionsConfig$)
      currentConfig?.onMentionsChange?.(parseMentionsFromMarkdown(md ?? ''))
    })
  },
  update(realm, params) {
    if (params) realm.pub(mentionsConfig$, params)
  },
})

export type {
  MentionCommitted,
  MentionProfileSuggestion,
  MentionsConfig,
  MentionsSearchController,
} from './types'
