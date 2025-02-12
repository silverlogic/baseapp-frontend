import { AlertColor, BoxProps } from '@mui/material'

type SeverityProp = { severity: AlertColor }
type AnimationTimeProp = { animationTime: number }

export type ProgressAnimationProps = SeverityProp & AnimationTimeProp

export type AlertContainerProps = SeverityProp & BoxProps
export type ProgressBarContainerProps = ProgressAnimationProps & BoxProps
