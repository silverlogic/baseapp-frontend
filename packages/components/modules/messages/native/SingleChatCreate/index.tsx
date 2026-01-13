import { Suspense, useTransition } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import {
  DEFAULT_FORM_VALUES,
  FORM_VALUES,
  SearchInput,
  SearchInputFormValues,
} from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useForm } from 'react-hook-form'
import { useLazyLoadQuery } from 'react-relay'

import { CreateRoomPageQuery } from '../../../../__generated__/CreateRoomPageQuery.graphql'
import { profilesListQuery } from '../graphql/queries/CreateRoomPageQuery'
import CreateRoomList from './CreateRoomList'
import { createStyles } from './styles'

const CreateRoomPage = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { control, watch, setValue, reset } = useForm<SearchInputFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const searchParam = watch(FORM_VALUES.search)
  const [, startTransition] = useTransition()

  const queryData = useLazyLoadQuery<CreateRoomPageQuery>(profilesListQuery, {
    count: 10,
    cursor: null,
  })

  const handleSearchChange = (text: string) => {
    startTransition(() => {
      setValue(FORM_VALUES.search, text)
    })
  }

  const resetInput = () => {
    reset(DEFAULT_FORM_VALUES)
  }

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search"
        onChangeText={handleSearchChange}
        control={control}
        name={FORM_VALUES.search}
        searchParam={searchParam}
        resetInput={resetInput}
        autoComplete="off"
        autoCorrect={false}
        autoFocus
      />
      <CreateRoomList targetRef={queryData} searchParam={searchParam} />
    </View>
  )
}

const SuspendedCreateRoomPage = () => {
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
      <CreateRoomPage />
    </Suspense>
  )
}
export default SuspendedCreateRoomPage
