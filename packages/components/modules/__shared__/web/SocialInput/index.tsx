'use client'

import {
  KeyboardEvent,
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { SocialTextField as DefaultSocialTextField } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Popover } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { SOCIAL_UPSERT_FORM } from '../../common'
import DefaultSocialUpsertActions from '../SocialUpsertActions'
import ProfileCard from './ProfileCard'
import { GroupMembersEdge } from './ProfileCard/types'
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
      profilesList = [],
      loadNextProfiles,
      isLoadingNextProfiles,
      hasNextProfiles,
      refetchProfiles,
      VirtuosoProps = {},
    },
    ref,
  ) => {
    const formRef = useRef(null)
    const [openPopper, setOpenPopper] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [name, setName] = useState<string | undefined | null>('')
    const [isPending, startTransition] = useTransition()

    const inputValue = form.watch(SOCIAL_UPSERT_FORM.body)

    const tagUser = () => {
      const lastDelimiterIndex = inputValue.lastIndexOf(' ')
      const newValue = `${inputValue.substring(0, lastDelimiterIndex + 1)}@${name} ` // Add a space after the username
      form.setValue(SOCIAL_UPSERT_FORM.body, newValue, { shouldDirty: true, shouldValidate: true })
      setOpenPopper(false)
      setName('')
      setSelectedIndex(0)
    }

    const defaultKeyDown = (event: KeyboardEvent<HTMLDivElement>, onSubmit: VoidFunction) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        onSubmit()
      }
      if (profilesList.length > 0 && openPopper) {
        switch (event.key) {
          case 'ArrowDown':
            setSelectedIndex((prev) => (prev < profilesList.length - 1 ? prev + 1 : 0))
            break
          case 'ArrowUp':
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : profilesList.length - 1))
            break
          case 'Enter':
            event.preventDefault()
            tagUser()
            break
          case 'Tab':
            event.preventDefault()
            tagUser()
            break
          case 'Escape':
            setOpenPopper(false)
            break
          default:
            break
        }
      }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (onKeyDown) {
        onKeyDown(event, () => form.handleSubmit(submit)(event))
      } else {
        defaultKeyDown(event, () => form.handleSubmit(submit)(event))
      }
    }

    // Conditions to enable search
    // 1 - The last word must start with '@'
    // Conditions to open the popper
    // 1 - The last word must start with '@'
    // 2 - There must be at least one profile in the list

    const isCreateButtonDisabled = isLoading || !form.formState.isValid || !form.formState.isDirty

    const handleSearch = () => {
      const lastDelimiterIndex = inputValue.lastIndexOf(' ')
      const lastTypedWord = inputValue.substring(lastDelimiterIndex + 1)
      if (lastTypedWord.startsWith('@')) {
        if (!openPopper) setOpenPopper(true)
        startTransition(() => {
          refetchProfiles?.({
            q: lastTypedWord.substring(1),
            orderBy: 'name',
          })
        })
      }
      if (!lastTypedWord && profilesList.length < 1) {
        startTransition(() => {
          refetchProfiles?.({
            q: '',
            orderBy: 'name',
          })
        })
      }
    }
    const handleResetProfileList = () => {
      if (openPopper) {
        setOpenPopper(false)
      }
      const lastDelimiterIndex = inputValue.lastIndexOf(' ')
      const lastTypedWord = inputValue.substring(lastDelimiterIndex + 1)
      if (!lastTypedWord.startsWith('@')) {
        startTransition(() => {
          refetchProfiles?.({
            q: '',
            orderBy: 'name',
          })
        })
        setSelectedIndex(0)
        setName('')
      }
    }

    const renderLoadingState = () => {
      if (!isLoadingNextProfiles || !isPending) return null

      return (
        <LoadingState
          sx={{ paddingTop: 3, paddingBottom: 1 }}
          CircularProgressProps={{ size: 15 }}
          aria-label="loading more profiles"
        />
      )
    }

    const renderItem = (index: number, item: GroupMembersEdge) => {
      if (item.node) {
        return (
          <ProfileCard
            groupMember={item.node}
            tagUser={tagUser}
            isSelected={selectedIndex === index}
            setName={setName}
          />
        )
      }
      return null
    }

    const renderMembers = () => (
      <Virtuoso
        data={profilesList}
        itemContent={(index: number, item: GroupMembersEdge) => renderItem(index, item)}
        style={{ scrollbarWidth: 'none' }}
        components={{
          Footer: renderLoadingState,
        }}
        endReached={() => {
          if (hasNextProfiles && loadNextProfiles) {
            loadNextProfiles(5)
          }
        }}
        {...VirtuosoProps}
      />
    )

    useEffect(() => {
      if (inputValue) {
        if (profilesList.length > 0) {
          handleSearch()
        } else {
          handleResetProfileList()
        }
      }
    }, [inputValue, profilesList])

    return (
      <>
        <Popover
          open={openPopper}
          anchorEl={formRef.current}
          onClose={() => setOpenPopper(false)}
          anchorOrigin={{
            vertical: 10,
            horizontal: 10,
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          anchorPosition={{ top: 100, left: 0 }}
          disableScrollLock
          slotProps={{ root: { disableAutoFocus: true, hideBackdrop: true } }}
        >
          <Box sx={{ width: '264px', height: '200px', p: 0, m: 0 }}>{renderMembers()}</Box>
        </Popover>
        <Form id={formId} onSubmit={form.handleSubmit(submit)} ref={formRef}>
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
            // sx={{ zIndex: openPopper ? 1301 : 'auto' }}
          >
            <SocialUpsertActions />
            <SubmitActions
              formId={formId}
              disabled={isCreateButtonDisabled}
              {...SubmitActionsProps}
            />
          </SocialTextField>
        </Form>
      </>
    )
  },
)

export default SocialInput
