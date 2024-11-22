import type { FC, PropsWithChildren } from 'react'

export interface PageType extends PropsWithChildren {}

export type AvailablePageTypesType = {
  [key: string]: FC<PageType>
}
