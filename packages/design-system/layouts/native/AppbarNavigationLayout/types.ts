export interface AppbarNavigationLayoutProps {
  title: string
  onBack?: () => void
  onClose?: () => void
  onNext?: () => void
  nextLabel?: string
  nextIcon?: React.ReactNode
  closeComponent?: React.ReactNode
}
