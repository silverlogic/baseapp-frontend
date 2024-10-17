'use client'

import { KeyboardEventHandler, forwardRef } from 'react'

import { SocialTextField as DefaultSocialTextField } from '@baseapp-frontend/design-system'

import DefaultSocialUpsertActions from '../SocialUpsertActions'
import { FORM_VALUE } from '../constants'
import DefaultSubmitActions from './SubmitActions'
import { SocialInputProps } from './types'

const SocialInput = forwardRef<HTMLInputElement, SocialInputProps>(
  (
    {
      placeholder = 'Message...',
      autoFocusInput,
      SocialTextField = DefaultSocialTextField,
      SocialTextFieldProps = {},
      SocialUpsertActions = DefaultSocialUpsertActions,
      SubmitActions = DefaultSubmitActions,
      SubmitActionsProps = {},
      formId = 'text-field-form',
      submit,
      isLoading,
      isReply = false,
      replyTargetName,
      onCancelReply,
      form,
    },
    ref,
  ) => {
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        form.handleSubmit(submit)(event)
      }
    }

    const isCreateButtonDisabled = isLoading || !form.formState.isValid || !form.formState.isDirty

    return (
      <form
        id={formId}
        onSubmit={form.handleSubmit(submit)}
        className="sticky bottom-0 z-10 bg-common-white pb-4"
      >
        <SocialTextField
          inputRef={ref}
          name={FORM_VALUE.body}
          control={form.control}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocusInput}
          isReply={isReply}
          replyTargetName={replyTargetName}
          onCancelReply={onCancelReply}
          {...SocialTextFieldProps}
        >
          <SocialUpsertActions />
          <SubmitActions
            formId={formId}
            disabled={isCreateButtonDisabled}
            {...SubmitActionsProps}
          />
        </SocialTextField>
      </form>
    )
  },
)

export default SocialInput
