export type PageLayoutProviderProps = {
  children: React.ReactNode
  customLayoutSettings?: Partial<PageLayoutContextStates>
}

export type PageLayoutContextStates = {
  loadContainer: Boolean
}

export type PageLayoutContextProps = PageLayoutContextStates & {
  update: (
    name: keyof PageLayoutContextStates,
    updateValue: PageLayoutContextStates[keyof PageLayoutContextStates],
  ) => void
}
