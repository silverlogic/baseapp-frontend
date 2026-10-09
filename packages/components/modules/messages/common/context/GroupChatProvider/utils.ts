export const isSameIdList = (a: readonly string[] = [], b: readonly string[] = []) =>
  a.length === b.length && a.every((id, index) => id === b[index])
