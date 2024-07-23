'use client'

import { FC, PropsWithChildren } from 'react'

import { LazyMotion, domMax, m } from 'framer-motion'

const MotionLazyProvider: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion strict features={domMax}>
    <m.div style={{ height: '100%' }}> {children} </m.div>
  </LazyMotion>
)

export default MotionLazyProvider
