import { forwardRef } from 'react'

import { TextInput as NativeTextInput } from 'react-native'

import { SOCIAL_UPSERT_FORM } from '../../../__shared__/common/constants'
import DefaultSocialTextInput from '../SocialTextInput'
import DefaultSubmitActions from './SubmitActions'
import { SocialInputProps } from './types'

const SocialInput = forwardRef<NativeTextInput, SocialInputProps>(
  (
    {
      SocialTextInput = DefaultSocialTextInput,
      SocialTextInputProps = {},
      SubmitActions = DefaultSubmitActions,
      SubmitActionsProps = {},
      form,
      isLoading,
      onFocusChange,
      onTextHeightChange,
      shouldUseBottomSheetSafeComponents = false,
      submit,
    },
    ref,
  ) => {
    const submissionDisabled = isLoading || !form.formState.isValid

    return (
      <SocialTextInput
        control={form.control}
        name={SOCIAL_UPSERT_FORM.body}
        onFocusChange={onFocusChange}
        onTextHeightChange={onTextHeightChange}
        ref={ref}
        {...SocialTextInputProps}
      >
        <SubmitActions
          disabled={submissionDisabled}
          handleSubmit={submit}
          shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
          {...SubmitActionsProps}
        />
      </SocialTextInput>
    )
  },
)

export default SocialInput
