import { FC, useCallback } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
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
        <Ionicons
          name="close"
          size={24}
          color={theme.colors.object.disabled}
          onPress={resetInput}
        />
      ) : null,
    [resetInput, searchParam, theme.colors.object.disabled],
  )

  return (
    <TextInput
      placeholder={placeholder}
      mode="outlined"
      style={styles.searchInput}
      outlineColor={theme.colors.surface.active}
      left={<TextInput.Icon icon={renderSearchIcon} />}
      right={<TextInput.Icon icon={renderClearIcon} />}
      onChangeText={onChangeText}
      {...props}
    />
  )
}

export default withNativeController(SearchInput)
