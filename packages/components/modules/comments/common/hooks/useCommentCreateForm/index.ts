import { useEffect } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../../__shared__/common'
import useCommentReply from '../../context/useCommentReply'
import { useCommentCreateMutation } from '../../graphql/mutations/CommentCreate'
import { getCommentsConnectionId, getNextClientMutationId } from '../../utils'
import {
  CommentSubmitOptions,
  UseCommentCreateFormOptions,
  UseCommentCreateFormReturn,
} from './types'

/**
 * Form + submit logic for creating a comment (or a reply, when the `CommentReplyProvider`
 * store holds a reply target). Platform components render the input UI around it: web's
 * `CommentCreate` and the native `CommentComposer` both consume this hook.
 */
const useCommentCreateForm = ({
  targetObjectId,
  expandRepliesOnSuccess = false,
  resetFormOnReplyTargetChange = false,
  onSuccess,
}: UseCommentCreateFormOptions): UseCommentCreateFormReturn => {
  const { currentProfile } = useCurrentProfile()
  const { inReplyToId, name, resetCommentReply, setCommentIdToExpand } = useCommentReply()

  const form = useForm<SocialUpsertForm>({
    defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })

  const [commitMutation, isMutationInFlight] = useCommentCreateMutation()

  useEffect(() => {
    if (resetFormOnReplyTargetChange) {
      form.reset()
    }
    // `form` is stable across renders (react-hook-form).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inReplyToId, resetFormOnReplyTargetChange])

  const submit = (
    data: SocialUpsertForm,
    { includeMentions = false }: CommentSubmitOptions = {},
  ) => {
    if (isMutationInFlight) return

    commitMutation({
      variables: {
        input: {
          body: data.body,
          targetObjectId,
          inReplyToId,
          profileId: currentProfile?.id,
          ...(includeMentions && { mentionedProfileIds: data.mentionedProfileIds }),
          clientMutationId: getNextClientMutationId(),
        },
        connections: [getCommentsConnectionId(inReplyToId ?? targetObjectId)],
      },
      onCompleted: (response, errors) => {
        // Transport errors are already toasted by the mutation hook.
        if (errors) return
        const mutationErrors = response?.commentCreate?.errors
        setFormRelayErrors(form, mutationErrors)

        if (!mutationErrors?.length) {
          resetCommentReply()
          form.reset()
          if (expandRepliesOnSuccess && inReplyToId) {
            setCommentIdToExpand(inReplyToId)
          }
          onSuccess?.({ inReplyToId })
        }
      },
    })
  }

  return {
    form,
    submit,
    isLoading: isMutationInFlight,
    isReply: !!inReplyToId,
    replyTargetName: name,
    cancelReply: resetCommentReply,
  }
}

export default useCommentCreateForm
