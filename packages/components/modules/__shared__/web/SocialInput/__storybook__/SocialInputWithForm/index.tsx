import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import SocialInput from '../..'
import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../../common'
import { SocialInputProps } from '../../types'

const SocialInputWithForm = (props: SocialInputProps) => {
  const form = useForm<SocialUpsertForm>({
    defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })

  const submit = (data: SocialUpsertForm) => {
    console.log('Submitted:', data)
  }

  return <SocialInput {...props} form={form} submit={submit} />
}

export default SocialInputWithForm
