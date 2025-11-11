import { FC, useCallback } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import { CloseIcon } from '../../icons'
import { createStyles } from './styles'
import { SearchInputProps } from './types'

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  onChangeText,
  searchParam,
  resetInput,
  ...props
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const renderSearchIcon = useCallback(
    () => <Ionicons name="search" size={24} color={theme.colors.object.disabled} />,
    [theme.colors.object.disabled],
  )

  const renderClearIcon = useCallback(
    () =>
      searchParam && searchParam.length > 0 ? (
        <CloseIcon color={theme.colors.object.disabled} />
      ) : null,
    [searchParam, theme.colors.object.disabled],
  )

  return (
    <TextInput
      placeholder={placeholder}
      mode="outlined"
      style={styles.searchInput}
      outlineColor={theme.colors.surface.active}
      left={<TextInput.Icon icon={renderSearchIcon} />}
      onChangeText={onChangeText}
      {...props}
      value={searchParam ?? ''}
      right={
        searchParam && searchParam.length ? (
          <TextInput.Icon icon={renderClearIcon} onPress={resetInput} />
        ) : undefined
      }
    />
  )
}

export default withNativeController(SearchInput)
