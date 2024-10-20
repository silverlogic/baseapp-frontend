import PageTypes from '../../components/PageTypes'
import { WagtailPagesProvider } from '../../providers/WagtailPagesProvider'
import { PagesAPI } from '../../services/Wagtail/PagesAPI'
import { IPage } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { IPageParams, IWagtailPageProps } from './types'

const getCurrentPage = async (path: string): Promise<IPage> => {
  try {
    return await PagesAPI.getPageByPath(path)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

export const wagtailPage = (currentPage: IPage) => ({
  WagtailPagesProvider: ({ children, defaultSettings }: IWagtailPageProps) => (
    <WagtailPagesProvider
      defaultSettings={{
        currentPage,
        ...(defaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  ),
  WagtailPageTypes: PageTypes,
})

export const createWagtailPage = async ({ params }: IPageParams) => {
  const currentPage = await getCurrentPage(params.path.join('/'))

  return wagtailPage(currentPage)
}
