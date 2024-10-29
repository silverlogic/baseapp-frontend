import type { FC, PropsWithChildren } from 'react'

export interface IPageType extends PropsWithChildren {}

export type AvailablePageTypesType = {
  [key: string]: FC<IPageType>
}
