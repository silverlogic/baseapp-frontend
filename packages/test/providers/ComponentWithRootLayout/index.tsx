import { FC, PropsWithChildren } from 'react'

const ComponentWithRootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
)

export default ComponentWithRootLayout
