import type {
  MentionsConfig,
  MentionsSearchController,
} from '@baseapp-frontend/design-system/components/web/inputs'

import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form'

export interface UseFormMentionsOptions<TForm extends FieldValues> {
  setValue: UseFormSetValue<TForm>
  /** Pass a controller (e.g. from `useProfileMentionSearch()`) to enable the menu. */
  controller?: MentionsSearchController
  /**
   * Force-disable: editor sanitizes pasted/loaded `mention://` and the form omits the payload field.
   */
  disabled?: boolean
  /** Form field that holds the committed profile IDs. Defaults to `"mentionedProfileIds"`. */
  fieldName?: Path<TForm>
}

export interface UseFormMentionsResult {
  mentions: MentionsConfig | undefined
  /**
   * `true` only when a controller is supplied AND `disabled !== true`. Forms gate
   * the inclusion of `mentionedProfileIds` in the mutation payload on this.
   */
  isMentionsActive: boolean
}
