import { FC, useCallback, useRef, useState } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { CameraIcon, ImageIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { TextInput } from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useViewPhotoLibrary } from '@baseapp-frontend/design-system/hooks/native'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import {
  ACCESS_KEY_NAME,
  filterDirtyValues,
  getToken,
  setFormRelayErrors,
  useNotification,
} from '@baseapp-frontend/utils'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { FieldValues, useForm } from 'react-hook-form'
import { Image, Platform, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFragment } from 'react-relay'

import {
  DEFAULT_PROFILE_FORM_VALIDATION,
  PROFILE_FORM_VALUE,
  ProfileComponentFragment,
  ProfileUpdateForm,
  getImageUrl,
  getProfileDefaultValues,
  useProfileMutation,
} from '../../common'
import BottomDrawer from './BottomDrawer'
import { createStyles } from './styles'
import { ProfileSettingsComponentProps } from './types'

const ProfileSettingsComponent: FC<ProfileSettingsComponentProps> = ({ profile: profileRef }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const profile = useFragment(ProfileComponentFragment, profileRef)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)
  const [commitMutation, isMutationInFlight] = useProfileMutation()
  const [fieldType, setFieldType] = useState<'image' | 'bannerImage'>('image')
  // const { updateProfileIfActive } = useCurrentProfile()
  const { sendToast } = useNotification()

  const formReturn = useForm<ProfileUpdateForm>({
    defaultValues: getProfileDefaultValues({ profile }),
    // @ts-ignore TODO: check typing issue with zodResolver
    resolver: zodResolver(DEFAULT_PROFILE_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const uploadFile = async (fileUri: string, fieldName: 'image' | 'bannerImage') => {
    try {
      const authToken = getToken(ACCESS_KEY_NAME)
      const fileInfo = await FileSystem.getInfoAsync(fileUri)
      if (!fileInfo.exists) {
        sendToast('File does not exist', { type: 'error' })
      }

      bottomDrawerRef.current?.close()

      // TODO: see if we can abstract file uploads into a shared function
      const response = await FileSystem.uploadAsync(
        process.env.EXPO_PUBLIC_RELAY_ENDPOINT as string,
        fileUri,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName,
          parameters: {
            // TODO: see if we can reuse the query from the mutation
            query: `mutation ProfileUpdateMutation($input: ProfileUpdateInput!) {
              profileUpdate(input: $input) {
                profile {
                  id
                }
                errors {
                  field
                  messages
                }
              }
            }`,
            variables: JSON.stringify({
              input: {
                id: profile.id,
                [fieldName]: fileUri,
              },
            }),
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      if (response.status !== 200) {
        formReturn.setError(fieldName, { message: 'Failed to upload file' })
      }
    } catch (error) {
      formReturn.setError(fieldName, { message: 'Failed to upload file' })
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { isDirty, dirtyFields },
  } = formReturn

  const watchImage = watch(PROFILE_FORM_VALUE.image)
  const watchBannerImage = watch(PROFILE_FORM_VALUE.bannerImage)
  const imageUrl = getImageUrl(watchImage)
  const bannerImageUrl = getImageUrl(watchBannerImage)
  const hasChanged = isDirty || Object.keys(dirtyFields).length > 0

  const onSubmit = async (data: FieldValues) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { id } = data

    if (dirtyValues.image) {
      await uploadFile(dirtyValues.image, 'image')
      delete dirtyValues.image
    }
    if (dirtyValues.bannerImage) {
      await uploadFile(dirtyValues.bannerImage, 'bannerImage')
      delete dirtyValues.bannerImage
    }

    commitMutation({
      variables: {
        input: { id, ...dirtyValues },
      },
      onCompleted: (response: any) => {
        const errors = response?.profileUpdate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          // @ts-ignore TODO: check typing issue with zodResolver
          setFormRelayErrors(formReturn, errors)
        } else {
          sendToast('Profile updated', { type: 'success' })
        }
      },
    })
    reset({}, { keepValues: true })
  }

  function handleSave(data: FieldValues): void {
    onSubmit(data)
  }

  const { handleViewPhotoLibrary, handleTakePhoto } = useViewPhotoLibrary({
    allowsEditing: Platform.OS === 'android',
    isBase64: false,
    onResult: (image?: ImagePicker.ImagePickerAsset) => {
      const imageUri = image?.uri
      setValue(fieldType, imageUri, { shouldValidate: true, shouldDirty: true })
    },
    onFinally: () => {
      bottomDrawerRef.current?.close()
    },
    type: fieldType,
  })

  // TODO: add this back when support multiple profiles
  // useEffect(() => {
  //   if (profile) {
  //     updateProfileIfActive({
  //       id: profile.id,
  //       name: profile.name ?? null,
  //       urlPath: profile.urlPath?.path ?? null,
  //       image: profile.image?.url ?? null,
  //     })
  //   }
  // }, [profile?.id, profile?.name, profile?.urlPath?.path, profile?.image?.url])

  const handleRemoveImage = (type: 'image' | 'bannerImage') => {
    clearErrors(type === 'image' ? 'image' : 'bannerImage')
    setValue(type === 'image' ? 'image' : 'bannerImage', undefined, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomDrawerRef.current?.present()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    // TODO: handle sheet changes
    console.log('index', index)
  }, [])

  const handleEditBanner = () => {
    setFieldType('bannerImage')
    handlePresentModalPress()
  }

  const handleEditProfile = () => {
    setFieldType('image')
    handlePresentModalPress()
  }

  const hasErrorImage = imageUrl.includes('error')
  const hasErrorBanner = bannerImageUrl.includes('error')

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: bannerImageUrl }}
              style={[styles.bannerImage, hasErrorBanner ? styles.errorBorder : {}]}
            />
            <Pressable style={styles.editIconContainer} onPress={handleEditBanner}>
              <CameraIcon width={20} height={20} color={theme.colors.surface.default} />
            </Pressable>
          </View>
          <View style={styles.profileContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={[styles.profileImage, hasErrorImage ? styles.errorBorder : {}]}
              />
            ) : (
              <ImageIcon
                width={33}
                height={33}
                color={theme.colors.object.disabled}
                style={hasErrorImage ? styles.errorBorder : {}}
              />
            )}
            <Pressable
              style={[styles.editIconContainer, { bottom: 0, right: 0 }]}
              onPress={handleEditProfile}
            >
              <CameraIcon width={20} height={20} color={theme.colors.surface.default} />
            </Pressable>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <TextInput
              label="Name"
              name={PROFILE_FORM_VALUE.name}
              control={control}
              mode="outlined"
              outlineStyle={styles.input}
            />
            <TextInput
              label="Username"
              name={PROFILE_FORM_VALUE.urlPath}
              control={control}
              mode="outlined"
              outlineStyle={styles.input}
            />
            {/* TODO: Add a formattable TextInput for phone numbers */}
            <TextInput
              label="Phone Number"
              name={PROFILE_FORM_VALUE.phoneNumber}
              control={control}
              mode="outlined"
              outlineStyle={styles.input}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Bio"
              name={PROFILE_FORM_VALUE.biography}
              control={control}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.bioInput}
              outlineStyle={styles.input}
            />
            <View style={styles.saveButtonContainer}>
              <Button
                onPress={handleSubmit(handleSave)}
                size="medium"
                loading={isMutationInFlight}
                contentStyle={hasChanged ? styles.saveButton : styles.saveButtonDisabled}
                labelStyle={styles.saveButtonLabel}
                disabled={isMutationInFlight || !hasChanged}
              >
                {isMutationInFlight ? '' : 'Save Changes'}
              </Button>
            </View>
          </View>
        </View>
        <BottomDrawer
          bottomDrawerRef={bottomDrawerRef}
          handleSheetChanges={handleSheetChanges}
          type={fieldType}
          handleViewPhotoLibrary={handleViewPhotoLibrary}
          handleTakePhoto={handleTakePhoto}
          handleRemoveImage={handleRemoveImage}
        />
      </View>
    </ScrollView>
  )
}

export default ProfileSettingsComponent
