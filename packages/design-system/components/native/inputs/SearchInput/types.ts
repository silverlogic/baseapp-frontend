import { TextInputProps } from 'react-native-paper'

export interface SearchInputProps extends TextInputProps {
  searchParam: string | null
  resetInput: () => void
}
