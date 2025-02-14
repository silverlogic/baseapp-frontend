import { getInitialValues } from '@baseapp-frontend/utils'

import { ProfileComponentFragment$data } from '../../../__generated__/ProfileComponentFragment.graphql'
import { DEFAULT_PROFILE_FORM_VALUES } from './constants'

// TODO: move this to a shared location, currently the template also uses it at apps/web/components/design-system/inputs/PhoneNumberField/constants.ts
export const DEFAULT_PHONE_NUMBER_COUNTRY_CODE = '+1'

export const getDefaultValues = (profile?: ProfileComponentFragment$data | null) => {
  const formattedProfile = {
    ...profile,
    phoneNumber: profile?.owner?.phoneNumber ?? DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
    image: profile?.image?.url ?? '',
    bannerImage: profile?.bannerImage?.url ?? '',
    urlPath: profile?.urlPath?.path ?? '',
    biography: profile?.biography ?? '',
  }
  const defaultValues = getInitialValues({
    current: formattedProfile,
    initial: DEFAULT_PROFILE_FORM_VALUES,
  })

  return defaultValues
}

// TODO: maybe move this to  @baseapp-frontend/utils
export const getImageUrl = (image?: string | File | Blob | MediaSource | null) => {
  if (typeof image === 'string') return image
  if (image instanceof Blob) return URL.createObjectURL(image)
  return ''
}
