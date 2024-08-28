'use client'

import { useMemo } from 'react'

import type { Environment } from 'relay-runtime'

import { createEnvironment } from '../environment'

const useEnvironment = () => {
  let relayEnvironment: Environment | null = null

  const initEnvironment = () => {
    const environment = relayEnvironment ?? createEnvironment()
    // For SSR always return new environment;
    if (typeof window === typeof undefined) return environment
    if (!relayEnvironment) relayEnvironment = environment
    return relayEnvironment
  }

  const env = useMemo(() => initEnvironment(), [initEnvironment, relayEnvironment])
  return env
}

export default useEnvironment
