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
import { ChatRoomsProps } from './types'
import { getVisibleTabs } from './utils'

const TAB_ARIA_LABEL: Record<ChatTabValues, string> = {
  [CHAT_TAB_VALUES.active]: 'Active messages tab',
  [CHAT_TAB_VALUES.unread]: 'Unread messages tab',
  [CHAT_TAB_VALUES.groups]: 'Groups messages tab',
  [CHAT_TAB_VALUES.archived]: 'Archived messages tab',
}

const ChatRooms: FC<ChatRoomsProps> = ({ hiddenTabs = [], showNewChatButton = true }) => {
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
          {getVisibleTabs(hiddenTabs).map((value) => (
            <Tab
              key={value}
              label={CHAT_TAB_LABEL[value]}
              value={value}
              aria-label={TAB_ARIA_LABEL[value]}
            />
          ))}
        </Tabs>
        <RoomsList
          targetRef={chatRoomQueryData}
          searchParam={searchParam}
          selectedTab={selectedTab}
        />
        {showNewChatButton && <NewChatButton isGroup={selectedTab === CHAT_TAB_VALUES.groups} />}
      </View>
    </PageViewWithHeader>
  )
}

const SuspendedChatRooms: FC<ChatRoomsProps> = (props) => (
  <Suspense
    fallback={
      <View style={{ flex: 1 }}>
        <LoadingScreen />
      </View>
    }
  >
    <ChatRooms {...props} />
  </Suspense>
)

export default SuspendedChatRooms
