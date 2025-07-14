'use client'

import { FC, useEffect } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { FileUploadButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { UsernameIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { ImageWithFallback } from '@baseapp-frontend/design-system/components/web/images'
import {
  PhoneNumberField,
  TextField,
  TextareaField,
} from '@baseapp-frontend/design-system/components/web/inputs'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, CardContent, InputAdornment, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useFragment } from 'react-relay'

import {
  DEFAULT_BANNER_IMAGE_FORMATS,
  DEFAULT_BANNER_IMAGE_MAX_SIZE,
  DEFAULT_IMAGE_FORMATS,
  DEFAULT_IMAGE_MAX_SIZE,
  DEFAULT_PROFILE_FORM_VALIDATION,
  PROFILE_FORM_VALUE,
  ProfileComponentFragment,
  ProfileUpdateForm,
  UploadablesObj,
  getImageUrl,
  getProfileDefaultValues,
  useProfileMutation,
} from '../../common'
import { BannerButtonsContainer } from './styled'
import { ProfileSettingsComponentProps } from './types'

const ProfileSettingsComponent: FC<ProfileSettingsComponentProps> = ({ profile: profileRef }) => {
  const profile = useFragment(ProfileComponentFragment, profileRef)

  const { sendToast } = useNotification()
  const { updateProfileIfActive } = useCurrentProfile()

  const formReturn = useForm({
    defaultValues: getProfileDefaultValues({ profile, removeSlashInUsername: true }),
    resolver: zodResolver(DEFAULT_PROFILE_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    clearErrors,
    control,
    getFieldState,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, dirtyFields, isValid },
  } = formReturn

  const [commitMutation, isMutationInFlight] = useProfileMutation()

  const watchImage = watch(PROFILE_FORM_VALUE.image)
  const watchBannerImage = watch(PROFILE_FORM_VALUE.bannerImage)
  const imageUrl = getImageUrl(watchImage)
  const bannerImageUrl = getImageUrl(watchBannerImage)

  // To get this working in staging/prod, change NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME to the media host being used (e.g.: digitalocean, aws, etc)
  const hasUploadedImage = imageUrl.includes(process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME ?? '')
  const hasUploadedBannerImage = bannerImageUrl.includes(
    process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME ?? '',
  )

  const onSubmit = async (data: ProfileUpdateForm) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { id, image, bannerImage } = data
    const uploadables: UploadablesObj = {}
    if ('image' in dirtyValues && image && typeof image !== 'string') {
      uploadables.image = image
      delete dirtyValues.image
    }
    if ('bannerImage' in dirtyValues && bannerImage && typeof bannerImage !== 'string') {
      uploadables.bannerImage = bannerImage
      delete dirtyValues.bannerImage
    }

    commitMutation({
      variables: {
        input: { id, ...dirtyValues },
      },
      uploadables,
      onCompleted: (response: any) => {
        const errors = response?.profileUpdate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          setFormRelayErrors(formReturn, errors)
        } else {
          sendToast('Profile updated', { type: 'success' })
        }
      },
    })
    reset({}, { keepValues: true })
  }

  useEffect(() => {
    if (profile) {
      const newProfile = {
        id: profile.id,
        name: profile.name ?? null,
        urlPath: profile.urlPath?.path ?? null,
        image: profile.image?.url ?? null,
      }
      updateProfileIfActive(newProfile)
    }
  }, [profile?.id, profile?.name, profile?.urlPath?.path, profile?.image?.url])

  const handleRemoveImage = (type: any) => {
    clearErrors(type)
    setValue(type, null, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return (
    <Card>
      <CardContent>
        <form
          // @ts-ignore TODO: check typing issue with zodResolver
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-rows-[min-content_auto_auto_auto_auto] gap-8"
        >
          <div>
            <Typography component="h4" variant="h4" mb={1}>
              Profile
            </Typography>
            <Typography component="p" variant="body2" color="text.secondary">
              Manage your personal information you and other people see.
            </Typography>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-8 sm:grid-cols-1 sm:grid-rows-2">
            <Card variant="outlined" sx={{ boxShadow: 'none' }}>
              <CardContent>
                <div className="grid grid-rows-[1fr_min-content] justify-center justify-items-center gap-2">
                  <CircledAvatar
                    src={imageUrl}
                    width={144}
                    height={144}
                    hasError={!!getFieldState('image').error}
                  />
                  {getFieldState('image').error && (
                    <div className="text-center">
                      <Typography color="error.main" variant="caption">
                        {getFieldState('image').error!.message}
                      </Typography>
                    </div>
                  )}
                  <FileUploadButton
                    control={control}
                    name={PROFILE_FORM_VALUE.image}
                    setFile={setValue}
                    accept={DEFAULT_IMAGE_FORMATS}
                    maxSize={DEFAULT_IMAGE_MAX_SIZE}
                    label={hasUploadedImage ? 'Change Image' : 'Upload Image'}
                  />
                  {watchImage && (
                    <LoadingButton
                      variant="text"
                      color="error"
                      loading={isMutationInFlight}
                      disabled={isMutationInFlight}
                      onClick={() => handleRemoveImage(PROFILE_FORM_VALUE.image)}
                    >
                      Remove
                    </LoadingButton>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="grid auto-rows-auto">
              <TextField
                label="Name"
                control={control}
                name={PROFILE_FORM_VALUE.name}
                className="h-[min-content]"
              />
              <TextField
                label="Username"
                control={control}
                name={PROFILE_FORM_VALUE.urlPath}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UsernameIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <PhoneNumberField
                label="Phone number"
                control={control}
                name={PROFILE_FORM_VALUE.phoneNumber}
              />
            </div>
          </div>
          <TextareaField
            label="Bio"
            control={control}
            name={PROFILE_FORM_VALUE.biography}
            hideBorder={false}
          />
          <Card variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ padding: '16px' }}>
              <div className="grid grid-rows-[1fr_min-content] justify-center gap-4">
                <ImageWithFallback
                  src={bannerImageUrl}
                  fallbackSrc="/png/profile-banner-edit-page-fallback.png"
                  alt="Home Banner"
                  width={868}
                  height={
                    290 /* Some css height: auto takes precedence,
                    so also set as style below */
                  }
                  className="overflow-hidden rounded-lg"
                  style={{ height: '290px', objectFit: 'cover' }}
                />
                {getFieldState('bannerImage').error && (
                  <div className="text-center">
                    <Typography color="error.main" variant="caption">
                      {getFieldState('bannerImage').error!.message}
                    </Typography>
                  </div>
                )}
                <BannerButtonsContainer enableRemove={!!watchBannerImage}>
                  <FileUploadButton
                    control={control}
                    name={PROFILE_FORM_VALUE.bannerImage}
                    setFile={setValue}
                    accept={DEFAULT_BANNER_IMAGE_FORMATS}
                    maxSize={DEFAULT_BANNER_IMAGE_MAX_SIZE}
                    label={hasUploadedBannerImage ? 'Change Banner' : 'Upload Banner'}
                    sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
                  />
                  {watchBannerImage && (
                    <LoadingButton
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveImage(PROFILE_FORM_VALUE.bannerImage)}
                      loading={isMutationInFlight}
                      disabled={isMutationInFlight}
                      sx={{ maxWidth: 'fit-content' }}
                    >
                      Remove
                    </LoadingButton>
                  )}
                </BannerButtonsContainer>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-row justify-end gap-4">
            <LoadingButton
              color="inherit"
              type="submit"
              loading={isMutationInFlight}
              disabled={!isDirty || !isValid || isMutationInFlight}
              sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
            >
              Save Changes
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileSettingsComponent
