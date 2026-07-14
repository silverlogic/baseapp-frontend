import { FC, Suspense, useState, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import {
  DEFAULT_FORM_VALUES,
  FORM_VALUES,
  SearchInput,
  SearchInputFormValues,
} from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { useNotification } from '@baseapp-frontend/utils'

import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useLazyLoadQuery } from 'react-relay'

import { AddContactToGroupsQuery as AddContactToGroupsQueryType } from '../../../../__generated__/AddContactToGroupsQuery.graphql'
import {
  AddContactToGroupsQuery,
  toggleGroupSelection,
  useAddParticipantToChatRoomsMutation,
} from '../../common'
import GroupsList from './GroupsList'
import { createStyles } from './styles'
import { AddContactToGroupPageProps } from './types'

const AddContactToGroupPage: FC<AddContactToGroupPageProps> = ({ contactProfileId }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const router = useRouter()
  const { currentProfile } = useCurrentProfile()
  const profileId = currentProfile?.id ?? ''
  const { sendToast } = useNotification()

  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set())
  const [, startTransition] = useTransition()
  const { control, watch, setValue, reset } = useForm<SearchInputFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  })
  const searchParam = watch(FORM_VALUES.search)

  const [commitAddToGroups, isMutationInFlight] = useAddParticipantToChatRoomsMutation()

  const queryData = useLazyLoadQuery<AddContactToGroupsQueryType>(
    AddContactToGroupsQuery,
    { profileId, contactProfileId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: contactProfileId,
    },
  )

  const handleSearchChange = (text: string) => {
    startTransition(() => {
      setValue(FORM_VALUES.search, text)
    })
  }

  const resetInput = () => {
    reset(DEFAULT_FORM_VALUES)
  }

  const handleToggle = (groupId: string) => {
    setSelectedIds((previous) => toggleGroupSelection(previous, groupId))
  }

  const confirmDisabled = selectedIds.size === 0 || isMutationInFlight

  const handleConfirm = () => {
    if (!profileId || confirmDisabled) return

    commitAddToGroups({
      variables: {
        input: {
          profileId,
          participantProfileId: contactProfileId,
          roomIds: [...selectedIds],
        },
        contactProfileId,
      },
      onCompleted: (response) => {
        const errors = response?.chatRoomsAddParticipant?.errors
        if (errors?.length) {
          sendToast('Something went wrong', { type: 'error' })
        } else {
          router.back()
        }
      },
    })
  }

  return (
    <View style={styles.container}>
      <AppBar
        title="Add to Group"
        onBack={() => router.back()}
        BackIcon={CloseIcon}
        onClose={handleConfirm}
        CloseIcon={CheckMarkIcon}
        CloseIconProps={{
          color: confirmDisabled ? theme.colors.surface.disabled : theme.colors.primary.main,
        }}
        closeDisabled={confirmDisabled}
      />
      <View style={styles.content}>
        <SearchInput
          placeholder="Search"
          onChangeText={handleSearchChange}
          control={control}
          name={FORM_VALUES.search}
          searchParam={searchParam}
          resetInput={resetInput}
          autoComplete="off"
          autoCorrect={false}
        />
        <GroupsList
          targetRef={queryData}
          searchParam={searchParam}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      </View>
    </View>
  )
}

const SuspendedAddContactToGroupPage: FC<AddContactToGroupPageProps> = (props) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  return (
    <Suspense
      fallback={
        <View style={styles.container}>
          <LoadingScreen />
        </View>
      }
    >
      <AddContactToGroupPage {...props} />
    </Suspense>
  )
}

export default SuspendedAddContactToGroupPage
