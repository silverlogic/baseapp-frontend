import { FC, Suspense, useState, useTransition } from 'react'

import {
  DEFAULT_FORM_VALUES,
  SearchInput,
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
  const { control, reset } = useForm({ defaultValues: DEFAULT_FORM_VALUES })
  const [selectedTab, setSelectedTab] = useState<string>(CHAT_TAB_VALUES.active)
  const [searchParam, setSearchParam] = useState('')
  const [isPending, startTransition] = useTransition()
  const chatRoomQueryData = useLazyLoadQuery<ChatRoomsQueryType>(
    ChatRoomsQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )
  const { data, refetch } = useRoomsList(chatRoomQueryData?.me?.profile as RoomsListFragment$key)

  const handleSearchChange = (text: string) => {
    if (isPending) return
    startTransition(() => {
      setSearchParam(text)
    })
  }

  const resetInput = () => {
    setSearchParam('')
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
          name="search"
          searchParam={searchParam}
          resetInput={resetInput}
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
            label={CHAT_TAB_LABEL.archived}
            value={CHAT_TAB_VALUES.archived}
            aria-label="Archived messages tab"
          />
        </Tabs>
        {
          // TODO: Handle groups tab separately will be implemented later
          selectedTab === CHAT_TAB_VALUES.groups ? (
            <Text>Groups tab is not implemented yet.</Text>
          ) : (
            <RoomsList
              targetRef={chatRoomQueryData}
              searchParam={searchParam}
              selectedTab={selectedTab}
            />
          )
        }
        <NewChatButton />
      </View>
    </PageViewWithHeader>
  )
}

const SuspendedChatRooms = () => (
  <Suspense fallback={null}>
    <ChatRooms />
  </Suspense>
)

export default SuspendedChatRooms
