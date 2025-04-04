'use client'

import { KeyboardEvent, KeyboardEventHandler, forwardRef } from 'react'

import { SocialTextField as DefaultSocialTextField } from '@baseapp-frontend/design-system/components/web/inputs'

import { SOCIAL_UPSERT_FORM } from '../../common'
import DefaultSocialUpsertActions from '../SocialUpsertActions'
import DefaultSubmitActions from './SubmitActions'
import { Form } from './styled'
import { SocialInputProps } from './types'

/**
 * ### SocialInput Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * The `SocialInput` component is a flexible form input component, commonly used for creating or replying to messages, comments, or other text-based inputs.
 *
 * It integrates with `react-hook-form` for form handling and validation, making it customizable and reusable across different features.
 *
 * The component provides various input-related functionalities, such as auto-focus, form submission handling, and support for conditional actions like replying to a comment or canceling a reply. It leverages a combination of subcomponents like `SocialTextField`, `SocialUpsertActions`, and `SubmitActions` for customization.
 *
 * ### Key Features
 * - Handles form submission via `react-hook-form`.
 * - Supports both message creation and replies.
 * - Customizable through the `SocialTextField`, `SocialUpsertActions`, and `SubmitActions` components.
 * - Automatically disables the submit button based on loading state or form validation status.
 *
 * ### Extending the Component
 * You can customize the `SocialTextField`, `SocialUpsertActions`, and `SubmitActions` components, or pass additional props through `SocialTextFieldProps` and `SubmitActionsProps` for further customization.
 *
 * #### Example:
 * ```ts
 * import { useForm } from 'react-hook-form';
 * import SocialInput from './SocialInput';
 *
 * const MyComponent = () => {
 *   const form = useForm({
 *     defaultValues: { body: '' },
 *   });
 *
 *   const handleSubmit = (data) => {
 *     console.log(data);
 *   };
 *
 *   return (
 *     <SocialInput
 *       form={form}
 *       submit={handleSubmit}
 *       isLoading={false}
 *       placeholder="Enter your message..."
 *     />
 *   );
 * };
 * ```
 */
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
      onKeyDown,
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
    const defaultKeyDown = (event: KeyboardEvent<HTMLDivElement>, onSubmit: VoidFunction) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        onSubmit()
      }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (onKeyDown) {
        onKeyDown(event, () => form.handleSubmit(submit)(event))
      } else {
        defaultKeyDown(event, () => form.handleSubmit(submit)(event))
      }
    }

    const isCreateButtonDisabled = isLoading || !form.formState.isValid || !form.formState.isDirty

    return (
      <Form id={formId} onSubmit={form.handleSubmit(submit)}>
        <SocialTextField
          inputRef={ref}
          name={SOCIAL_UPSERT_FORM.body}
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
      </Form>
    )
  },
)

export default SocialInput
