/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'

import { ComponentWithProviders } from './providers'

const customRender = (ui: ReactElement, options?: RenderOptions): ReturnType<typeof render> => {
  const { wrapper = ComponentWithProviders } = options || {}

  return render(ui, { wrapper, ...options })
}
// re-export testing-library
export * from '@testing-library/react'
// @ts-ignore TODO: investigate error on jest-dom re-export
export * from '@testing-library/jest-dom'
export * from '@testing-library/user-event'

export { default as userEvent } from '@testing-library/user-event'

export { customRender as render }

// export local files
export * from './providers'
export * from './utils/mocks'
export * from './utils/mockFetch'
export * from './utils/mockFetchError'
