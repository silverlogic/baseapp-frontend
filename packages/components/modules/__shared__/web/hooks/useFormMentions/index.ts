'use client'

import { useCallback, useMemo } from 'react'

import type {
  MentionCommitted,
  MentionsConfig,
} from '@baseapp-frontend/design-system/components/web/inputs'

import type { FieldValues, Path, PathValue } from 'react-hook-form'

import type { SocialInputProps } from '../../SocialInput/types'
import type { UseFormMentionsOptions, UseFormMentionsResult } from './types'

const DEFAULT_FIELD_NAME = 'mentionedProfileIds'

const useFormMentions = <TForm extends FieldValues>({
  setValue,
  controller,
  disabled = false,
  fieldName = DEFAULT_FIELD_NAME as Path<TForm>,
}: UseFormMentionsOptions<TForm>): UseFormMentionsResult => {
  const handleMentionsChange = useCallback(
    (mentions: MentionCommitted[]) => {
      setValue(
        fieldName,
        mentions.map((mention) => mention.profileId) as PathValue<TForm, Path<TForm>>,
        { shouldDirty: false, shouldValidate: false },
      )
    },
    [setValue, fieldName],
  )

  const mentions = useMemo<MentionsConfig | undefined>(() => {
    if (disabled) return { disabled: true }
    if (!controller) return undefined
    return { controller, onMentionsChange: handleMentionsChange }
  }, [disabled, controller, handleMentionsChange])

  const isMentionsActive = !disabled && Boolean(controller)

  return { mentions, isMentionsActive }
}

export default useFormMentions

/**
 * Pure helper used by SocialInput-based forms. Threads the resolved `mentions`
 * through the deep `SocialTextFieldProps.MarkdownEditorFieldProps.mentions` slot.
 * Forms call this inside their own `useMemo` so the hook stays free of
 * mutable-prop dependency tracking.
 */
export const withMentionsInSocialInputProps = (
  socialInputProps: Partial<SocialInputProps>,
  mentions: MentionsConfig | undefined,
): Partial<SocialInputProps> => ({
  ...socialInputProps,
  SocialTextFieldProps: {
    ...socialInputProps.SocialTextFieldProps,
    MarkdownEditorFieldProps: {
      ...socialInputProps.SocialTextFieldProps?.MarkdownEditorFieldProps,
      mentions,
    },
  },
})
