import { FC } from 'react'

import { ProgressBarContainer, ProgressContainer } from './styled'
import { ProgressAnimationProps } from './types'

const ProgressAnimation: FC<ProgressAnimationProps> = ({ animationTime, severity }) => (
  <ProgressContainer severity={severity}>
    <ProgressBarContainer {...{ severity, animationTime }} />
  </ProgressContainer>
)

export default ProgressAnimation
