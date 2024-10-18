export type AvailableBlocksType = {
  [key in IPageBodyItem as key['type']]: FC<Extract<IPageBodyItem, { type: key['type'] }>>
}
