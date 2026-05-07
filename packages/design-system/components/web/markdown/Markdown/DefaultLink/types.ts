import type { LinkProps } from '@mui/material/Link'

export interface DefaultLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  extraLinkProps?: Partial<LinkProps>
}
