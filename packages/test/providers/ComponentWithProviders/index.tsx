import { FC, PropsWithChildren } from 'react'

import { ThemeProvider, theme } from '@baseapp-frontend/design-system-mui'
import { ReactQueryProvider } from '@baseapp-frontend/provider'

const ComponentWithProviders: FC<PropsWithChildren> = ({ children }) => (
  <ReactQueryProvider>
    <ThemeProvider theme={theme} cacheKey="test-key">
      {children}
    </ThemeProvider>
  </ReactQueryProvider>
)

export default ComponentWithProviders
