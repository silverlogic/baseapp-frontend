import { PropsWithChildren } from 'react'

import PageBuilder from '../../components/PageTypes/PageBuilder'
import { WagtailPagesProvider } from '../../providers'
import { PagesAPI } from '../../services/Wagtail/PagesAPI'
import { IPage } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { IPageParams, IWagtailPage, ProviderDefaultSettingsType } from './types'

const getCurrentPage = async (path: string): Promise<IPage> => {
  try {
    return await PagesAPI.getPageByPath(path)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

export const wagtailPage = (
  currentPage: IPage,
  providerDefaultSettings?: ProviderDefaultSettingsType,
): IWagtailPage => ({
  WagtailPagesProvider: ({ children }: PropsWithChildren) => (
    <WagtailPagesProvider
      defaultSettings={{
        currentPage,
        ...(providerDefaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  ),
  WagtailPageBuilder: PageBuilder,
})

export const createWagtailPage = async (
  { params }: IPageParams,
  providerDefaultSettings?: ProviderDefaultSettingsType,
) => {
  const currentPage = await getCurrentPage(params.path.join('/'))

  return wagtailPage(currentPage, providerDefaultSettings)
}
