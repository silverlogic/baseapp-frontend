import { FC } from 'react'

export const compose =
  (...hocs: any[]) =>
  (Component: FC<any>) =>
    hocs.reduceRight((AccumulatedComponent, hoc) => hoc(AccumulatedComponent), Component)
