/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'

import ComponentWithProviders from './providers/ComponentWithProviders'

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: ComponentWithProviders, ...options })

// re-export testing-library
export * from '@testing-library/react'
export * from '@testing-library/jest-dom'
export * from '@testing-library/user-event'

export { default as userEvent } from '@testing-library/user-event'

export { customRender as render }

// export local files
export { default as ComponentWithProviders } from './providers/ComponentWithProviders'

export * from './utils/mocks'
