import type { ImpersonationBannerProps } from '../ImpersonationBanner/types'

export type CurrentUserImpersonationBannerProps = Omit<ImpersonationBannerProps, 'user'>
