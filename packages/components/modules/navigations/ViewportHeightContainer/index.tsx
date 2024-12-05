import { FC } from 'react'

import { CenteredContainer, HorizontalContainer, VerticalContainer } from './styled'
import { ViewportHeightContainerProps } from './types'

// TODO: consider moving this to DS package, alongside with the navigation constants
// TODO: add to storybook
/**
 * This component is used to create a container that takes the full height of the viewport, considering the theme layout configuration.
 */
const ViewportHeightContainer: FC<ViewportHeightContainerProps> = ({
  children,
  themeLayout,
  ...props
}) => {
  if (themeLayout === 'horizontal') {
    return <HorizontalContainer {...props}>{children}</HorizontalContainer>
  }

  if (themeLayout === 'centered') {
    return <CenteredContainer {...props}>{children}</CenteredContainer>
  }

  return <VerticalContainer {...props}>{children}</VerticalContainer>
}

export default ViewportHeightContainer
