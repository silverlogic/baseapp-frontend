import { useEffect, useMemo } from 'react'

import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../../__shared__/common'
import { useCommentUpdateMutation } from '../../graphql/mutations/CommentUpdate'
import { CommentSubmitOptions } from '../useCommentCreateForm/types'
import { UseCommentUpdateFormOptions, UseCommentUpdateFormReturn } from './types'

/**
 * Form + submit logic for editing a comment. Platform components render the input UI around
 * it: web's `CommentUpdate` (one instance per comment being edited) and the native
 * `CommentComposer` (a single instance whose `target` comes from the reply store) both
 * consume this hook.
 */
const useCommentUpdateForm = ({
  target,
  form: externalForm,
  onClose,
  onSuccess,
  exitOnSubmit = false,
}: UseCommentUpdateFormOptions): UseCommentUpdateFormReturn => {
  const initialValues = useMemo<SocialUpsertForm>(
    () => ({
      body: target?.body ?? '',
      mentionedProfileIds: target?.mentionedProfileIds ?? [],
    }),
    [target?.body, target?.mentionedProfileIds],
  )

  const internalForm = useForm<SocialUpsertForm>({
    defaultValues: initialValues,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })
  const form = externalForm ?? internalForm

  const [commitUpdate, isMutationInFlight] = useCommentUpdateMutation()

  // Re-seed the form when the edit target changes (the native composer stays mounted while
  // the edited comment comes and goes; on web the target is fixed per instance).
  useEffect(() => {
    form.reset(initialValues)
    // `form` is stable across renders (react-hook-form).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.id])

  const submit = (
    data: SocialUpsertForm,
    { includeMentions = false }: CommentSubmitOptions = {},
  ) => {
    if (isMutationInFlight || !target?.id) return

    commitUpdate({
      variables: {
        input: {
          id: target.id,
          body: data?.body,
          ...(includeMentions && { mentionedProfileIds: data.mentionedProfileIds }),
        },
      },
      onCompleted: (response, errors) => {
        // Transport errors are already toasted by the mutation hook.
        if (errors) return
        const mutationErrors = response?.commentUpdate?.errors
        setFormRelayErrors(form, mutationErrors)

        if (!mutationErrors?.length) {
          onClose()
          form.reset()
          onSuccess?.()
        }
      },
    })

    if (exitOnSubmit) {
      onClose()
    }
  }

  const cancel = () => {
    onClose()
    form.reset(initialValues)
  }

  return {
    form,
    initialValues,
    submit,
    isLoading: isMutationInFlight,
    cancel,
  }
}

export default useCommentUpdateForm
