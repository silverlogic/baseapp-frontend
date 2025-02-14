import { ImageProps as NativeImageProps } from 'react-native'

type Source = NativeImageProps['source']

export type SingleSource = {
  source: Source
  lightSource?: never
  darkSource?: never
}

export type DoubleSource = {
  source?: never
  lightSource: Source
  darkSource: Source
}

export type ImageProps = Omit<NativeImageProps, 'source'> & (SingleSource | DoubleSource)
