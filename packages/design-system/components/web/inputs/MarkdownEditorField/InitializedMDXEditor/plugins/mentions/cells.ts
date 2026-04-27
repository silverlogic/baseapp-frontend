import { Cell, Signal } from '@mdxeditor/gurx'

import { INITIAL_MENU_STATE } from './constants'
import type { MentionMenuState, MentionsActiveConfig } from './types'

export const mentionsConfig$ = Cell<MentionsActiveConfig | null>(null)

export const mentionMenuState$ = Cell<MentionMenuState>(INITIAL_MENU_STATE)

export const closeMention$ = Signal<void>()

export const moveSelectionUp$ = Signal<void>()

export const moveSelectionDown$ = Signal<void>()

// Signal payload: -1 means "use whatever activeIndex is currently in the menu state";
// >= 0 commits that explicit index (click handler path).
export const commitMention$ = Signal<number>()

// Published by the menu portal with the concrete suggestion it wants committed,
// picked up by the plugin's subscriber so the Lexical update runs with the data.
export const applyMention$ = Signal<{ profileId: string; urlPath: string; name: string }>()
