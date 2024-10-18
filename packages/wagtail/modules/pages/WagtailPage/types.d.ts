export interface IPageParams {
  params: {
    path: string[]
  }
}

export interface IWagtailPage {
  WagtailPagesProvider: (props: PropsWithChildren) => JSX.Element
  WagtailPageBuilder: () => JSX.Element
}

export type ProviderDefaultSettingsType = Omit<WagtailPagesContextState, 'currentPage'>
