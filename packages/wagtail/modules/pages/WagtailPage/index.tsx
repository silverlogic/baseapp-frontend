import { PropsWithChildren } from 'react'

import PageBuilder from '../../components/PageTypes/PageBuilder'
import { WagtailPagesProvider } from '../../providers'
import { WagtailPagesContextState } from '../../providers/WagtailPagesProvider/types'
import { PagesAPI } from '../../services/Wagtail/PagesAPI'
import { IPage } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { IPageParams } from './types'

const getCurrentPage = async (path: string): Promise<IPage> => {
  try {
    return await PagesAPI.getPageByPath(path)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

export const createWagtailPage = async (
  { params }: IPageParams,
  providerDefaultSettings?: Omit<WagtailPagesContextState, 'currentPage'>,
) => {
  const currentPage = await getCurrentPage(params.path.join('/'))

  return {
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
  }
}
