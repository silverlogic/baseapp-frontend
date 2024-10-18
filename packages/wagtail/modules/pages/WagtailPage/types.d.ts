export interface IPageParams {
  params: {
    path: string[]
  }
}

export interface IWagtailPage {
  WagtailPagesProvider: (props: PropsWithChildren) => JSX.Element
  WagtailPageBuilder: any
}

export type ProviderDefaultSettingsType = Omit<WagtailPagesContextState, 'currentPage'>
