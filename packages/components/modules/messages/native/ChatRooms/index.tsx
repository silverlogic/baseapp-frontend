import { FC, Suspense, useState, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import {
  DEFAULT_FORM_VALUES,
  FORM_VALUES,
  SearchInput,
  SearchInputFormValues,
} from '@baseapp-frontend/design-system/components/native/inputs'
import { Tab, Tabs } from '@baseapp-frontend/design-system/components/native/tabs'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { PageViewWithHeader, View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { useAppStateSubscription } from '@baseapp-frontend/utils/hooks/useAppStateSubscription'

import { useForm } from 'react-hook-form'
import { useLazyLoadQuery, useRelayEnvironment } from 'react-relay'

import { ChatRoomsQuery as ChatRoomsQueryType } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { RoomsListFragment$key } from '../../../../__generated__/RoomsListFragment.graphql'
import { useRoomsList } from '../../common'
import { ChatRoomsQuery } from '../../common/graphql/queries/ChatRoomsQuery'
import { NewChatButton } from '../NewChatButton'
import RoomsList from '../RoomsList'
import { CHAT_TAB_LABEL, CHAT_TAB_VALUES } from '../RoomsList/RoomsListComponent/constants'
import { ChatTabValues } from '../RoomsList/RoomsListComponent/types'
import { useRoomListSubscription } from '../graphql/subscriptions/useRoomListSubscription'
import { createStyles } from './styles'

const ChatRooms: FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { control, watch, setValue, reset } = useForm<SearchInputFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  })
  const searchParam = watch(FORM_VALUES.search)
  const [selectedTab, setSelectedTab] = useState<string>(CHAT_TAB_VALUES.active)
  const [, startTransition] = useTransition()
  const { currentProfile } = useCurrentProfile()
  const chatRoomQueryData = useLazyLoadQuery<ChatRoomsQueryType>(
    ChatRoomsQuery,
    { profileId: currentProfile?.id || '' },
    { fetchPolicy: 'store-and-network' },
  )
  const { data, refetch } = useRoomsList(chatRoomQueryData?.profile as RoomsListFragment$key)

  const handleSearchChange = (text: string) => {
    startTransition(() => {
      setValue(FORM_VALUES.search, text)
    })
  }

  const resetInput = () => {
    setValue(FORM_VALUES.search, DEFAULT_FORM_VALUES.search)
    reset(DEFAULT_FORM_VALUES)
  }

  const environment = useRelayEnvironment()
  useRoomListSubscription({ profileId: data?.id, connections: [], environment })

  const handleChange = (newValue: string) => {
    setSelectedTab(newValue as ChatTabValues)
  }

  useAppStateSubscription(() => {
    refetch(
      {
        q: searchParam,
        unreadMessages: selectedTab === CHAT_TAB_VALUES.unread,
        archived: selectedTab === CHAT_TAB_VALUES.archived,
        isGroup: selectedTab === CHAT_TAB_VALUES.groups,
      },
      { fetchPolicy: 'store-and-network' },
    )
  })

  return (
    <PageViewWithHeader>
      <View style={styles.container}>
        <Text variant="h4">Messages</Text>
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

        <Tabs value={selectedTab} onChange={handleChange} style={styles.tabs}>
          <Tab
            label={CHAT_TAB_LABEL.active}
            value={CHAT_TAB_VALUES.active}
            aria-label="Active messages tab"
          />
          <Tab
            label={CHAT_TAB_LABEL.unread}
            value={CHAT_TAB_VALUES.unread}
            aria-label="Unread messages tab"
          />
          <Tab
            label={CHAT_TAB_LABEL.groups}
            value={CHAT_TAB_VALUES.groups}
            aria-label="Groups messages tab"
          />
          <Tab
            label={CHAT_TAB_LABEL.archived}
            value={CHAT_TAB_VALUES.archived}
            aria-label="Archived messages tab"
          />
        </Tabs>
        <RoomsList
          targetRef={chatRoomQueryData}
          searchParam={searchParam}
          selectedTab={selectedTab}
        />
        <NewChatButton isGroup={selectedTab === CHAT_TAB_VALUES.groups} />
      </View>
    </PageViewWithHeader>
  )
}

const SuspendedChatRooms = () => (
  <Suspense
    fallback={
      <View style={{ flex: 1 }}>
        <LoadingScreen />
      </View>
    }
  >
    <ChatRooms />
  </Suspense>
)

export default SuspendedChatRooms
