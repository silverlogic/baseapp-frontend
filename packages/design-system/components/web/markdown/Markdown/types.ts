import type { LinkProps } from '@mui/material/Link'
import type { SxProps, Theme } from '@mui/material/styles'
import type { Options } from 'react-markdown'

export interface MarkdownProps extends Omit<Options, 'components'> {
  sx?: SxProps<Theme>
  variant?: 'body1' | 'body2'
  LinkComponentProps?: Partial<LinkProps>
  components?: Options['components']
}
